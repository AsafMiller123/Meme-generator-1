function updateMemeLineTxt(line, txt) {
    line.txt = txt;
}


function updateMemeLineColor(line, color) {
    line.color = color;
}


function updateMemeTextLineFontSize(line, fontSize) {
    line.size = fontSize;
}


function updateStrokeText(line) {
    var isStroked = line.isStroked;
    line.isStroked = !isStroked;
}


function setTextFont(line, font) {
    line.fontFamily = font;
}


function onAlignText(number, line) {
    switch (number) {
        case 1:
            line.textAlign = 'start';
            line.x = 10;
            break;
        case 2:
            line.textAlign = 'center';
            line.x = gCanvas.width / 2;
            break;
        case 3:
            line.textAlign = 'end';
            line.x = gCanvas.width - 10;
            break;
        default:
            break;
    }
}
