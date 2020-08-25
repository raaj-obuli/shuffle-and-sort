import { Shuffler } from './shuffler.ui.class.js'

function onReady() {
    return new Promise((resolve) => {
        let timer,
            checkReady = function checkReady() {
                if (timer) {
                    window.clearTimeout(timer);
                }

                if(document.readyState === 'complete') {
                    resolve(true);
                } else {
                    timer = window.setTimeout(checkReady, 300);
                }
            }

        checkReady();
    });
}

let shuffler = new Shuffler(
    'shuffler--1',
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    {
        gridId            : 'grid--1',
        gridContainerId   : 'grid__container--1',
        gridClass         : 'board__grid',
        shuffleBtnClass   : 'js-shuffle',
        sortBtnClass      : 'js-sort',
        tileClass         : 'tile',
        tileClassModifier : 'tile--t',
        tileTextClass     : 'tile__text'
    }
);

onReady()
    .then(()=> {

        // initialize the app
        shuffler.init();

    });
