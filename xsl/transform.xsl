
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <xsl:output method="html"/>
    
    <!-- ========================= -->
    <!-- ROOT TEMPLATE -->
    <!-- ========================= -->
    
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
                    background: white;
                    padding: 40px 50px;
                    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
                    line-height: 1.7;
                    font-size: 18px;
                    }
                    
                    .section {
                    margin-bottom: 30px;
                    padding-bottom: 10px;
                    }
                    
                    p {
                    margin: 0 0 18px 0;
                    text-indent: 1.5em;
                    }
                    
                    .metaphor {
                    background: rgba(255, 200, 0, 0.35);
                    padding: 2px 4px;
                    border-radius: 4px;
                    cursor: pointer;
                    }
                    
                    .simile {
                    background: rgba(100, 160, 255, 0.35);
                    padding: 2px 4px;
                    border-radius: 4px;
                    cursor: pointer;
                    }
                    
                    .aphorism {
                    background: rgba(180, 255, 180, 0.35);
                    padding: 2px 4px;
                    border-radius: 4px;
                    cursor: pointer;
                    }
                    
                </style>
            </head>
            
            <body>
                
                <div class="reading-container">
                    
                    <!-- SECTION WRAPPER (every 5 paragraphs) -->
                    <xsl:for-each select="document/node()/paragraph[position() mod 5 = 1]">
                        
                        <div class="section">
                            
                            <xsl:call-template name="render-paragraph-block">
                                <xsl:with-param name="start" select="position()"/>
                            </xsl:call-template>
                            
                        </div>
                        
                    </xsl:for-each>
                    
                </div>
                
            </body>
        </html>
        
    </xsl:template>
    
    <!-- ========================= -->
    <!-- SECTION BUILDER -->
    <!-- ========================= -->
    
    <xsl:template name="render-paragraph-block">
        <xsl:param name="start"/>
        
        <!-- render 5 paragraphs -->
        <xsl:for-each select="ancestor::node()/paragraph[position() = $start]">
            
            <p id="{generate-id()}">
                <xsl:apply-templates/>
            </p>
            
            <xsl:if test="following-sibling::paragraph[1]">
                <p id="{generate-id(following-sibling::paragraph[1])}">
                    <xsl:apply-templates select="following-sibling::paragraph[1]/node()"/>
                </p>
            </xsl:if>
            
            <xsl:if test="following-sibling::paragraph[2]">
                <p id="{generate-id(following-sibling::paragraph[2])}">
                    <xsl:apply-templates select="following-sibling::paragraph[2]/node()"/>
                </p>
            </xsl:if>
            
            <xsl:if test="following-sibling::paragraph[3]">
                <p id="{generate-id(following-sibling::paragraph[3])}">
                    <xsl:apply-templates select="following-sibling::paragraph[3]/node()"/>
                </p>
            </xsl:if>
            
            <xsl:if test="following-sibling::paragraph[4]">
                <p id="{generate-id(following-sibling::paragraph[4])}">
                    <xsl:apply-templates select="following-sibling::paragraph[4]/node()"/>
                </p>
            </xsl:if>
            
        </xsl:for-each>
    </xsl:template>
    
    <!-- ========================= -->
    <!-- FIGURATIVE LANGUAGE -->
    <!-- ========================= -->
    
    <xsl:template match="metaphor | simile | aphorism">
        
        <span class="{name()}"
            data-type="{name()}"
            data-sentence="{generate-id(..)}">
            
            <xsl:apply-templates/>
            
        </span>
        
    </xsl:template>
    
    <!-- ========================= -->
    <!-- TEXT -->
    <!-- ========================= -->
    
    <xsl:template match="text()">
        <xsl:value-of select="."/>
    </xsl:template>
    
</xsl:stylesheet>
