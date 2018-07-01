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
    mouseDrag: {
        holdPoint: {
            x: 0,
            y: 0
        }
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

    loadDynamicStyle();

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

            obj.ondragstart = onDragStart;
            obj.ondrag = onDrag;

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
