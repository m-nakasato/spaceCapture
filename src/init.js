import * as DEFS from './defs.js';
import {global} from './global.js';
import {action} from './action.js';

export const init = function () {
	let board = document.querySelector("#board");
	
	let spaceTemp = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	spaceTemp.setAttribute("fill", "black");
	spaceTemp.setAttribute("width", DEFS.DOT_INTERVAL);
	spaceTemp.setAttribute("height", DEFS.DOT_INTERVAL);
	spaceTemp.setAttribute("rx", DEFS.DOT_RADIUS * 3);
	spaceTemp.setAttribute("ry", DEFS.DOT_RADIUS * 3);
	let spaces = new Array(DEFS.DOT_ROW_NUM - 1);
	for (let r = 0; r < DEFS.DOT_ROW_NUM - 1; r++) {
		spaces[r] = new Array(DEFS.DOT_COL_NUM - 1);
	}
	for (let r = 0; r < DEFS.DOT_ROW_NUM - 1; r++) {
		for (let c = 0; c < DEFS.DOT_COL_NUM - 1; c++) {
			spaces[r][c] = spaceTemp.cloneNode(true);
			spaces[r][c].setAttribute("x", DEFS.BOARD_PADDING + DEFS.DOT_RADIUS + DEFS.DOT_INTERVAL * c);
			spaces[r][c].setAttribute("y", DEFS.BOARD_PADDING + DEFS.DOT_RADIUS + DEFS.DOT_INTERVAL * r);
			spaces[r][c].setAttribute("id", "x" + c + "y" + r);
			board.appendChild(spaces[r][c]);
		}
	}
	
	let hWallTemp = document.createElementNS("http://www.w3.org/2000/svg", "line");
	hWallTemp.setAttribute("stroke", DEFS.WALL_STROKE);
	hWallTemp.setAttribute("stroke-width", DEFS.DOT_RADIUS * 2);
	hWallTemp.setAttribute("class", "wall");
	hWallTemp.setAttribute("data-type", "h");
	hWallTemp.setAttribute("data-clicked", 0);
	let hWalls = new Array(DEFS.DOT_ROW_NUM);
	for (let r = 0; r < DEFS.DOT_ROW_NUM; r++) {
		hWalls[r] = Array(DEFS.DOT_COL_NUM - 1)
	}
	for (let r = 0; r < DEFS.DOT_ROW_NUM; r++) {
		for (let c = 0; c < DEFS.DOT_COL_NUM - 1; c++) {
			hWalls[r][c] = hWallTemp.cloneNode(true);
			hWalls[r][c].setAttribute("x1", DEFS.BOARD_PADDING + DEFS.DOT_RADIUS + DEFS.DOT_INTERVAL * c + DEFS.DOT_RADIUS);
			hWalls[r][c].setAttribute("y1", DEFS.BOARD_PADDING + DEFS.DOT_RADIUS + DEFS.DOT_INTERVAL * r);
			hWalls[r][c].setAttribute("x2", DEFS.BOARD_PADDING + DEFS.DOT_RADIUS + DEFS.DOT_INTERVAL * (c + 1) - DEFS.DOT_RADIUS);
			hWalls[r][c].setAttribute("y2", DEFS.BOARD_PADDING + DEFS.DOT_RADIUS + DEFS.DOT_INTERVAL * r);
			hWalls[r][c].setAttribute("data-x", c);
			hWalls[r][c].setAttribute("data-y", r);
			board.appendChild(hWalls[r][c]);
			global.counter++;
		}
	}
	
	let vWallTemp = document.createElementNS("http://www.w3.org/2000/svg", "line");
	vWallTemp.setAttribute("stroke", DEFS.WALL_STROKE);
	vWallTemp.setAttribute("stroke-width", DEFS.DOT_RADIUS * 2);
	vWallTemp.setAttribute("class", "wall");
	vWallTemp.setAttribute("data-type", "v");
	vWallTemp.setAttribute("data-clicked", 0);
	let vWalls = new Array(DEFS.DOT_ROW_NUM - 1);
	for (let r = 0; r < DEFS.DOT_ROW_NUM - 1; r++) {
		vWalls[r] = Array(DEFS.DOT_COL_NUM)
	}
	for (let r = 0; r < DEFS.DOT_ROW_NUM - 1; r++) {
		for (let c = 0; c < DEFS.DOT_COL_NUM; c++) {
			vWalls[r][c] = vWallTemp.cloneNode(true);
			vWalls[r][c].setAttribute("x1", DEFS.BOARD_PADDING + DEFS.DOT_RADIUS + DEFS.DOT_INTERVAL * c);
			vWalls[r][c].setAttribute("y1", DEFS.BOARD_PADDING + DEFS.DOT_RADIUS + DEFS.DOT_INTERVAL * r + DEFS.DOT_RADIUS);
			vWalls[r][c].setAttribute("x2", DEFS.BOARD_PADDING + DEFS.DOT_RADIUS + DEFS.DOT_INTERVAL * c);
			vWalls[r][c].setAttribute("y2", DEFS.BOARD_PADDING + DEFS.DOT_RADIUS + DEFS.DOT_INTERVAL * (r + 1) - DEFS.DOT_RADIUS);
			vWalls[r][c].setAttribute("data-x", c);
			vWalls[r][c].setAttribute("data-y", r);
			board.appendChild(vWalls[r][c]);
			global.counter++;
		}
	}

	let dotTemp = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	dotTemp.setAttribute("r", DEFS.DOT_RADIUS);
	dotTemp.setAttribute("fill", DEFS.WALL_STROKE);
	let dots = new Array(DEFS.DOT_ROW_NUM);
	for (let r = 0; r < DEFS.DOT_ROW_NUM; r++) {
		dots[r] = new Array(DEFS.DOT_COL_NUM);
	}
	for (let r = 0; r < DEFS.DOT_ROW_NUM; r++) {
		for (let c = 0; c < DEFS.DOT_COL_NUM; c++) {
			dots[r][c] = dotTemp.cloneNode(true);
			dots[r][c].setAttribute("cx", DEFS.BOARD_PADDING + DEFS.DOT_RADIUS + DEFS.DOT_INTERVAL * c);
			dots[r][c].setAttribute("cy", DEFS.BOARD_PADDING + DEFS.DOT_RADIUS + DEFS.DOT_INTERVAL * r);
//			board.appendChild(dots[r][c]);
		}
	}

	global.spaces = new Array(DEFS.DOT_ROW_NUM - 1);
	for (let r = 0; r < DEFS.DOT_ROW_NUM - 1; r++) {
		global.spaces[r] = Array(DEFS.DOT_COL_NUM - 1).fill(0);
	}
	
	document.querySelectorAll(".wall").forEach((wall) => {
		wall.addEventListener("click", (e) => {
			if (global.mode == "com" && global.turn == 2) return;
			
			if (e.currentTarget.getAttribute("data-clicked") == 1) return;
			e.currentTarget.setAttribute("data-clicked", 1);
			
			let x = e.currentTarget.getAttribute("data-x");
			let y = e.currentTarget.getAttribute("data-y");
			let type = e.currentTarget.getAttribute("data-type");
			action(x, y, type);
//console.table(global.spaces);
		});
	});
	
	document.querySelector("#mode_player").addEventListener("click", (e) => {
		selectMode("player");
	});
	
	document.querySelector("#mode_com").addEventListener("click", (e) => {
		selectMode("com");
	});
}

function selectMode(mode) {
	global.mode = mode;
	if (mode == "player") {
		global.player1Name = "Player 1";
		global.player2Name = "Player 2";
	} else if (mode == "com") {
		global.player1Name = "Player";
		global.player2Name = "Computer";
	}
	document.querySelector("#player1 div:not(.arrow) h2").innerHTML = global.player1Name;
	document.querySelector("#player2 div:not(.arrow) h2").innerHTML = global.player2Name;
	document.querySelector("#intro").classList.add("hide");
}