/**
 * Chicken foot.
 * @module js/chicken-foot
 */
/*jslint es6 */

/** Global variables. */
G = {
	/** 0 <= x < 360 */
	angleDeg: [],
	/** Mouse click on sprite. */
	holdPoint: {
		x: 0,
		y: 0
	}
};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 * {@Link https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array |2011-06-08 How can I shuffle an array?}
 */
function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

function onLoad() {

	// Decks.
	for (let iDeck = 0; iDeck < 2; iDeck += 1) {
		let deckId = 'deck' + iDeck;
		let deckObj = document.getElementById(deckId);
		deckObj.style.left = "10px";
		deckObj.style.top = (300 + 100 * iDeck) + "px";
	}

	// Board. ドロップされる側
	let board = document.getElementById('board');
	board.ondragover = function (event) {
		event.dataTransfer.dropEffect = "move";
		// ドロップ許可
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			return false;
		}
	};

	// Tiles.
	for (let iTile = 0; iTile < 2; iTile += 1) {
		let id = 'tile' + iTile;
		let obj = document.getElementById(id);
		if (obj !== null) {
			G.angleDeg[id] = 0;
			obj.draggable = true;

			// 初期位置
			obj.style.left = Math.floor(Math.random() * 600) + 'px';
			obj.style.top = Math.floor(Math.random() * 400) + 'px';

			// https://hakuhin.jp/js/data_transfer.html#DATA_TRANSFER_04
			obj.ondragstart = function (event) {
				event.dataTransfer.effectAllowed = "move";
			};
			// タイルの上にも落としたい
			obj.ondragover = function (event) {
				event.dataTransfer.dropEffect = "move";
				// ドロップ許可
				if (event.preventDefault) {
					event.preventDefault();
				} else {
					return false;
				}
			};

			obj.ondragstart = function (event) {
				let rectBodyClient = document.body.getBoundingClientRect();
				
				console.log( "body left: " + rectBodyClient.left +
				", event.clientX: " + event.clientX +
				", event.target.style.left: " + event.target.style.left);

				console.log( "body top: " + rectBodyClient.top +
				", event.clientY: " + event.clientY +
				", event.target.style.top: " + event.target.style.top);
				
				G.holdPoint.x = event.clientX - parseInt(event.target.style.left,10) - rectBodyClient.left;
				G.holdPoint.y = event.clientY - parseInt(event.target.style.top,10) - rectBodyClient.top;
				console.log( "holdPoint x: " + G.holdPoint.x +
					", y: " + G.holdPoint.y );
			};
			
			obj.ondrag = function (event) {
				let id = event.target.id;
				if (!(event.clientX === 0 && event.clientY === 0)) {
					// TODO 画面をスクロールしている場合、左上座標は。

					let rectBodyClient = document.body.getBoundingClientRect();
					let elmMsgBodyClientRect = document.getElementById('msgBodyClientRect');
					elmMsgBodyClientRect.innerHTML = "Body client rect = (left: " +
						rectBodyClient.left + ", top: " +
						rectBodyClient.top + ", right: " +
						rectBodyClient.right + ", bottom: " +
						rectBodyClient.bottom + ") click point = (x: " + event.clientX + ", y: " + event.clientY + ")" +
						" Target point = (left: " + obj.getBoundingClientRect().left + ", top: " + obj.getBoundingClientRect().top + ")";
					elmMsgBodyClientRect.style.left = (0 - rectBodyClient.left) + "px";
					elmMsgBodyClientRect.style.top = (0 - rectBodyClient.top) + "px";
					
					obj.style.left = (event.clientX - rectBodyClient.left - G.holdPoint.x) + 'px';
					obj.style.top = (event.clientY - rectBodyClient.top - G.holdPoint.y) + 'px';
				}
			};

			/**
			 * Clicked tag such as img.
			 * @param {string} id - HTML tag id.
			 */
			obj.onclick = function (event) {
				let id = event.target.id;
				G.angleDeg[id] = (G.angleDeg[id] + 30) % 360;
				document.getElementById(id).style.transform = 'rotate(' + G.angleDeg[id] + 'deg)';
			};
		}
	}
}
