<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">

<xsl:output method="html"/>
<!-- Makes it show up on the page as HTML-->

<xsl:template match="/">

<html>
<body>

<h2>Analysis View</h2>

<xsl:template match="/">

<html>
<body>

<h2>Analysis View</h2>

<svg width="600" height="300" xmlns="http://www.w3.org/2000/svg">

    <!-- Simile subtype -->

    <!-- as_as -->
    <text x="40" y="40">as_as</text>
    <rect x="120" y="25"
          width="{count(//simile[@subtype='simile_general']) * 10}"
          height="15"
          fill="steelblue"/>

    <!-- like_the -->
    <text x="40" y="80">like_the</text>
    <rect x="120" y="65"
          width="{count(//simile[@subtype='simile_general']) * 10}"
          height="15"
          fill="steelblue"/>

    <!-- as_if -->
    <text x="40" y="120">as_if</text>
    <rect x="120" y="105"
          width="{count(//simile[@subtype='simile_general']) * 10}"
          height="15"
          fill="steelblue"/>

    <!-- Metapbot subtypes -->

    <!-- is_a -->
    <text x="40" y="170">is_a</text>
    <rect x="120" y="155"
          width="{count(//metaphor[@subtype='metaphor_is_a']) * 10}"
          height="15"
          fill="tomato"/>

    <!-- becomes -->
    <text x="40" y="210">becomes</text>
    <rect x="120" y="195"
          width="{count(//metaphor[@subtype='metaphor_becomes']) * 10}"
          height="15"
          fill="tomato"/>

</svg>

</body>
</html>

</xsl:template>

</body>
</html>
</xsl:template>

</xsl:stylesheet>
