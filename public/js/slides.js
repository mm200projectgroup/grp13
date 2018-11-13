let addNewSlide = document.getElementById("addNewSlide");
let fullscreenBtn = document.getElementById("fullscreenBtn");


createPresentation(presentation);

addNewSlide.onclick = function () {
    let color = document.getElementById("pickcolor");
    color.value = "#FFFFFF"

    let newSlide = {
        title: "",
        text: "",
        bakgrunnColor: "",
        titleColor:"",
        textColor:"",
        notes:""
    };

    presentation.push(newSlide);
    createPresentation(presentation);
    currentSlide(presentation.length);

}


function createPresentation(presentation) {
    let i;
    let canvas = document.getElementById("canvas");
    canvas.innerHTML = "";
    for (let i = 0; i < presentation.length; i++) {
        let slideDiv = document.createElement("div");
        let slideContent = `
            <input class="title" id="title${i}" placeholder="Title" value="${presentation[i].title}" maxlength= "14" onchange=updateSlide() style="color:">
            <br>
            <textarea class="text" id="text${i}" placeholder ="Text.." onfocus="activeTextArea(event)">${presentation[i].text}</textarea> 
        `;
        
        let imageContainer = document.createElement("div");
        

        slideDiv.innerHTML = slideContent;
        slideDiv.className = "mySlides" + " editMode";
        slideDiv.id = "slide" + i;
        imageContainer.className="slideImg";
        imageContainer.id="imgCont"+i;
        slideDiv.appendChild(imageContainer);
        canvas.appendChild(slideDiv)
        document.getElementById("slide" + i).style.backgroundColor = `${presentation[i].bakgrunnColor}`;

    }


    let preview = document.getElementById("preview");
    preview.innerHTML = "";

    for (let i = 0; i < presentation.length; i++) {

        let div = document.createElement("div");
        let slides = `
            <span onclick="deleteSlide(${i})" class="deleteSlide">&times;</span>
            <p class="previewTitle" id="previewtitle${i}">${i+1}</p>
        `;
        
        
        
        div.innerHTML = slides;
        div.className = "myPreview";
        div.id = "preview" + i;
        div.onclick = selectPreview;
        preview.appendChild(div);

    }

}


document.onkeyup = function (event) {
    if(document.activeElement.nodeName === "INPUT" ||document.activeElement.nodeName === "TEXTAREA"){
        return;
    }
    let x = event.which || event.keyCode || event.code || event.keyIdentifier;
    if (x == 37) {
        plusSlides(-1);
    } else if (x == 39) {
        plusSlides(1);
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


//Selecting the preview
function selectPreview(evt) {
    let target = evt.currentTarget.id;
    let index = getCurrentIndex(target)+1
    currentSlide(index);
}


function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let preview = document.getElementsByClassName("myPreview");
    let deleteSlideBtn = document.getElementsByClassName("deleteSlide");
    
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
        deleteSlideBtn[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
    
    preview[slideIndex - 1].className += " selected";
    
    deleteSlideBtn[slideIndex - 1].style.display = "block";

    
    
    localStorage.clear('currentSlide');
    let activeSlide = slides[slideIndex - 1].id
    localStorage.setItem('currentSlide', activeSlide);
    
     updateNotes(slideIndex -1);

}


//Find the index of current target
function getCurrentIndex(target){
    let getNr = target.match(/\d+/g).map(Number);
    return parseInt(getNr);
}



function activeTextArea(evt) {
    let target = evt.currentTarget;
    let index = getCurrentIndex(target.id)+1
    let textArea = document.getElementById(target.id);
    if (textArea.value === '') {
        textArea.value += '• ';
    }

    textArea.onkeyup = function (event) {
        let x = event.which || event.keyCode;
        if (x == 13) {
            textArea.value += '• ';
        }
    }

    textArea.onchange = function () {
        updateSlide();
    }


}




function updateSlide() {
    let currentSlideID = localStorage.getItem('currentSlide');
    let i = getCurrentIndex(currentSlideID)

    //UpdateTitle
    let newTitle = document.getElementById(`title${i}`).value;
    presentation[i].title = newTitle;

    //UpdateText
    let newText =
        document.getElementById(`text${i}`).value;
        presentation[i].text = newText;

    //UpdateBackgroundColor
    let newColor = document.getElementById("pickcolor").value;
    document.getElementById(currentSlideID).style.backgroundColor = newColor;
    presentation[i].bakgrunnColor = newColor;


    console.log(presentation);

}

function deleteSlide(i){
    presentation.splice(i, 1);
    createPresentation(presentation);
    
}








//Tar på og av fullscreen
fullscreenBtn.onclick = function () {
    let elem = document.documentElement;
    let currentSlideID = localStorage.getItem('currentSlide');
    let slides = document.getElementsByClassName("mySlides");
    //Ser om current slide er i editMode
    let check = document.getElementById(currentSlideID).classList.contains("editMode");

    //SLår på fullscreen
    if (check) {
        for (i = 0; i < slides.length; i++) {
            slides[i].className = slides[i].className.replace(" editMode", " fullscreen");
        }
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
        //Slå av fullscreen
    } else {
        for (i = 0; i < slides.length; i++) {
            slides[i].className = slides[i].className.replace(" fullscreen", " editMode");
        }
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }


    }

}



//------------------------------------------------
//-----------SHOW/HIDE PRESENTER NOTES---------------------------------
function toggleNotes(e) {
    let notes = document.getElementById("slideNotes");
    let footer = document.getElementById("footer");

    notes.style.zIndex = notes.style.zIndex * -1;
}

function saveNotes() {
    let id = localStorage.getItem("currentSlide").slice(5);
    presentation[id].notes = document.getElementById("notes").value;
}

function updateNotes(n) {
    let notes = document.getElementById("notes");
    notes.value = "";
    if(presentation[n]){
        notes.value = presentation[n].notes;
    }
}