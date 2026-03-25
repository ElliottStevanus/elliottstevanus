document.addEventListener("DOMContentLoaded", function () {

    let figureID = 0;
    let figures = [];

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

            function normalizeText(text) {
                return text.replace(/\s+/g, " ");
            }

            const patterns = [

                // classic simile: as X as Y
                { regex: /\bas\s+[a-zA-Z'-]+\s+as\s+[a-zA-Z'-]+\b/gi, tag: "simile" },

                // simile: like a/an/the noun
                { regex: /\blike\s+(?:a|an|the)\s+[a-zA-Z'-]+\b/gi, tag: "simile" },

                // extended "like" simile
                { regex: /\blike\s+(?:a|an|the)\s+[a-zA-Z'-]+(?:\s+[a-zA-Z'-]+){0,5}/gi, tag: "simile" },

                // copula metaphor (was a / is a / became a)
                { regex: /\b(?:was|were|is|are|became|becomes)\s+(?:a|an|the)\s+[a-zA-Z'-]+\b/gi, tag: "metaphor" },

                // "as if" constructions
                { regex: /\bas\s+if\s+[^.!?]+/gi, tag: "simile" },

                // NEW: "X of Y" metaphor pattern (very common in Wilde)
                { regex: /\b[a-zA-Z'-]+\s+of\s+[a-zA-Z'-]+\b/gi, tag: "metaphor" }

            ];

            for (let i = 0; i < paragraphs.length; i++) {

                let text = paragraphs[i].textContent;
                text = normalizeText(text);

                patterns.forEach(p => {

                    text = text.replace(p.regex, match => {

                        figureID++;

                        const id = "figure-" + figureID;

                        figures.push({
                            type: p.tag,
                            text: match,
                            id: id
                        });

                        return `<${p.tag} id="${id}">${match}</${p.tag}>`;

                    });

                });

                output += `<p>${text}</p>`;
            }

            document.getElementById("novel-text").innerHTML = output;


            // SEARCH SYSTEM (runs after figures are detected)

            const searchBox = document.getElementById("figure-search");
            const resultsList = document.getElementById("search-results");

            function runSearch(){

                const query = searchBox.value.toLowerCase();

                resultsList.innerHTML = "";

                if(query.length === 0) return;

                figures.forEach(fig => {

                    if(fig.text.toLowerCase().includes(query)){

                        const li = document.createElement("li");

                        li.textContent = `${fig.type}: ${fig.text}`;

                        li.addEventListener("click", function(){

                            const target = document.getElementById(fig.id);

                            if(target){
                                target.scrollIntoView({
                                    behavior:"smooth",
                                    block:"center"
                                });
                            }

                        });

                        resultsList.appendChild(li);

                    }

                });

            }

            searchBox.addEventListener("input", runSearch);

        })
        .catch(error => {

            console.error("Error loading XML:", error);

            document.getElementById("novel-text").innerHTML =
                "<p>Failed to load the novel text. Make sure dorian_gray.xml is in the Text folder.</p>";

        });

});
