function init() {
    renderMemes(gImgs);
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    setAllKeyWordsFilters();
}


function renderMemes(memesImages) {
    var containerElement = document.querySelector('.grid-container');
    var strHtml = '';
    memesImages.forEach(meme => {
        strHtml += `<img class="meme" src='meme-images/${meme.url}' onclick="onOpenSection(${meme.id})" />`
    });

    containerElement.innerHTML = strHtml;
}


function onSearchClick() {
    input = document.getElementById("Meme").value;
    var images = getMemes(input);
    if (images.length === 0) images = gImgs;
    renderMemes(images);
}


function getMemes(input) {
    var images = gImgs.filter(image => {
        var keywords = image.keywords;
        return keywords.includes(input);
    })

    document.querySelector('.grid-container').innerHTML = '';
    return images;
}


function closeSection() {
    document.querySelector('.section').style.display = 'none';
    document.querySelector('.grid-container').style.display = 'grid';
    document.querySelector('.search').style.display = 'flex';
    onFilterClick('all');
}


function onFilterClick(value) {
    var images = value === 'all' ? gImgs : getMemes(value);
    renderMemes(images);
}

function setAllKeyWordsFilters() {
    var selectContainerElement = document.querySelector('.keywords-selection');
    var strHTML = '';
    var allKeywords = getAllKeyWords(gImgs);

    allKeywords.forEach(keyword => {
        strHTML += `<option value="${keyword}">${keyword}</option>`;
    });

    selectContainerElement.innerHTML = strHTML;
}

function getAllKeyWords(imgs) {
    var keywords = [];

    imgs.forEach(image => {
        image.keywords.forEach(keyword => {
            if (!keywords.includes(keyword)) keywords.push(keyword);
        });
    });

    return keywords;
}