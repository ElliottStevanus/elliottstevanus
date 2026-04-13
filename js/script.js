// script.js

import { annotateXML } from "./annotator.js";
import { renderReadingView } from "./renderer.js";
import { setupUI } from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById("novel-text");

    const xmlText = await fetch("Text/dorian_gray.xml").then(r => r.text());
    const xml = new DOMParser().parseFromString(xmlText, "text/xml");

    const paragraphs = xml.getElementsByTagName("paragraph");

    const annotatedXML = annotateXML(paragraphs);
    const annotatedDoc = new DOMParser().parseFromString(annotatedXML, "text/xml");

    renderReadingView(annotatedDoc, container);
    setupUI(container, annotatedDoc);
});
