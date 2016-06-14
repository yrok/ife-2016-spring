/*
 *@description 复选,获取radio,然后点击变换背景颜色做交互.
 *@property {object} radioOuter - radio btn ,outer
 *@property {object} radioOuter - radio btn ,inner
 */
 var radioOuter = document.getElementsByClassName('td-radio-outer')[0];
 var radioInner = document.getElementsByClassName('td-radio-inner')[0];
 radioOuter.onclick = function() {
   if (radioInner.style.display === "none") {
     radioOuter.style.backgroundColor = "#f07600";
     radioInner.style.display = "block";
   }else {
     radioOuter.style.backgroundColor = "#ebebeb";
     radioInner.style.display = "none";
   }
 }
