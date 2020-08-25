const EMPTY_OBJ = {},
      EMPTY_ARY = [];

/**
 * Grid Class
 */
export class Grid {
    constructor(id, data = [], options = {}) {
        options = Object.assign({}, Grid.defaultOptions, options);

        this.id = id;
        this.data = data;
        this.options = options || EMPTY_OBJ;
        this.tiles = {};
    }

    createTile(idx, text, options) {
        let tile     = new Tile(idx, text, options),
            tileHTML = tile.render();

        // add tile to a map for future reference
        this.addTile(text, tile);

        return tileHTML;
    }

    addTile(key, tile) {
        let me       = this,
            tilesMap = me.tiles || [];

        if (!key) {
            return;
        }

        if (tilesMap) {
            tilesMap[key] = tile;
        }

        me.tiles = tilesMap;
    }

    updateData(data) {
        this.data = data;
    }

    update(data = []) {
        let me       = this,
            tiles    = me.tiles || EMPTY_OBJ,
            fragment = document.createDocumentFragment(),
            gridDiv  = me.dom;

        if (!data.length) {
            return;
        }

        me.updateData(data);

        // rearrange the tiles based on the shuffled/sorted data
        data.forEach(item => {
            let tile    = tiles[item];

            fragment.appendChild(
                tile.dom
            )
        });

        gridDiv.appendChild(fragment);
    }

    createDom() {
        let me        = this,
            data      = me.data || EMPTY_ARY,
            options   = me.options || {},
            div       = document.createElement('div');

        data.forEach((item, idx) => {
            const tile = me.createTile(idx, item, options);


            div.appendChild(tile);
        });

        div.id        = me.id;
        div.className = options.gridClass;

        return div;
    }

    render() {
        let me        = this,
            data      = me.data || EMPTY_ARY,
            gridDom   = me.dom;

        if (!data.length) {
            return null;
        }

        if (gridDom) {
            return gridDom;
        }

        gridDom = this.dom = me.createDom();

        return gridDom;
    }
}

Grid.defaultOptions = {
    gridClass         : 'board__grid'
}

/**
 * Tile Class
 */
class Tile {
    constructor(idx, text, options) {
        options = Object.assign({}, Tile.defaultOptions, options);

        this.text = text;
        this.className = `${options.tileClass} ${options.tileClassModifier}${idx+1}`;
        this.textClassName = options.tileTextClass;
    }

    createDom() {
        let me      = this,
            div     = document.createElement('div'),
            span    = document.createElement('span');

        div.className    = me.className;
        span.className   = me.textClassName;
        span.textContent = me.text;

        div.append(span);

        return div;
    }

    render() {
        let me       = this,
            tileDom  = me.dom;

        if (tileDom) {
            return tileDom;
        }

        tileDom = me.dom = me.createDom()

        return tileDom;
    }
}

Tile.defaultOptions = {
    tileClass         : 'tile',
    tileClassModifier : 'tile--t',
    tileTextClass     : 'tile__text'
}
