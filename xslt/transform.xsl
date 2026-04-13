<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <!-- REMOVE XML INDENTATION WHITESPACE -->
    <xsl:strip-space elements="*"/>

    <xsl:output method="html" indent="yes"/>

    <!-- ROOT TEMPLATE -->
    <xsl:template match="/">
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>The Picture of Dorian Gray</title>

                <!-- CSS -->
                <link rel="stylesheet" href="../css/style.css"/>
            </head>

            <body>

                <h1>The Picture of Dorian Gray</h1>

                <!-- SEARCH PANEL -->
                <div id="analysis-panel">
                    <input type="text" id="figure-search"
                        placeholder="Search figurative language..."/>
                    <ul id="search-results"></ul>
                </div>

                <!-- MAIN TEXT OUTPUT -->
                <div id="novel-text">
                    <xsl:apply-templates/>
                </div>

                <!-- JS (analysis layer after XSLT rendering) -->
                <script src="../js/script.js" defer="defer"></script>

            </body>
        </html>
    </xsl:template>

    <!-- PARAGRAPHS -->
    <xsl:template match="paragraph">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <!-- fixes  whitespace -->
    <xsl:template match="text()">
        <xsl:value-of select="translate(., '&#10;&#13;', ' ')"/>
    </xsl:template>

</xsl:stylesheet>
