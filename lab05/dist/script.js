/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


var appState = {
  currentStyle: 'style1',
  styles: {
    style1: 'styles/style1.css',
    style2: 'styles/style2.css',
    style3: 'styles/style3.css'
  }
};
function changeStyle(styleKey) {
  var head = document.head;
  var previousStyle = document.getElementById('app-style');
  if (previousStyle) {
    head.removeChild(previousStyle);
  }
  var link = document.createElement('link');
  link.id = 'app-style';
  link.rel = 'stylesheet';
  link.href = appState.styles[styleKey];
  head.appendChild(link);
  appState.currentStyle = styleKey;
}
function handleChangeStyleButtonClick() {
  console.log('Button clicked!');
  var nextStyle;
  switch (appState.currentStyle) {
    case 'style1':
      nextStyle = 'style2';
      break;
    case 'style2':
      nextStyle = 'style3';
      break;
    case 'style3':
      nextStyle = 'style1';
      break;
    default:
      nextStyle = 'style1';
      break;
  }
  changeStyle(nextStyle);
}
var changeStyleButton = document.getElementById('change-style-button');
if (changeStyleButton) {
  changeStyleButton.addEventListener('click', handleChangeStyleButtonClick);
}
changeStyle(appState.currentStyle);
/******/ })()
;