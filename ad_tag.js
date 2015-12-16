(function () {

var baseURL = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'PATH_TO_ADSERVER/ad'; // This URL should be different for different clients, AFAIU.

// Get TZ offset
var tzOffset = new Date().getTimezoneOffset();

// Get major flash version
var flashVersion = 0;

if (typeof navigator.plugins != undefined && typeof navigator.plugins["Shockwave Flash"] == "object" ) {
    var d = navigator.plugins["Shockwave Flash"].description;
    if (d && !(typeof navigator.mimeTypes != undefined && navigator.mimeTypes["application/x-shockwave-flash"] && !navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)) {
        d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
        flashVersion = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
    }
} else if (typeof window.ActiveXObject != undefined) {
    try {
        var a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
        if (a) {
            var d = a.GetVariable("$version");
            if (d) {
                d = d.split(" ")[1].split(",");
                flashVerstion = parseInt(d[0], 10);
            }
        }
    }
    catch(e) {}
}

// Get referer
var refererURL = '';
if (top!=self)refererURL = encodeURIComponent(document.referrer);

/* Calculate visibility */
// Add new transparent pixel, so we can get it's offset
var pix_id = "tpix_" + Math.floor( (Math.random()*100000000) + 1 ) + (new Date()).getMilliseconds();
document.write(
  "<img id='" + pix_id + "' src='1x1.png' width='1' height='1' style='position: absolute; -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\"; filter: alpha(opacity=0); -moz-opacity: 0; -khtml-opacity: 0; opacity: 0;' alt=''>"
);

// Trying to calculate pixel's offsetY
var pix = document.getElementById ? document.getElementById(pix_id) : document.all[pix_id];
var pos = pix ? pix.offsetTop : 0;
while (pix && (pix.offsetParent != null)) {
   pix = pix.offsetParent;
   pos += pix.offsetTop;
   if (pix.tagName == 'BODY') break;
}

// Trying to calculate browser window height
var winHeight = 0;

if( typeof( window.innerHeight ) == 'number' ) {
    // Non-IE
    winHeight = window.innerHeight;
} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    // IE 6+ in 'standards compliant mode'
    winHeight = document.documentElement.clientHeight;
} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    // IE 4 compatible
    winHeight = document.body.clientHeight;
}

// Compare and save
if ( (pos || (pos === 0)) && winHeight ) { // If winHeight === 0, there is something wrong, so report as N/A
    pos > winHeight ? pos='btf' : pos='atf';
} else {
    pos='';
}

// Store all data
var params = [ 'ref='+refererURL, 'tz='+tzOffset, 'fl='+flashVersion, 'pos='+pos, 'ord='+Math.floor(Math.random()*10e12) ];

var embedType = 'adj'; // serve with 'script' tag by default
var size = [];
// Add user-defined params to final URL
if (_up instanceof Array ) {
    for (var i=0; i< _up.length; i++) {
        var p = _up[i];
        if (!(p instanceof Array)) continue;
        
        params.push(p[0]+'='+p[1]);
        if (p[0] == 'w') {
            size[0] = _up[i][1];
        } else if (p[0] == 'h') {
            size[1] = _up[i][1];
        }
    }
}

baseURL += '?' + params.join('&');

if (embedType == 'adj') {
    document.write("<script type='text/javascript' src='"+ baseURL +"'></script>");
} else {
    document.write("<iframe src='"+ baseURL +"' style='border:none;height:"+size[1]+"px;width:"+size[0]+"px' width='" + size[0] +"' height='" + size[1]+ "' border='0'></iframe>");
}

})();

