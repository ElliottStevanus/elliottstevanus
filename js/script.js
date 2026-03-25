document.addEventListener("DOMContentLoaded", function () {

    let figureID = 0;

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

                { regex: /\bas\s+[a-zA-Z'-]+\s+as\s+[a-zA-Z'-]+\b/gi, tag: "simile" },

                { regex: /\blike\s+(?:a|an|the)\s+[a-zA-Z'-]+\b/gi, tag: "simile" },

                { regex: /\blike\s+(?:a|an|the)\s+[a-zA-Z'-]+(?:\s+[a-zA-Z'-]+){0,5}/gi, tag: "simile" },

                { regex: /\b(?:was|were|is|are|became|becomes)\s+(?:a|an|the)\s+[a-zA-Z'-]+\b/gi, tag: "metaphor" },

                { regex: /\bas\s+if\s+[^.!?]+/gi, tag: "simile" }

            ];

            for (let i = 0; i < paragraphs.length; i++) {

                let text = paragraphs[i].textContent;
                text = normalizeText(text);

                patterns.forEach(p => {

                    text = text.replace(p.regex, match => {

                        figureID++;

                        const id = "figure-" + figureID;

                        addToIndex(p.tag, match, id);

                        return `<${p.tag} id="${id}">${match}</${p.tag}>`;

                    });

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


    // FUNCTION TO ADD ITEMS TO THE INDEX PANEL
    function addToIndex(type, text, id){

        let listID = "";

        if(type === "simile"){
            listID = "simile-list";
        }

        if(type === "metaphor"){
            listID = "metaphor-list";
        }

        const list = document.getElementById(listID);

        if(!list) return;

        const li = document.createElement("li");

        li.textContent = text;

        li.addEventListener("click", function(){

            const target = document.getElementById(id);

            if(target){
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

        });

        list.appendChild(li);

    }

});
