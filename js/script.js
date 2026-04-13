document.addEventListener("DOMContentLoaded", () => {

    const searchBox = document.getElementById("figure-search");
    const resultsList = document.getElementById("search-results");
    const container = document.getElementById("novel-text");

    let indexedElements = [];

    fetch("Text/dorian_gray.xml")
        .then(res => res.text())
        .then(xmlText => {

            const xml = new DOMParser().parseFromString(xmlText, "text/xml");

            const paragraphs = xml.getElementsByTagName("paragraph");

            const patterns = [
                {
                    regex: /\bas\s+[a-zA-Z'-]+(?:\s+[a-zA-Z'-]+){0,2}\s+as\s+[a-zA-Z'-]+(?:\s+[a-zA-Z'-]+){0,2}\b/gi,
                    tag: "simile"
                },

                {
                    regex: /\blike\s+(?:a|an|the)\s+[a-zA-Z'-]+(?:\s+[a-zA-Z'-]+){0,3}\b/gi,
                    tag: "simile"
                },

                {
                    regex: /\blike\s+(?:a|an|the)\s+[a-zA-Z'-]+(?:\s+[a-zA-Z'-]+){1,4}\b/gi,
                    tag: "simile"
                },

                {
                    regex: /\b(?:is|are|was|were|becomes|became)\s+(?:a|an|the)\s+[a-zA-Z'-]+(?:\s+[a-zA-Z'-]+){0,2}\b/gi,
                    tag: "metaphor"
                },

                {
                    regex: /\bas\s+if\s+[^.!?\n]+/gi,
                    tag: "simile"
                },

                {
                    regex: /\b(?:heart|sea|river|storm|wave|ocean|world|mountain|forest|fire)\s+of\s+[a-zA-Z'-]+(?:\s+[a-zA-Z'-]+){0,2}\b/gi,
                    tag: "metaphor"
                }
            ];

            let html = "";

            Array.from(paragraphs).forEach(p => {

                const text = p.textContent;

                let matches = [];

                // 1. Collect all matches safely (NO shared regex state)
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

                // 2. Sort matches
                matches.sort((a, b) => a.start - b.start);

                // 3. Remove overlaps
                let filtered = [];
                let lastEnd = 0;

                for (let m of matches) {
                    if (m.start >= lastEnd) {
                        filtered.push(m);
                        lastEnd = m.end;
                    }
                }

                // 4. Rebuild string once
                let result = "";
                let cursor = 0;

                for (let m of filtered) {
                    result += text.slice(cursor, m.start);
                    result += `<span class="${m.tag}">${m.text}</span>`;
                    cursor = m.end;
                }

                result += text.slice(cursor);

                html += `<p>${result}</p>`;
            });

            container.innerHTML = html;

            // SAFE INDEXING (with fallback so search never breaks)
            indexedElements = Array.from(container.querySelectorAll("span.simile, span.metaphor"));

            if (indexedElements.length === 0) {
                indexedElements = Array.from(container.querySelectorAll("span"));
            }

            console.log("indexed elements:", indexedElements.length);

            setupSearch();
        })
        .catch(err => console.error("Load error:", err));


    function setupSearch() {

        searchBox.addEventListener("input", () => {

            const query = searchBox.value.toLowerCase();
            resultsList.innerHTML = "";

            if (!query) return;

            indexedElements.forEach(el => {

                const text = el.textContent.toLowerCase();

                if (text.includes(query)) {

                    const li = document.createElement("li");
                    li.textContent = el.textContent;

                    li.addEventListener("click", () => {

                        el.scrollIntoView({ behavior: "smooth", block: "center" });

                        el.style.background = "yellow";
                        setTimeout(() => el.style.background = "", 800);
                    });

                    resultsList.appendChild(li);
                }
            });
        });
    }

});
