(function() {

	var browser = {},
		ua = navigator.userAgent.toLowerCase(),
		s;

    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? browser.ie = s[1] :
    (s = ua.match(/msie ([\d.]+)/)) ? browser.ie = s[1] :
    (s = ua.match(/edge ([\d.]+)/)) ? browser.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? browser.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? browser.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? browser.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? browser.safari = s[1] : 0;
    
    if (browser.ie) document.write('IE: ' + browser.ie);
    if (browser.firefox) document.write('Firefox: ' + browser.firefox);
    if (browser.chrome) document.write('Chrome: ' + browser.chrome);
    if (browser.opera) document.write('Opera: ' + browser.opera);
    if (browser.safari) document.write('Safari: ' + browser.safari);

}());