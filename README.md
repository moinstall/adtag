##Introduction

The Ad Tag is a lightweight, easy and quick javascript based solution that makes it easy to integrate advertiser ads into your website.
The main usage of the ad tag is mobile websites, but it can also be used for in-app integrations.

##Integration Instructions

To complete integration, follow the steps: 
1. Make sure you have registered CDN and Ad Serving domains with support of http and https. 
2. Put file ad.js to your CDN. File can be downloaded from here: [https://github.com/moinstall/adtag/blob/master/ad_tag.js]
3. Rename PATH_TO_ADSERVER in ad.js to your AdServing Domain. 
4. Put simple ad tag provided below to your test app page. 
5. Make sure you have linked creative in the system.
6. Check if banner is displaying. 

##Ad Tag Code for InApp and Web
```
<!-- BEGIN TAG - DO NOT MODIFY -->
<script type="text/javascript">
    //<![CDATA[
    var _up=[
        [p, "PUT PLACEMENT ID HERE"],
        [format, "js"],
    ];

    var src = (location.protocol == 'https:' ? 'https:' : 'http:') + "// PUT CDN DOMAIN HERE/ad.js";
    document.write("<script type='text\/javascript' src='"+src+"'><\/script>");
    //]]>
</script>
<!-- END TAG -->
```

The script will pick up parameters, or whatever we need, and call our internal handler

http://ADSERVER/ad?p=<placement_id>&format=<format:(js|html)>

This handler will provide a valid iframe creative.
