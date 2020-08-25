import { ArrayShuffle } from './array-shuffle.class.js';
import { Grid } from './grid.ui.class.js';

/**
 * Shuffler Class
 */
export class Shuffler {
    constructor(id, data = [], options = {}) {
        const shufflerData   = new ArrayShuffle(data);

        options              = Object.assign({}, Shuffler.defaultOptions, options);

        this.id              = id;
        this.shufflerData    = shufflerData;
        this.grid            = new Grid(options.gridId, shufflerData.data, options);
        this.options         = options;
        this.gridContainerId = options.gridContainerId;
        this.shuffleBtnClass = options.shuffleBtnClass;
        this.sortBtnClass    = options.sortBtnClass;
    }

    init() {
        const me  = this;

        me.initGrid();
        me.initShuffleButton();
        me.initSortButton();
    }

    initGrid() {
        const me             = this,
              gridContainer  = document.querySelector(`#${me.gridContainerId}`),
              grid           = me.grid,
              gridDom        = grid.render();

        gridContainer.appendChild(gridDom);
    }

    initShuffleButton() {
        const me        = this,
              selector  = me.getSelector(me.shuffleBtnClass);

        me.bindButtonAction(selector, me.shuffle.bind(me));
    }

    initSortButton() {
        const me        = this,
              selector  = me.getSelector(me.sortBtnClass);

        me.bindButtonAction(selector, me.sort.bind(me));
    }

    getSelector(className) {
        const me    = this,
              id    = me.id;

        return `#${id} .${className}`;
    }

    bindButtonAction(selector, handler) {
        const button    = document.querySelector(selector);

        button.addEventListener('click', (e) => {
            handler();
            e.preventDefault();
        }, false);
    }

    shuffle() {
        const me           = this,
              grid         = me.grid,
              shufflerData = me.shufflerData;

        grid.update(
            shufflerData.shuffle()
        );
    }

    sort() {
        const me           = this,
              grid         = me.grid,
              shufflerData = me.shufflerData;

        grid.update(
            shufflerData.sort()
        );
    }
}

Shuffler.defaultOptions = {
    gridClass         : 'board__grid',
    shuffleBtnClass   : 'js-shuffle',
    sortBtnClass      : 'js-sort'
}
