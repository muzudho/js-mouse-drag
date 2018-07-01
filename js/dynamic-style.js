/**
 * Dynamic style.
 * @authore muzudho
 * @module js/dynamic-style
 */

function loadDynamicStyle() {

    // Tiles.
    for (let iTile = 0; iTile < 2; iTile += 1) {
        let elmTile = document.getElementById('tile' + iTile);
        if (elmTile !== null) {
            // 初期位置
            elmTile.style.left = Math.floor(Math.random() * 600) + 'px';
            elmTile.style.top = Math.floor(Math.random() * 400) + 'px';
            elmTile.style.width = 32 + 'px';
            elmTile.style.height = 64 + 'px';
        }
    }

}
