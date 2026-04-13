<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:strip-space elements="*"/>
    <xsl:output method="html" indent="yes"/>

    <xsl:template match="/">

        <xsl:apply-templates/>

    </xsl:template>

    <xsl:template match="paragraph">
        <p><xsl:apply-templates/></p>
    </xsl:template>

</xsl:stylesheet>
