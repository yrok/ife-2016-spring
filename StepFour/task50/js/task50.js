/*
获取checkbox,然后点击变换背景颜色做交互.
 */
 var table = document.getElementsByTagName('table')[0];
table.onclick = function(ev) {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;

	if (target.className == 'outer') {
		target.className  = 'addShadow';
    } else if (target.className == 'addShadow'){
    	target.className = 'outer';
    }
}/*
获取checkbox,然后点击变换背景颜色做交互.
 */
 var divTable = document.getElementsByClassName("t-main")[0];
divTable.onclick = function(ev) {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;

	if (target.className == 'outer') {
		target.className  = 'outer addShadow';
  } else if (target.className == 'outer addShadow'){
    	target.className = 'outer';
    }
}

/*
 *@description 
 */
