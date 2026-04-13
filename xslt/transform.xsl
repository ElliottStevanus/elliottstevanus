<xsl:template match="/">
    <html>
        <head>
            <title>Dorian Gray</title>
            <link rel="stylesheet" href="../css/style.css"/>
        </head>
        <body>
            <h1>The Picture of Dorian Gray</h1>
            <div id="novel-text">
                <xsl:apply-templates/>
            </div>
        </body>
    </html>
</xsl:template>

<xsl:template match="paragraph">
    <p><xsl:apply-templates/></p>
</xsl:template>
