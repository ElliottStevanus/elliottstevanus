<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">

<xsl:output method="html"/>

<xsl:template match="/">
<html>
<head>
    <style>
        body {
            background: #f4f1ea;
            font-family: Georgia, serif;
            margin: 0;
            padding: 40px 0;
        }

        .reading-container {
            max-width: 720px;
            margin: 0 auto;
            padding: 40px 50px;
            background: white;
            box-shadow: 0 8px 30px rgba(0,0,0,0.08);
            line-height: 1.7;
            font-size: 18px;
        }

        p {
            margin: 0 0 18px 0;
            text-indent: 1.5em;
        }

        .metaphor {
            background: rgba(255, 200, 0, 0.35);
            padding: 2px 4px;
            border-radius: 4px;
        }

        .simile {
            background: rgba(100, 160, 255, 0.35);
            padding: 2px 4px;
            border-radius: 4px;
        }
    </style>
</head>

<body>

<div class="reading-container">

<!-- GROUP EVERY 5 SENTENCES INTO ONE PARAGRAPH -->
<xsl:for-each select="//paragraph[position() mod 5 = 1]">
    <p>

        <xsl:apply-templates select="node()"/>
        <xsl:text> </xsl:text>

        <xsl:if test="following-sibling::paragraph[1]">
            <xsl:apply-templates select="following-sibling::paragraph[1]/node()"/>
            <xsl:text> </xsl:text>
        </xsl:if>

        <xsl:if test="following-sibling::paragraph[2]">
            <xsl:apply-templates select="following-sibling::paragraph[2]/node()"/>
            <xsl:text> </xsl:text>
        </xsl:if>

        <xsl:if test="following-sibling::paragraph[3]">
            <xsl:apply-templates select="following-sibling::paragraph[3]/node()"/>
            <xsl:text> </xsl:text>
        </xsl:if>

        <xsl:if test="following-sibling::paragraph[4]">
            <xsl:apply-templates select="following-sibling::paragraph[4]/node()"/>
        </xsl:if>

    </p>
</xsl:for-each>

</div>

</body>
</html>
</xsl:template>

<!-- HIGHLIGHT METAPHORS -->
<xsl:template match="metaphor">
    <span class="metaphor">
        <xsl:apply-templates/>
    </span>
</xsl:template>

<!-- HIGHLIGHT SIMILES -->
<xsl:template match="simile">
    <span class="simile">
        <xsl:apply-templates/>
    </span>
</xsl:template>

<!-- DEFAULT TEXT -->
<xsl:template match="text()">
    <xsl:value-of select="."/>
</xsl:template>

</xsl:stylesheet>
