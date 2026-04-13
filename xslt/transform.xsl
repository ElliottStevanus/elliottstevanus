<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:strip-space elements="*"/>
    <xsl:output method="html" indent="yes"/>

    <!-- FULL PAGE STRUCTURE -->
    <xsl:template match="/">

        <html>

            <head>
                <meta charset="UTF-8"/>
                <title>Dorian Gray Text</title>

                <!-- CSS MUST LIVE HERE NOW -->
                <link rel="stylesheet" href="../css/style.css"/>

                <!-- JS MUST LIVE HERE NOW -->
                <script src="../js/script.js" defer="defer"></script>
            </head>

            <body>

                <h1>The Picture of Dorian Gray</h1>

                <!-- SEARCH UI -->
                <div id="analysis-panel">
                    <input type="text" id="figure-search" placeholder="Search figurative language..."/>
                    <ul id="search-results"></ul>
                </div>

                <!-- NOVEL OUTPUT -->
                <div id="novel-text">
                    <xsl:apply-templates/>
                </div>

            </body>

        </html>

    </xsl:template>

    <!-- TEXT STRUCTURE -->
    <xsl:template match="paragraph">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <!-- FIGURATIVE LANGUAGE -->
    <xsl:template match="simile">
        <i class="simile">
            <xsl:apply-templates/>
        </i>
    </xsl:template>

    <xsl:template match="metaphor">
        <span class="metaphor">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

</xsl:stylesheet>
