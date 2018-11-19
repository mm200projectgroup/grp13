/*//Denne funksjonen setter størrelse
//let imgResizer = 
function imgResizer() {

    let imgResizerObj = {};
    //setter divelementet til 50 % av skjermen
    let resizeAmount = 0.5;
    //lager en knapp
    let addImgBtn = document.getElementById("addImg");
    //lager en div
    //lager en bar som skalerer
    let imgSlider = document.getElementById("imgSlider");
    //lager en valg box som filter
    let filter = document.getElementById("filter");
    //bilde du legger til i diven
    let imgObj;
    let activeElement;




    //her kjører knappen funksjonen addImg
    addImgBtn.addEventListener("click", addImg);
    //her kjører slideren funksjonen resizeImg
    imgSlider.addEventListener("input", resizeImg);
    filter.addEventListener("change", changeFilter);

    //funksjon som legger til et bilde ved hjelp av prompt vindu hvor du kan skrive link til en bildefil.-----------------------------------------------------------
    function addImg() {
        //Lag egen div til hvor bilde skal være og legg den som verdi.
        let slideId = localStorage.getItem("currentSlide");
        let index = getCurrentIndex(slideId);
        let presObject = document.getElementById("imgCont"+index);
        
        if(presentation.slides[index].template !== 2){
            window.alert("You can only add images to the 'media' template. Sorry!");
            return;
        }
        
        //Denne åpner et prompt vindu hvor du legger inn bildelinken
        let input = prompt("skriv inn lenke til bilde");

        //sjekker om bildefil er bildefil hvis ikke skjer det ingenting
        if (input.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
            //her lager du et object av bildeurl du har skrevet inn
            imgObj = document.createElement("IMG");
            //her henter du img objektet fra inputet fra prompt vinduet
            imgObj.src = input;
            imgObj.width = 250;
            imgObj.addEventListener('click', e => activeElement = e.target);

            //media = linken til bilde

            presentation.slides[index].media.push(imgObj);

            updateSlide();
        } else {
            //her skrives det ut en alert hvis urlen ikke er en bilde fil
            alert("url not an image!");
        }

    }

    //funksjon som skalerer bilde ved hjelp av range slideren
    function resizeImg(e) {
        console.log(activeElement);
        if (activeElement) {
            activeElement.width = e.target.value;

        }
    }

    //funksjon som setter filter på bildene
    function changeFilter(evt) {
        //console.log(evt.target.value);
        if (activeElement) {
            //legger til det valgte filteret fra select options
            activeElement.style.filter = evt.target.value;
        }

    }
    //Returnerer det skalerte objektet
    return imgResizerObj;
}
//kjører funksjonen resizeImg
imgResizer();


*/
let imgSlider = document.getElementById("imgSlider")
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
    console.log(presentation)
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