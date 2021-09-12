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
			msg = global.player1Name + " Win!!";
		} else {
			msg = global.player2Name + " Win!!";
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
	if (global.level == "easy") {
		let walls = document.querySelectorAll(".wall[data-clicked='0']");
		let index = util.rand(0, walls.length - 1);
		setTimeout(function () {
			walls[index].setAttribute("data-clicked", 1);
			let x = walls[index].getAttribute("data-x");
			let y = walls[index].getAttribute("data-y");
			let type = walls[index].getAttribute("data-type");
			action(x, y, type);
		}, 1000);
		util.updateMsg("Thinking...");
		return;
	} else {
		for (let y = 0; y < global.spaces.length; y++) {
			for (let x = 0; x < global.spaces[y].length; x++) {
				if (global.spaces[y][x] == 3) {
					let top = document.querySelector(".wall[data-x='" + x + "'][data-y='" + y + "'][data-type='h']");
					let right = document.querySelector(".wall[data-x='" + (x + 1) + "'][data-y='" + y + "'][data-type='v']");
					let bottom = document.querySelector(".wall[data-x='" + x + "'][data-y='" + (y + 1) + "'][data-type='h']");
					let left = document.querySelector(".wall[data-x='" + x + "'][data-y='" + y + "'][data-type='v']");
					if (top.getAttribute("data-clicked") == 0) {
						top.setAttribute("data-clicked", 1);
						action(x, y, "h");
					} else if (right.getAttribute("data-clicked") == 0) {
						right.setAttribute("data-clicked", 1);
						action(x + 1, y, "v");
					} else if (bottom.getAttribute("data-clicked") == 0) {
						bottom.setAttribute("data-clicked", 1);
						action(x, y + 1, "h");
					} else if (left.getAttribute("data-clicked") == 0) {
						left.setAttribute("data-clicked", 1);
						action(x, y, "v");
					}
					return;
				}
			}
		}
		
		let walls = document.querySelectorAll(".wall[data-clicked='0']");
		let index = util.rand(0, walls.length - 1);
		setTimeout(function () {
			walls[index].setAttribute("data-clicked", 1);
			let x = walls[index].getAttribute("data-x");
			let y = walls[index].getAttribute("data-y");
			let type = walls[index].getAttribute("data-type");
			action(x, y, type);
		}, 1000);
		util.updateMsg("Thinking...");
		return;
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