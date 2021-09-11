import * as DEFS from './defs.js';
import {global} from './global.js';
import {init} from './init.js';

//ios
/* ピッチインピッチアウトによる拡大縮小を禁止 */
document.documentElement.addEventListener('touchstart', function (e) {
	if (e.touches.length >= 2) {e.preventDefault();}
}, {passive: false});
/* ダブルタップによる拡大を禁止 */
var t = 0;
document.documentElement.addEventListener('touchend', function (e) {
	var now = new Date().getTime();
		if ((now - t) < 350){
		e.preventDefault();
	}
	t = now;
}, false);

window.addEventListener('DOMContentLoaded', (event) => {
	init();
//	  window.requestAnimationFrame(mainLoop);
});

function mainLoop(timestamp) {
	
	window.requestAnimationFrame(mainLoop);
}

