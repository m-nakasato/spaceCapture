export const util = {
	rand: function(min, max) {
		return Math.floor(Math.random() * (max + 1 - min)) + min;
	},
	updateMsg: function(msg) {
		document.querySelector("#msg p").innerHTML = msg;
	}
};