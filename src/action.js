import * as DEFS from './defs.js';
import {global} from './global.js';
import {util} from './util.js';

export const action = function action(x, y, type) {
//console.log("x: " + x + ", y: " + y + ", type: " + type);
	let isGetSpace = false;
	if (y < DEFS.DOT_ROW_NUM - 1 && x < DEFS.DOT_COL_NUM - 1) {
		global.spaces[y][x]++;
		if (global.spaces[y][x] == 4) {
			getSpace(x, y);
			isGetSpace = true;
		}
	}
	if (type === "h") {
		if (y > 0) {
			global.spaces[y - 1][x]++;
			if (global.spaces[y - 1][x] == 4) {
				getSpace(x, y - 1);
				isGetSpace = true;
			}
		}
	} else {
		if (x > 0) {
			global.spaces[y][x - 1]++;
			if (global.spaces[y][x - 1] == 4) {
				getSpace(x - 1, y);
				isGetSpace = true;
			}
		}
	}
	if (--global.counter == 0) {
		let msg = "";
		if (global.spaces1 > global.spaces2) {
			msg = "Player 1 Win!!";
		} else {
			msg = "Player 2 Win!!";
		}
		util.updateMsg(msg + "<br /><a href='javascript:location.reload()'>Start page</a>");
		return;
	}
	if (!isGetSpace) {
		changeTurn();
		util.updateMsg("Click on the bar!");
	} else {
		util.updateMsg("Click again!");
	}
	if (global.mode == "com" && global.turn == 2) {
		comAction();
	}
}

function comAction() {
	let walls = document.querySelectorAll(".wall");
	while (true) {
		let index = util.rand(0, walls.length - 1);
		if (walls[index].getAttribute("data-clicked") == 0) {
			walls[index].setAttribute("data-clicked", 1);
			let x = walls[index].getAttribute("data-x");
			let y = walls[index].getAttribute("data-y");
			let type = walls[index].getAttribute("data-type");
			action(x, y, type);
			break;
		} else {
console.log("fail");
		}
	}
}

function getSpace(x, y) {
	if (global.turn == 1) {
		document.querySelector("#x" + x + "y" + y).setAttribute("fill", "lime");
		document.querySelector("#player1 .spaces span").innerText = ++global.spaces1;
	} else {
		document.querySelector("#x" + x + "y" + y).setAttribute("fill", "magenta");
		document.querySelector("#player2 .spaces span").innerText = ++global.spaces2;
	}
}

function changeTurn() {
	if (global.turn == 1) {
		global.turn = 2;
		document.querySelector("#player1 .arrow").classList.remove("current");
		document.querySelector("#player2 .arrow").classList.add("current");
	} else {
		global.turn = 1;
		document.querySelector("#player1 .arrow").classList.add("current");
		document.querySelector("#player2 .arrow").classList.remove("current");
	}
}