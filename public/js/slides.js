let addNewSlide = document.getElementById("addNewSlide");

let data = [{
    title: "",
    text: "",
    bakgrunnColor: ""

 }];

createPresentation(data);

addNewSlide.onclick = function () {
    let newSlide = {
        title: "",
        text: "",
        bakgrunnColor: ""
    };

    data.push(newSlide);
    createPresentation(data);
    currentSlide(data.length);

}

function createPresentation(data) {
    let i;

    let canvas = document.getElementById("canvas");
    canvas.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let div = document.createElement("div");
        let header = `
            <input class="title" id="title${i}" placeholder="Title" value="${data[i].title}" maxlength= "14" onchange=updateSlide()>
            <br>
            <textarea class="text" id="text${i}" placeholder ="Text.." onfocus="activeTextArea(event)">${data[i].text}</textarea> 
        `;


        div.innerHTML = header;
        div.className = "mySlides";
        div.id = "slide" + i;
        canvas.appendChild(div)
        document.getElementById("slide" + i).style.backgroundColor = `${data[i].bakgrunnColor}`;


    }


    let preview = document.getElementById("preview");
    preview.innerHTML = "";

    for (let i = 0; i < data.length; i++) {

        let div = document.createElement("div");
        let slides = `
            <div class="previewTitle id="previewtitle${i}">${i+1}</div>
        `;

        div.innerHTML = slides;
        div.className = "myPreview";
        div.id = "preview" + i;
        div.onclick = selectPreview;
        preview.appendChild(div);

    }



}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);

}


function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let preview = document.getElementsByClassName("myPreview");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < preview.length; i++) {
        preview[i].className = preview[i].className.replace(" selected", "");
    }
    slides[slideIndex - 1].style.display = "block";

    preview[slideIndex - 1].className += " selected";

    localStorage.clear('currentSlide');
    let activeSlide = slides[slideIndex - 1].id
    localStorage.setItem('currentSlide', activeSlide);

}




function selectPreview(evt) {
    let target = evt.currentTarget.id;
    let getNr = target.match(/\d+/g).map(Number);
    let index = parseInt(getNr) + 1;
    currentSlide(index);
}



function activeTextArea(event) {
    let target = event.target.id;

    let textArea = document.getElementById(target);

    if (textArea.value === '') {
        textArea.value += '• ';
    }
    
    textArea.onkeyup=function(event){
        let x = event.which || event.keyCode;
        if(x==13){
        textArea.value += '• ';
        }
    }
    
    textArea.onchange=function(){
        updateSlide();
    }
    
    
/*
textArea.addEventListener("keyup", function(event){
    if(event.keyCode==13){
     textArea.value += '• ';
    }
});
*/
}




/*

        function updateTitle(i){
            let newTitle = document.getElementById(`title${i}`).value;
            
            data[i].title = newTitle;
            console.log(data);
            
        }

    ///TODO: Optimalisere "currentSlide slik at den bytter når man bytter slide. markere hvilken slide man er på
        function updateBackground(currentSlideID, newcolor){

            let getNr = currentSlideID.match(/\d+/g).map(Number);
            let i = parseInt(getNr);
            
            data[i].bakgrunnColor=newcolor;
         
            console.log(data);
            
        }*/


function updateSlide() {
    let currentSlideID = localStorage.getItem('currentSlide');
    let getNr = currentSlideID.match(/\d+/g).map(Number);
    let i = parseInt(getNr);

    //UpdateTitle
    let newTitle = document.getElementById(`title${i}`).value;
    data[i].title = newTitle;
    
    //UpdateText
    let newText=
    document.getElementById(`text${i}`).value;
    data[i].text = newText;
    
    //UpdateBackgroundColor
    let newColor = document.getElementById("pickcolor").value;
    document.getElementById(currentSlideID).style.backgroundColor = newColor;
    data[i].bakgrunnColor = newColor;


    console.log(data);

}