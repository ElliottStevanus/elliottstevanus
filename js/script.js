import { annotateXML } from "./annotator.js";
import { setupUI } from "./ui.js";
import { runXSLT } from "./renderer.js";

let annotatedDoc; // 👈 IMPORTANT: global within module

document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById("novel-text");

    const xmlText = await fetch("Text/dorian_gray.xml").then(r => r.text());
    const xml = new DOMParser().parseFromString(xmlText, "text/xml");

    const paragraphs = xml.getElementsByTagName("paragraph");

    const annotatedXML = annotateXML(paragraphs);

    annotatedDoc = new DOMParser().parseFromString(annotatedXML, "text/xml");

    // initial render
    runXSLT("xsl/reading.xsl", annotatedDoc, container);

    setupUI(container, annotatedDoc);

    document.getElementById("view-reading").onclick = () =>
        runXSLT("xsl/reading.xsl", annotatedDoc, container);

    document.getElementById("view-metaphor").onclick = () =>
        runXSLT("xsl/metaphor.xsl", annotatedDoc, container);

    document.getElementById("view-analysis").onclick = () =>
        runXSLT("xsl/analysis.xsl", annotatedDoc, container);
});
