// annotator.js

export function annotateXML(paragraphs, patterns) {

    let annotatedXML = "<book>";

    Array.from(paragraphs).forEach(p => {

        const text = p.textContent;

        let matches = [];

        // collect matches
        patterns.forEach(rule => {
            const regex = new RegExp(rule.regex);
            let m;

            while ((m = regex.exec(text)) !== null) {
                matches.push({
                    start: m.index,
                    end: m.index + m[0].length,
                    text: m[0],
                    tag: rule.tag
                });
            }
        });

        matches.sort((a, b) => a.start - b.start);

        // remove overlaps
        let filtered = [];
        let lastEnd = 0;

        for (let m of matches) {
            if (m.start >= lastEnd) {
                filtered.push(m);
                lastEnd = m.end;
            }
        }

        // build XML
        annotatedXML += "<paragraph>";

        let cursor = 0;

        filtered.forEach(m => {

            annotatedXML += escapeXML(text.slice(cursor, m.start));

            annotatedXML += `<${m.tag}>${escapeXML(m.text)}</${m.tag}>`;

            cursor = m.end;
        });

        annotatedXML += escapeXML(text.slice(cursor));
        annotatedXML += "</paragraph>";

    });

    annotatedXML += "</book>";

    return annotatedXML;
}

// prevents broken XML
function escapeXML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
