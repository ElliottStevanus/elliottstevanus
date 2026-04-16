import { annotateXML } from "./annotator.js";
import { setupUI } from "./ui.js";

// Wait until the HTML document is fully loaded 
document.addEventListener("DOMContentLoaded", async () => {

    // Get the DOM element where the final rendered text will be inserted
    const container = document.getElementById("novel-text");

    // Fetch the XML file
    const xmlText = await fetch("Text/dorian_gray.xml").then(r => r.text());

    // Convert raw XML string into DOM  to be tinkered with
    const xml = new DOMParser().parseFromString(xmlText, "text/xml");

    // Extract all <paragraph> elements from the XML document
    const paragraphs = xml.getElementsByTagName("paragraph");

    // get annotator.js output xml
    const annotatedXML = annotateXML(paragraphs);

    // Convert annotated XML string back into it's structure so XSLT can process it 
    const annotatedDoc = new DOMParser().parseFromString(annotatedXML, "text/xml");

    // the first visible reading view in the browser
    runXSLT("xsl/reading.xsl", annotatedDoc, container);

    //set up User interface, taken from ui.js
    setupUI({
        container,
        annotatedDoc,
        runXSLT
    });
});


// rendering

function runXSLT(path, xmlDoc, container) {

    // Fetch the XSLT file
    fetch(path)
        .then(r => r.text()) // convert response into raw string ffor html
        .then(xsltText => {
            const xsltDoc =
                new DOMParser().parseFromString(xsltText, "text/xml");

            // Capply xslt to xml
            const processor = new XSLTProcessor();
            processor.importStylesheet(xsltDoc);

            // create html
            const result =
                processor.transformToFragment(xmlDoc, document);
            container.innerHTML = "";

            // Insert the newly generated HTML into the page
            container.appendChild(result);
        });
}
