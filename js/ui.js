// ui.js

export function setupUI(container) {

    const searchBox = document.getElementById("figure-search");
    const resultsList = document.getElementById("search-results");

    let indexed = Array.from(container.querySelectorAll("metaphor, simile"));

    // -------------------------
    // SEARCH
    // -------------------------
    searchBox.addEventListener("input", () => {

        const query = searchBox.value.toLowerCase();
        resultsList.innerHTML = "";

        if (!query) return;

        indexed.forEach(el => {

            if (el.textContent.toLowerCase().includes(query)) {

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

    // -------------------------
    // POPUPS
    // -------------------------
    container.querySelectorAll("metaphor, simile").forEach(el => {

        el.style.cursor = "pointer";

        el.addEventListener("click", () => {

            const paragraph = el.closest("p").textContent;

            alert(
                "METAPHOR:\n\n" +
                el.textContent +
                "\n\nCONTEXT:\n\n" +
                paragraph
            );
        });
    });

    // -------------------------
    // METAPHOR-ONLY MODE
    // -------------------------
    const btn = document.getElementById("metaphor-toggle");

    if (btn) {
        btn.addEventListener("click", () => {

            const paragraphs = container.querySelectorAll("p");

            paragraphs.forEach(p => {

                const hasMetaphor = p.querySelector("metaphor");

                p.style.display = hasMetaphor ? "" : "none";
            });
        });
    }
}
