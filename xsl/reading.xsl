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
            margin: 0 0 14px 0;
        }
    </style>
</head>

<body>

<div class="reading-container">

<xsl:for-each select="//paragraph">
    <p>
        <xsl:value-of select="."/>
    </p>
</xsl:for-each>

</div>

</body>
</html>
</xsl:template>

</xsl:stylesheet>
