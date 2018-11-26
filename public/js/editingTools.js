let imgSlider = document.getElementById("imgSlider");
let filter = document.getElementById("filter");
imgSlider.addEventListener("input", resizeImg);
let sliderValue;


function resizeImg(e) {
    let currentSlideID = localStorage.getItem('currentSlide');
    let i = getCurrentIndex(currentSlideID);

    let image = document.getElementById("mediaImg" + i);
    sliderValue = e.target.value;
    image.style.width = sliderValue + "vw";
}


imgSlider.onmouseup = function () {
    let currentSlideID = localStorage.getItem('currentSlide');
    let i = getCurrentIndex(currentSlideID);

    presentation.slides[i].imgWidth = sliderValue;
}


filter.onchange = function () {
    let currentSlideID = localStorage.getItem('currentSlide');
    let i = getCurrentIndex(currentSlideID);
    let image = document.getElementById("mediaImg" + i);
    let filterVal = filter.value

    image.style.filter = filterVal;
    presentation.slides[i].imgFilter = filterVal;


}

function checkURL(url) {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}


/*-Tekst-settings-------------------------------------- */

function selectActive() {
    let activeWindow = document.activeElement;
    if (activeWindow.tagName === "INPUT" || activeWindow.tagName === "TEXTAREA") {
        if (activeWindow.type === "color") {
            return;
        }
        ACTIVEINPUT = activeWindow;
    }

}

function changeColor(e) {
    ACTIVEINPUT.style.color = e.target.value;

    updateText();
}


function toBold() {
    if (ACTIVEINPUT.style.fontWeight == 700) {
        ACTIVEINPUT.style.fontWeight = 100;
    } else {
        ACTIVEINPUT.style.fontWeight = 700;
    }

    updateText();
}

function toItalic() {
    if (ACTIVEINPUT.style.fontStyle == "italic") {
        ACTIVEINPUT.style.fontStyle = "normal";
    } else {
        ACTIVEINPUT.style.fontStyle = "italic";
    }

    updateText();
}

function toSmallCaps() {
    if (ACTIVEINPUT.style.fontVariant == "small-caps") {
        ACTIVEINPUT.style.fontVariant = "normal";
    } else {
        ACTIVEINPUT.style.fontVariant = "small-caps";
    }

    updateText();
}


function changeFont(selectTag) {
    let fontSelect = selectTag.options[selectTag.selectedIndex].text;
    ACTIVEINPUT.style.fontFamily = fontSelect;

    updateText();
}





/*
function changeColor(color){
    
    let currentSlideID = localStorage.getItem('currentSlide');
     document.getElementById(currentSlideID).style.backgroundColor=color; 
    updateBackground(currentSlideID, color);
    
}*/

//Change theme//

