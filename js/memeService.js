'use strict'

var gMeme;
var gText = '';
var numOfLines = 0;
var gMemeObject;
var gLine;
var gCurrentTxtLineIndex = 0;
var gFontSize = defaultFontSize;
var fonts = ['sans-serf', 'cursive', 'monospace', 'fantasy'];
var defaultFont = 'sans-serf';
var defaultAlignment = 'start';
var defaultStickerText = 'Your new sticker!';
var defaultX = 10;
var defaultY = 50;
var defaultFontSize = 40;
var gIsStroked = false;


var gImgs = [
    { id: 1, url: '1.jpg', keywords: ['president', 'character', 'one'] },
    { id: 2, url: '2.jpg', keywords: ['dog', 'love'] },
    { id: 3, url: '3.jpg', keywords: ['funny', 'sleep'] },
    { id: 4, url: '4.jpg', keywords: ['sleep', 'cat'] },
    { id: 5, url: '5.jpg', keywords: ['funny', 'tough'] },
    { id: 6, url: '6.jpg', keywords: ['funny', 'accurate'] },
    { id: 7, url: '7.jpg', keywords: ['surprised'] },
    { id: 8, url: '8.jpg', keywords: ['funny', 'thinking'] },
    { id: 9, url: '9.jpg', keywords: ['funny', 'thinking'] },
    { id: 10, url: '10.jpg', keywords: ['barack', 'obama', 'president'] },
    { id: 11, url: '11.jpg', keywords: ['fight'] },
    { id: 12, url: '12.jpg', keywords: ['investigate', 'you', 'responsibility'] },
    { id: 13, url: '13.jpg', keywords: ['cheers', 'life'] },
    { id: 14, url: '14.jpg', keywords: ['unbelievable'] },
    { id: 15, url: '15.jpg', keywords: ['zero'] },
    { id: 16, url: '16.jpg', keywords: ['unbelievable'] },
    { id: 17, url: '17.jpg', keywords: ['peace', 'two', 'president'] },
    { id: 18, url: '18.jpg', keywords: ['bazz', 'wonder'] },
];


function createMemeLine(id, x = defaultX, y = defaultY, txt = defaultStickerText) {
    return {
        id,
        txt,
        size: defaultFontSize,
        textAlign: defaultAlignment,
        color: 'black',
        x,
        y,
        isStroked: false,
        fontFamily: defaultFont,
    }
}


function createGeneralMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                id: gCurrentTxtLineIndex,
                txt: defaultStickerText,
                size: defaultFontSize,
                textAlign: defaultAlignment,
                color: 'black',
                x: 10,
                y: 50,
                isStroked: false,
                fontFamily: defaultFont,
            }
        ]
    }
}


function findImageUrl(imgId) {
    return gImgs.find(img => img.id === imgId).url;
}


function drawCanvas(imgObj) {
    gCtx.rect(0, 0, gCanvas.width, gCanvas.height)
    gCtx.drawImage(imgObj, 0, 0);

    gMeme.lines.forEach(function (line) {
        drawTxt(line);
    });
}


function addTextLine() {

    if (gMeme.lines.length === 3) return;

    if (gMeme.lines.length !== 0) {
        gCurrentTxtLineIndex++;
    }

    var x;
    var y;

    if (gCurrentTxtLineIndex === 1) {
        x = 10;
        y = 430;
    } else if (gCurrentTxtLineIndex === 2) {
        x = 10;
        y = 245;
    }

    gMeme.selectedLineIdx = gCurrentTxtLineIndex;
    gMeme.lines.push(createMemeLine(gCurrentTxtLineIndex, x, y));
    drawCanvas(gMemeObject);
    gLine = gMeme.lines[gCurrentTxtLineIndex];
    setInputTextWithCurrentLineText('');
}


function drawTxt(line) {
    var fontFamily = line.fontFamily ? line.fontFamily : defaultFont;
    gCtx.font = line.size + 'px' + ` ${fontFamily}`;
    gCtx.textAlign = line.textAlign;
    gCtx.fillStyle = line.color;
    gIsStroked = line.isStroked;

    if (gIsStroked) {
        gCtx.strokeStyle = line.color;
        gCtx.strokeText(line.txt, line.x, line.y, 470);
    } else {
        gCtx.fillText(line.txt, line.x, line.y, 470);
    }
}


function setTextOnCanvas() {
    var textInput = document.getElementById("input-text");
    textInput.addEventListener("input", function () {
        gText = textInput.value;
        updateMemeLineTxt(gMeme.lines[gMeme.selectedLineIdx], gText);
        drawCanvas(gMemeObject);
    });
}


function setItemColor() {
    var colorInput = document.getElementById("input-color");
    colorInput.addEventListener("input", function () {
        updateMemeLineColor(gMeme.lines[gMeme.selectedLineIdx], colorInput.value);
        drawCanvas(gMemeObject);
    });
}


function setFontsSelections() {
    var selectContainerElement = document.querySelector('.fonts-filter-selection');
    var strHTML = '';

    fonts.forEach(font => {
        strHTML += `<option value="${font}">${font}</option>`;
    });

    selectContainerElement.innerHTML = strHTML;
}


function moveCurrentLine(shouldIncrease) {
    var currentLineIndex = gMeme.selectedLineIdx;
    var currentLine = gMeme.lines[currentLineIndex];
    var currentY = currentLine.y;
    var currentSize = currentLine.size;

    if (shouldIncrease) {
        if (currentY + 1 < gCanvas.height - 10) gMeme.lines[currentLineIndex].y = currentY + 1;
    } else {
        if (currentY - 1 > 10 + currentSize) gMeme.lines[currentLineIndex].y = currentY - 1;
    }

    drawCanvas(gMemeObject);
}


function onSelectNextLine() {
    if (gMeme.selectedLineIdx + 1 > gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0;
    } else {
        gMeme.selectedLineIdx = gMeme.selectedLineIdx + 1;
    };

    gLine = gMeme.lines[gMeme.selectedLineIdx];

    setInputTextWithCurrentLineText();
}


function deleteCurrentTextLine() {

    if (gMeme.lines.length === 0) return;

    var newLines = gMeme.lines;
    var currentLineId = gLine.id;
    var initialId = 0;

    newLines = newLines.filter(line => line.id !== currentLineId);
    newLines.forEach(line => {
        line.id = initialId;
        initialId++;
    });

    gMeme.lines = newLines;

    drawCanvas(gMemeObject);

    if (gMeme.lines.length === 0) {
        gMeme.selectedLineIdx = 0;
        gCurrentTxtLineIndex = 0;
        gLine = {};
        gMeme.lines.push(createMemeLine(gCurrentTxtLineIndex, defaultX, defaultY, ''));
        setInputTextWithCurrentLineText('');
        return;
    };

    currentLineId--;
    gCurrentTxtLineIndex = currentLineId;
    gMeme.selectedLineIdx = gCurrentTxtLineIndex;
    gLine = gMeme.lines[currentLineId];
    setInputTextWithCurrentLineText();
}


function setInputTextWithCurrentLineText(txt = gLine.txt) {
    document.getElementById("input-text").value = txt;
}


function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}
