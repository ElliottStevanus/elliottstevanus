<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:strip-space elements="*"/>
    <xsl:output method="html" indent="yes"/>

    <!-- =========================
         FULL HTML STRUCTURE
    ========================== -->
    <xsl:template match="/">

        <html>

            <head>
                <meta charset="UTF-8"/>
                <title>Dorian Gray Text</title>

                <!-- IMPORTANT: use ROOT-RELATIVE PATHS -->
                <link rel="stylesheet" href="css/style.css"/>
            </head>

            <body>

                <h1>The Picture of Dorian Gray</h1>

                <!-- SEARCH UI (JS already in text.html only) -->
                <div id="analysis-panel">
                    <input type="text" id="figure-search"
                        placeholder="Search figurative language..."/>

                    <ul id="search-results"></ul>
                </div>

                <!-- NOVEL OUTPUT -->
                <div id="novel-text">
                    <xsl:apply-templates/>
                </div>

                <!-- JS LOADED ONLY ONCE (via text.html) -->

            </body>

        </html>

    </xsl:template>

    <!-- =========================
         TEXT STRUCTURE
    ========================== -->
    <xsl:template match="paragraph">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <!-- =========================
         FIGURATIVE LANGUAGE
    ========================== -->
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
