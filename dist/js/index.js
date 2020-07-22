oHTML = document.querySelector('html');
var aWidth = oHTML.clientWidth;

// default width: 375px
// default font-size: 16px
oHTML.style.fontSize = (aWidth / 375)*16 + 'px';