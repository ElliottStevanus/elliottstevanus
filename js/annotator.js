export function annotateXML(paragraphs) {

    let xml = "<book>";

    Array.from(paragraphs).forEach((p, pIndex) => {

        const text = p.textContent;

        // STEP 1: collect all tags as positions (NO STRING REPLACEMENT YET)
        let tags = [];

        // -------------------------
        // SIMILES
        // -------------------------
        const simileRegex =
            /\bas\s+[^.!?]+?\s+as\s+[^.!?]+|like\s+(a|an|the)\s+[^.!?]+|as\s+if\s+[^.!?]+/gi;

        let m;
        while ((m = simileRegex.exec(text)) !== null) {
            tags.push({
                start: m.index,
                end: m.index + m[0].length,
                type: "simile"
            });
        }

        // -------------------------
        // METAPHOR TRIGGERS → CLAUSE EXPANSION
        // -------------------------
        const triggerRegex = /\b(is|are|was|were|became|becomes)\b/gi;

        while ((m = triggerRegex.exec(text)) !== null) {

            const clause = expandClause(text, m.index);

            tags.push({
                start: clause.start,
                end: clause.end,
                type: "metaphor"
            });
        }

        // STEP 2: sort tags left → right
        tags.sort((a, b) => a.start - b.start);

        // STEP 3: remove overlaps (important!)
        let filtered = [];
        let lastEnd = 0;

        for (let t of tags) {
            if (t.start >= lastEnd) {
                filtered.push(t);
                lastEnd = t.end;
            }
        }

        // STEP 4: rebuild paragraph safely
        let result = "";
        let cursor = 0;

        for (let t of filtered) {

            result += escapeXML(text.slice(cursor, t.start));

            const tagText = text.slice(t.start, t.end);

            result += `<${t.type}>${escapeXML(tagText)}</${t.type}>`;

            cursor = t.end;
        }

        result += escapeXML(text.slice(cursor));

        xml += `<paragraph id="p${pIndex}">${result}</paragraph>`;
    });

    xml += "</book>";
    return xml;
}

// -------------------------
// CLAUSE EXPANSION (SAFE BOUNDARIES)
// -------------------------
function expandClause(text, index) {

    const before = text.slice(0, index);
    const after = text.slice(index);

    // start = last sentence boundary
    let start = Math.max(
        before.lastIndexOf("."),
        before.lastIndexOf("!"),
        before.lastIndexOf("?")
    );

    start = start === -1 ? 0 : start + 1;

    // end = next sentence boundary
    let endRel = after.search(/[.!?]/);
    let end = endRel === -1 ? text.length : index + endRel;

    // safety trimming (prevents giant clauses)
    start = Math.max(0, start);
    end = Math.min(text.length, end);

    return { start, end };
}

// -------------------------
// XML ESCAPING (IMPORTANT SAFETY FIX)
// -------------------------
function escapeXML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
