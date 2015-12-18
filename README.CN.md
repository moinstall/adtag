###Introduction

Ad Tag 是一个用于方便快捷地把广告商的广告集成到网页的轻量级的基于javascript的解决方案，
Ad tag 的主要适用场合是移动网页，但是也可以用于App内部集成。

##集成指令

请按照以下步骤完成集成：

1. 确认你已经注册的CDN 和广告服务域名都支持http 和https.
2. 把ad.js 置入你的CDN。 文件可以从如下地址下载   https://github.com/moinstall/adtag/blob/master/ad_tag.js
3. 把ad.js文件中的PATH_TO_ADSERVER替换成你的广告服务器的域名
4. 把下面提供的简单的ad tag代码置入你的测试app页面
5. 确认你已经链接了系统的广告素材
6. 验证广告条是否正在显示

###Ad Tag 代码用于网络和App集成

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

这段脚本会提取变量或者其余所需的信息来调用我们内部的接口

```
http://ADSERVER/ad?p=<placement_id>&format=<format:(js|html)>
```

这段接口代码会提供一个有效的内嵌式的广告素材
