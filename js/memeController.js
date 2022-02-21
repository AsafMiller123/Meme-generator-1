'use strict'

var input;
var gCanvas;
var gCtx;
var gImage;


function onOpenSection(imgId) {
    initVars();
    document.querySelector('.section').style.display = 'flex';
    document.querySelector('.grid-container').style.display = 'none';
    document.querySelector('.search').style.display = 'none';
    createGeneralMeme(imgId);
    gLine = gMeme.lines[0];
    setInputTextWithCurrentLineText('');
    setTextOnCanvas();
    setItemColor();
    setFontsSelections();
    renderCanvas(imgId);
}


function initVars() {
    numOfLines = 0;
    gMemeObject;
    gLine;
    gCurrentTxtLineIndex = 0;
    gFontSize = defaultFontSize;
    gIsStroked = false;
    gMeme = null;
    gText = '';
}


function renderCanvas(imgId) {

    gMemeObject = new Image();
    gMemeObject.src = `meme-images/${findImageUrl(imgId)}`;

    gMemeObject.onload = function () {
        gCanvas.width = gMemeObject.width;
        gCanvas.height = gMemeObject.height;

        drawCanvas(gMemeObject);
    };
}


function onTextEditorAction(action, value) {
    gLine = gMeme.lines[gMeme.selectedLineIdx];

    switch (action) {
        case 'nextLine':
            onSelectNextLine();
            break;
        case 'addTextLine':
            addTextLine();
            break;
        case 'deleteTextLine':
            deleteCurrentTextLine();
            break;
        case 'moveLine':
            moveCurrentLine(value);
            break;
        case 'changeFontSize':
            value ? gFontSize++ : gFontSize--;
            updateMemeTextLineFontSize(gLine, gFontSize);
            break;
        case 'alignText':
            onAlignText(value, gLine);
            break;
        case 'updateStrokeText':
            updateStrokeText(gLine);
            break;
        case 'setFont':
            setTextFont(gLine, value);
            break;

        default:
            break;
    }

    drawCanvas(gMemeObject);
}
