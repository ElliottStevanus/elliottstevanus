document.addEventListener("DOMContentLoaded", function () {

    fetch("Text/dorian_gray.xml")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch dorian_gray.xml: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(str => {

            const parser = new DOMParser();
            const xml = parser.parseFromString(str, "text/xml");

            const paragraphs = xml.getElementsByTagName("paragraph");

            let output = "";

            // Normalize spacing so regex doesn't break across XML line breaks
            function normalizeText(text) {
                return text.replace(/\s+/g, " ");
            }

            // Figurative language patterns
            const patterns = [

                // as X as Y (classic simile)
                { regex: /\bas\s+[a-zA-Z'-]+\s+as\s+[a-zA-Z'-]+\b/gi, tag: "simile" },

                // like a/an/the noun
                { regex: /\blike\s+(?:a|an|the)\s+[a-zA-Z'-]+\b/gi, tag: "simile" },

                // extended like phrases (allows extra descriptive words)
                { regex: /\blike\s+(?:a|an|the)\s+[a-zA-Z'-]+(?:\s+[a-zA-Z'-]+){0,5}/gi, tag: "simile" },

                // copula metaphor (was a, is a, became a, etc.)
                { regex: /\b(?:was|were|is|are|became|becomes)\s+(?:a|an|the)\s+[a-zA-Z'-]+\b/gi, tag: "metaphor" },

                // as if constructions
                { regex: /\bas\s+if\s+[^.!?]+/gi, tag: "simile" }

            ];

            for (let i = 0; i < paragraphs.length; i++) {

                let text = paragraphs[i].textContent;
                text = normalizeText(text);

                patterns.forEach(p => {
                    text = text.replace(p.regex, match =>
                        `<${p.tag}>${match}</${p.tag}>`
                    );
                });

                output += `<p>${text}</p>`;
            }

            document.getElementById("novel-text").innerHTML = output;

        })
        .catch(error => {

            console.error("Error loading XML:", error);

            document.getElementById("novel-text").innerHTML =
                "<p>Failed to load the novel text. Make sure dorian_gray.xml is in the Text folder.</p>";
        });

});
