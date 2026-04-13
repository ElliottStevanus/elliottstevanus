<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:strip-space elements="*"/>
    <xsl:output method="html" indent="yes"/>

    <xsl:template match="/">

        <div>

            <h1>The Picture of Dorian Gray</h1>

            <div id="novel-text">
                <xsl:apply-templates/>
            </div>

        </div>

    </xsl:template>


    <xsl:template match="paragraph">
        <p><xsl:apply-templates/></p>
    </xsl:template>

</xsl:stylesheet>
