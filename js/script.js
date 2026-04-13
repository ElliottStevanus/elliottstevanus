import { annotateXML } from "./annotator.js";
import { setupUI } from "./ui.js";
import { runXSLT } from "./renderer.js";

document.addEventListener("DOMContentLoaded", async () => {

    console.log("Script loaded ✔");

    const container = document.getElementById("novel-text");

    const xmlText = await fetch("../Text/dorian_gray.xml").then(r => r.text());
    const xml = new DOMParser().parseFromString(xmlText, "text/xml");

    const paragraphs = xml.getElementsByTagName("paragraph");

    // STEP 1: annotate
    const annotatedXML = annotateXML(paragraphs);

    const annotatedDoc =
        new DOMParser().parseFromString(annotatedXML, "text/xml");

    // STEP 2: initial render
    runXSLT("xsl/reading.xsl", annotatedDoc, container);

    // STEP 3: UI
    setupUI(container, annotatedDoc);

    // BUTTONS
    document.getElementById("view-reading").onclick = () =>
        runXSLT("xsl/reading.xsl", annotatedDoc, container);

    document.getElementById("view-metaphor").onclick = () =>
        runXSLT("xsl/metaphor.xsl", annotatedDoc, container);

    document.getElementById("view-analysis").onclick = () =>
        runXSLT("xsl/analysis.xsl", annotatedDoc, container);
});
