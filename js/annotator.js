export function annotateXML(paragraphs) {

    let xml = "<book>";

    Array.from(paragraphs).forEach((p, pIndex) => {

        const text = p.textContent;

        let processed = text;

        // -------------------------
        // SIMILES FIRST (safe pass)
        // -------------------------

        const similes = text.match(
            /\bas\s+[^.!?]+?\s+as\s+[^.!?]+|like\s+(a|an|the)\s+[^.!?]+|as\s+if\s+[^.!?]+/gi
        );

        if (similes) {
            similes.forEach(s => {
                processed = processed.replace(
                    s,
                    `<simile>${s}</simile>`
                );
            });
        }

        // -------------------------
        // METAPHOR CLAUSES
        // -------------------------

        const metaphorTriggers = /\b(is|are|was|were|became|becomes)\b/gi;

        let match;

        // IMPORTANT: reset regex state safety
        metaphorTriggers.lastIndex = 0;

        while ((match = metaphorTriggers.exec(text)) !== null) {

            const clause = expandClause(text, match.index);

            const clauseText = text.slice(clause.start, clause.end);

            // prevent double-wrapping
            if (!processed.includes(`<metaphor>${clauseText}</metaphor>`)) {

                processed = processed.replace(
                    clauseText,
                    `<metaphor>${clauseText}</metaphor>`
                );
            }
        }

        xml += `<paragraph id="p${pIndex}">`;
        xml += processed;
        xml += `</paragraph>`;
    });

    xml += "</book>";
    return xml;
}

// -------------------------

function expandClause(text, index) {

    const before = text.slice(0, index);
    const after = text.slice(index);

    let start = Math.max(
        before.lastIndexOf("."),
        before.lastIndexOf("?"),
        before.lastIndexOf("!")
    );

    start = start === -1 ? 0 : start + 1;

    const endRel = after.search(/[.!?]/);
    const end = endRel === -1 ? text.length : index + endRel;

    return { start, end };
}
