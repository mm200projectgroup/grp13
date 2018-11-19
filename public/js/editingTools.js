
let imgSlider = document.getElementById("imgSlider");
let filter = document.getElementById("filter");
imgSlider.addEventListener("input", resizeImg);
let sliderValue;


function resizeImg(e){
    let currentSlideID = localStorage.getItem('currentSlide');
    let i = getCurrentIndex(currentSlideID);
    
    let image = document.getElementById("mediaImg"+i);
    sliderValue = e.target.value;
    image.style.width = sliderValue+"vw";
}


imgSlider.onmouseup = function(){
    let currentSlideID = localStorage.getItem('currentSlide');
    let i = getCurrentIndex(currentSlideID);
    
    presentation.slides[i].imgWidth = sliderValue;
}


filter.onchange = function(){
    let currentSlideID = localStorage.getItem('currentSlide');
    let i = getCurrentIndex(currentSlideID);
    let image = document.getElementById("mediaImg"+i);
    let filterVal = filter.value
    
    image.style.filter = filterVal;
    presentation.slides[i].imgFilter = filterVal;
    
    console.log(presentation.slides) 
}

function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}


/*-Tekst-settings-------------------------------------- */
let ACTIVEINPUT;
function selectActive() {    
    let activeWindow = document.activeElement;
    if (activeWindow.tagName == "INPUT" || activeWindow.tagName == "TEXTAREA") {
        ACTIVEINPUT = activeWindow;
        
    }
}


function toBold() {
    if (ACTIVEINPUT.style.fontWeight == 700) {
        ACTIVEINPUT.style.fontWeight = 100;
    } else {
        ACTIVEINPUT.style.fontWeight = 700;
    }
    
    updateSlide();
}

function toItalic() {
    if (ACTIVEINPUT.style.fontStyle == "italic") {
        ACTIVEINPUT.style.fontStyle = "normal";
    } else {
        ACTIVEINPUT.style.fontStyle = "italic";
    }
    
    updateSlide();
}

function toSmallCaps() {
    if (ACTIVEINPUT.style.fontVariant == "small-caps") {
        ACTIVEINPUT.style.fontVariant = "normal";
    } else {
        ACTIVEINPUT.style.fontVariant = "small-caps";
    }
    
    updateSlide();
}


function changeFont(selectTag) {
    let fontSelect = selectTag.options[selectTag.selectedIndex].text;
    ACTIVEINPUT.style.fontFamily = fontSelect;
    
    updateSlide();
}

/*
function changeColor(color){
    
    let currentSlideID = localStorage.getItem('currentSlide');
     document.getElementById(currentSlideID).style.backgroundColor=color; 
    updateBackground(currentSlideID, color);


    
}*/