function changeTheme(newSlideTheme) {
 
    let theme = document.getElementById("themes").value;
    

    let cuteFrontPage = {
        bakgrunnColor: "url(./Media/cuteFrontPage.jpg)",
        titleStyle: "color: rgb(0, 0, 0)",
        textStyle: "color: rgb(0, 0, 0)",
    }

    let cuteDefault = {
        bakgrunnColor: "url(./Media/cuteDefault.jpg",
        titleStyle: "color: rgb(0, 0, 0)",
        textStyle: "color: rgb(0, 0, 0)",
    }

    let cuteMedia = {
        bakgrunnColor: "url(./Media/cuteMedia.jpg",
        titleStyle: "color: rgb(0, 0, 0)",
        textStyle: "color: rgb(0, 0, 0)",
    }
    
    //-dark-theme//
    let darkFrontPage = {
        bakgrunnColor: "url(./Media/darkFrontPage.jpg)",
        titleStyle: "color: rgb(255, 255, 255)",
        textStyle: "color: rgb(255, 255, 255)",
    }

    let darkDefault = {
        bakgrunnColor: "url(./Media/darkDefault.jpg",
        titleStyle: "color: rgb(255, 255, 255)",
        textStyle: "color: rgb(255, 255, 255)",
    }

    let darkMedia = {
        bakgrunnColor: "url(./Media/darkMedia.jpg",
        titleStyle: "color: rgb(255, 255, 255)",
        textStyle: "color: rgb(255, 255, 255)",
    }
    
    
        let lightFrontPage = {
        bakgrunnColor: "url(./Media/lightFrontPage.jpg)",
        titleStyle: "color: rgb(0, 0, 0)",
        textStyle: "color: rgb(0, 0, 0)",
    }

    let lightDefault = {
        bakgrunnColor: "url(./Media/lightDefault.jpg",
        titleStyle: "color: rgb(0, 0, 0)",
        textStyle: "color: rgb(0, 0, 0)",
    }

    let lightMedia = {
        bakgrunnColor: "url(./Media/lightMedia.jpg",
        titleStyle: "color: rgb(0, 0, 0)",
        textStyle: "color: rgb(0, 0, 0)",
    }

   
    if (theme == "cute") {

        for (let i = 0; i < presentation.slides.length; i++) {

            if (presentation.slides[i].template == 0){
                    presentation.slides[i].bakgrunnColor = cuteFrontPage.bakgrunnColor;   
                     presentation.slides[i].titleStyle = cuteFrontPage.titleStyle;
                    presentation.slides[i].textStyle = cuteFrontPage.titleStyle;
            }
            
            else if (presentation.slides[i].template == 1){
                    presentation.slides[i].bakgrunnColor = cuteDefault.bakgrunnColor; 
                    presentation.slides[i].titleStyle = cuteDefault.titleStyle;
                    presentation.slides[i].textStyle = cuteDefault.titleStyle;
            }
            
            else if (presentation.slides[i].template == 2||3){
                    presentation.slides[i].bakgrunnColor = cuteMedia.bakgrunnColor;
                    presentation.slides[i].titleStyle = cuteMedia.titleStyle;
                    presentation.slides[i].textStyle = cuteMedia.titleStyle;
                    
            }
        }        
    }
    
     if (theme == "dark") {

        for (let i = 0; i < presentation.slides.length; i++) {

            if (presentation.slides[i].template == 0){
                    presentation.slides[i].bakgrunnColor = darkFrontPage.bakgrunnColor;
                    presentation.slides[i].titleStyle = darkFrontPage.titleStyle;
                    presentation.slides[i].textStyle = darkFrontPage.titleStyle;


            }

            else if (presentation.slides[i].template == 1){
                    presentation.slides[i].bakgrunnColor = darkDefault.bakgrunnColor;
                    presentation.slides[i].titleStyle = darkDefault.titleStyle;
                    presentation.slides[i].textStyle = darkDefault.titleStyle;


            }

            else if (presentation.slides[i].template == 2||3){
                    presentation.slides[i].bakgrunnColor = darkMedia.bakgrunnColor;
                    presentation.slides[i].titleStyle = darkMedia.titleStyle;
                    presentation.slides[i].textStyle = darkMedia.titleStyle;


            }
        }
     }
    


    if (theme == "light") {

        for (let i = 0; i < presentation.slides.length; i++) {

            if (presentation.slides[i].template == 0){
                    presentation.slides[i].bakgrunnColor = lightFrontPage.bakgrunnColor;
                    presentation.slides[i].titleStyle = lightFrontPage.titleStyle;
                    presentation.slides[i].textStyle = lightFrontPage.titleStyle;


            }

            else if (presentation.slides[i].template == 1){
                    presentation.slides[i].bakgrunnColor = lightDefault.bakgrunnColor;
                    presentation.slides[i].titleStyle = lightDefault.titleStyle;
                    presentation.slides[i].textStyle = lightDefault.titleStyle;


            }

            else if (presentation.slides[i].template == 2||3){
                    presentation.slides[i].bakgrunnColor = lightMedia.bakgrunnColor;
                    presentation.slides[i].titleStyle = lightMedia.titleStyle;
                    presentation.slides[i].textStyle = lightMedia.titleStyle;
                    


            }
        }

    }
    

    

createPresentation(presentation.slides);

let currentSlideID = localStorage.getItem('currentSlide');
let i = getCurrentIndex(currentSlideID);
    
currentSlide(i+1)
return newSlideTheme;

}