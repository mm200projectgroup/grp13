 let presentation = {
     "slides": [{
         title: "",
         text: "",
         bakgrunnColor: "#FFFFFF",
         titleStyle: "",
         textStyle: "",
         media: "./Media/palceholderMedia.png",
         imgWidth: "26",
         imgFilter: "",
         av: "",
         notes: "",
         template: 0
            }]
 };



 let addNewSlide = document.getElementById("addNewSlide");
 let fullscreenBtn = document.getElementById("fullscreenBtn");
 let autoCheck = document.getElementById("autoCheck");
 let win2

 createPresentation(presentation.slides);
 let ACTIVEINPUT = document.getElementById("title0");




 addNewSlide.onclick = function () {
     let newSlide = {
         title: "",
         text: "",
         bakgrunnColor: "#FFFFFF",
         titleStyle: "",
         textStyle: "",
         media: "./Media/palceholderMedia.png",
         imgWidth: "26",
         imgFilter: "",
         av: "",
         notes: "",
         template: 1
     };



     let color = document.getElementById("pickcolor");
     color.value = "#FFFFFF"

     presentation.slides.push(newSlide);
     createPresentation(presentation.slides);
     changeTheme(newSlide)
     currentSlide(presentation.slides.length);


 }


 function createPresentation(array) {
     let i;
     let canvas = document.getElementById("canvas");
     canvas.innerHTML = "";
     for (let i = 0; i < array.length; i++) {
         let slideDiv = document.createElement("div");
         let slideContent;
         if (array[i].template === 1) {
             slideContent = `
            <input class="title" id="title${i}" data-lpignore="true" placeholder="Title" value="${array[i].title}" maxlength= "14" onchange="updateText()" style="${array[i].titleStyle}">
            <br>
            <textarea class="text" id="text${i}" placeholder ="Text.." onfocus="activeTextArea(event)" style="${array[i].textStyle}">${array[i].text}</textarea> 
            `;
         } else if (array[i].template === 0) {
             slideContent = `
                <input class="mainTitle" id="title${i}" data-lpignore="true" placeholder="Title" value="${array[i].title}" maxlength="14" style="${array[i].titleStyle}" onchange="updateText()">
                <br>
                <textarea onchange="updateText()" class="undertitle" id="text${i}" placeholder="Undertitle" style="${array[i].textStyle}">${array[i].text}</textarea>
            `;
         } else if (array[i].template === 2) {
             slideContent = `
            <input class="title" id="title${i}" data-lpignore="true" placeholder="Title" value="${array[i].title}" maxlength= "14" onchange="updateText()" style="${array[i].titleStyle}">
            <div class="mediaContent">
                <div class="mediaDiv">
                    <img class="imgCont" id="mediaImg${i}" src=${array[i].media} style="width:${array[i].imgWidth}vw; filter:${array[i].imgFilter}">
                </div>
                <div class="mediaTextDiv">
                    <textarea class="mediaText" id="text${i}" placeholder ="Text.." onfocus="activeTextArea(event)" style="${array[i].textStyle}">${array[i].text}</textarea>
                </div>
            </div>
            `;
         } else if (array[i].template === 3) {
             slideContent = `
                <input class="title" id="title${i}" data-lpignore="true" placeholder="Title" value="${array[i].title}" maxlength= "14" onchange="updateText()" style="${array[i].titleStyle}">
                <div class="mediaContent">
                <div id="mediaDiv${i}" class="mediaDiv">
                ${array[i].av} 
                </div>
                <div class="mediaTextDiv">
                    <textarea class="mediaText" id="text${i}" placeholder ="Text.." onfocus="activeTextArea(event)" style="${array[i].textStyle}">${array[i].text}</textarea>
                </div>
            </div>
            `;
         }



         slideDiv.innerHTML = slideContent;
         slideDiv.className = "mySlides" + " editMode";
         slideDiv.id = "slide" + i;
         canvas.appendChild(slideDiv);
         document.getElementById("slide" + i).style.background = `${array[i].bakgrunnColor}`;
         document.getElementById("slide" + i).style.backgroundSize = `cover`;


     }


     let preview = document.getElementById("preview");
     preview.innerHTML = "";

     for (let i = 0; i < array.length; i++) {
         let div = document.createElement("div");
         let slides = `
            <span onclick="deleteSlide(${i})" class="deleteSlide">&times;</span>
            <p class="previewTitle" id="previewtitle${i}">${i + 1}</p>
        `;


         div.innerHTML = slides;
         div.className = "myPreview";
         div.id = "preview" + i;
         div.onclick = selectPreview;
         preview.appendChild(div);

     }



 }


 document.onkeyup = function (event) {
     if (document.activeElement.nodeName === "INPUT" || document.activeElement.nodeName === "TEXTAREA") {
         return;
     }
     let x = event.which || event.keyCode || event.code || event.keyIdentifier;
     if (x == 37) {
         plusSlides(-1);
         if(win2){
             win2.plusSlides(-1)
         }
     } else if (x == 39) {
         plusSlides(1);
            if(win2){
             win2.plusSlides(1)
         }
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
     let index = getCurrentIndex(target) + 1
     currentSlide(index);
 }


 function showSlides(n) {
     let i;
     let slides = document.getElementsByClassName("mySlides");
     let preview = document.getElementsByClassName("myPreview");
     let deleteSlideBtn = document.getElementsByClassName("deleteSlide");
     let color = document.getElementById("pickcolor");
     let imageURL = document.getElementById("imgUrl");
     let backgroundCheck = document.getElementById("backgroundCheck");

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


     document.getElementById("templates").selectedIndex = presentation.slides[slideIndex - 1].template;

     preview[slideIndex - 1].className += " selected";

     deleteSlideBtn[slideIndex - 1].style.display = "block";


     let activeSlide = slides[slideIndex - 1].id
     localStorage.setItem('currentSlide', activeSlide);

     color.value = presentation.slides[slideIndex - 1].bakgrunnColor;
     imageURL.value = presentation.slides[slideIndex - 1].media;

     if (presentation.slides[slideIndex - 1].bakgrunnColor.includes("url")) {
         backgroundCheck.checked = true;
     } else {
         backgroundCheck.checked = false;
     }
     updateNotes(slideIndex - 1);

 }


 //Find the index of current target
 function getCurrentIndex(target) {
     let getNr = target.match(/\d+/g).map(Number);
     return parseInt(getNr);
 }




 function activeTextArea(evt) {
     let target = evt.currentTarget;
     let index = getCurrentIndex(target.id) + 1
     let textArea = document.getElementById(target.id);
     if (textArea.value === '') {
         textArea.value += '• ';
     }

     textArea.onkeyup = function (event) {
         let x = event.which || event.keyCode || event.code || event.keyIdentifier;
         if (x == 13) {
             textArea.value += '• ';
         }
     }

     textArea.onchange = function () {
         updateText();
     }
 }






 function updateText() {
     let currentSlideID = localStorage.getItem('currentSlide');
     let i = getCurrentIndex(currentSlideID);
     let title = document.getElementById(`title${i}`);
     let text = document.getElementById(`text${i}`);

     //UpdateTitle
     let newTitle = document.getElementById(`title${i}`).value;
     presentation.slides[i].title = newTitle;


     //UpdateText
     let newText = document.getElementById(`text${i}`).value;
     presentation.slides[i].text = newText;



     //UpdateSTYLE---------------
     let newStyle = ACTIVEINPUT.style.cssText;
     if (ACTIVEINPUT.nodeName === "INPUT") {
         presentation.slides[i].titleStyle = newStyle;;
     }
     if (ACTIVEINPUT.nodeName === "TEXTAREA") {
         presentation.slides[i].textStyle = newStyle;
     }





 }

 function updateEmbed() {
     let currentSlideID = localStorage.getItem('currentSlide');
     let i = getCurrentIndex(currentSlideID);
     let newVA = document.getElementById("avUrl").value;
    if(presentation.template != 3){
        window.alert("You must chooce the embed template");
        }else{
     document.getElementById(`mediaDiv${i}`).innerHTML = newVA;
     presentation.slides[i].av = newVA;
        }

 }

 function updateBackground() {
     let backgroundCheck = document.getElementById("backgroundCheck");
     let currentSlideID = localStorage.getItem('currentSlide');
     let i = getCurrentIndex(currentSlideID);
     let newColor = document.getElementById("pickcolor").value;

     document.getElementById(currentSlideID).style.background = newColor;
     presentation.slides[i].bakgrunnColor = newColor;

     backgroundCheck.checked = false;

 }

 function updateImage() {
     let currentSlideID = localStorage.getItem('currentSlide');
     let i = getCurrentIndex(currentSlideID);
     let image = document.getElementById("imgUrl");
     let backgroundCheck = document.getElementById("backgroundCheck");
     if(presentation.template != 2){
        window.alert("You must chooce the image template");
        }
     else if (checkURL(image.value)) {
         let newImg = image.value;
         if (backgroundCheck.checked == false) {
             document.getElementById(`mediaImg${i}`).src = newImg;
             presentation.slides[i].media = newImg;
         } else {
             document.getElementById(currentSlideID).style.background = "url(" + newImg + ")"
             presentation.slides[i].bakgrunnColor = "url(" + newImg + ")";
         }
     } else {
         document.getElementById("wrongFileType").innerHTML = "Not an imagelink";
     }

 }




 function deleteSlide(i) {
     presentation.slides.splice(i, 1);
     createPresentation(presentation.slides);

 }

 
 let interval
 function autoPresentation() {
     let time = document.getElementById("timeInput")

     interval = setInterval(function () {
         plusSlides(1)
             if(win2){
             win2.plusSlides(1)
         }
     }, time.value * 1000);
     return interval;

 }


 autoCheck.onchange = function () {
     if (autoCheck.checked == true) {
         document.getElementById("timeInput").disabled = false;
     } else {
         document.getElementById("timeInput").disabled = true;
         clearInterval(interval);
     }
 }


let presenterMode = document.getElementById("presenterMode");


function openSecondWindow(){
    return win2 =  window.open('./presenterMode.html', 'secondary', 'width=1000,height=700');

}

presenterMode.onchange = function(){
    
if (presenterMode.checked == true){   
openSecondWindow();
}else{
    win2.close();
    
}
    
}


    


        

 //Tar på og av fullscreen
 fullscreenBtn.onclick =  function () {
         let elem = document.documentElement;
         let currentSlideID = localStorage.getItem('currentSlide');
         let slides = document.getElementsByClassName("mySlides");
         //Ser om current slide er i editMode
         let check = document.getElementById(currentSlideID).classList.contains("editMode");
      
         //SLår på fullscreen
         if (check) {
             if (autoCheck.checked == true) {
                 autoPresentation();
                 
             }
        if (presenterMode.checked == true){
            
            
            win2.getObject(presentation);
            currentSlide(1);
            
            return;
            
        }
             
             

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
         }

 }


 document.onkeydown = function (event) {
     let elem = document.documentElement;
     let currentSlideID = localStorage.getItem('currentSlide');
     let slides = document.getElementsByClassName("mySlides");
     //Ser om current slide er i fullscreen
     let check = document.getElementById(currentSlideID).classList.contains("fullscreen");

     let x = event.which || event.keyCode || event.code || event.keyIdentifier;
     if (x == 27) {
         if (check) {
             if (autoCheck.checked == true) {
                 clearInterval(interval);
             }


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
     presentation.slides[id].notes = document.getElementById("notes").value;
 }

 function updateNotes(n) {
     let notes = document.getElementById("notes");
     notes.value = "";
     if (presentation.slides[n]) {
         notes.value = presentation.slides[n].notes;
     }
 }




 //----------UPDATE TEMPLATE------------
 //0 = Title, 1 = Default, 2 = Media
 function changeTemplate(template) {

     let slide = localStorage.getItem("currentSlide");
     let num = slide.slice(5);
     presentation.slides[num].template = template;
     let slideContent = document.getElementById(slide);
     switch (template) {

         case 0:
             slideContent.innerHTML = `
                <input class="mainTitle" style="${presentation.slides[num].titleStyle}" data-lpignore="true" id="title${num}" placeholder="Title" value="${presentation.slides[num].title}" maxlength="14" onchange="updateText()">
                <br>
                <textarea class="undertitle" id="text${num}" style="${presentation.slides[num].textStyle}" placeholder="Text" onchange="updateText()">${presentation.slides[num].text}</textarea> 
            `;
             break;
         case 1:
             slideContent.innerHTML = `
                <input class="title" data-lpignore="true" id="title${num}" placeholder="Title" value="${presentation.slides[num].title}" maxlength= "14" onchange="updateText()" style="${presentation.slides[num].titleStyle}">
                <br>
                <textarea class="text" id="text${num}" placeholder ="Text.." style="${presentation.slides[num].textStyle}" onfocus="activeTextArea(event)">${presentation.slides[num].text}</textarea> 
        `;
             break;
         case 2:
             slideContent.innerHTML = `
            <input class="title" id="title${num}" data-lpignore="true" placeholder="Title" value="${presentation.slides[num].title}" maxlength= "14" onchange="updateText()" style="${presentation.slides[num].titleStyle}">
            <div class="mediaContent">
                <div class="mediaDiv">
                    <img class="imgCont" id="mediaImg${num}" src=${presentation.slides[num].media} style="width:${presentation.slides[num].imgWidth}vw; filter:${presentation.slides[num].imgFilter}">
                </div>
                <div class="mediaTextDiv">
                    <textarea class="mediaText" id="text${num}" placeholder ="Text.." onfocus="activeTextArea(event)" style="${presentation.slides[num].textStyle}">${presentation.slides[num].text}</textarea>
                </div>
            </div>
            `;
             break;
         case 3:
             slideContent.innerHTML = `                
                <input class="title" id="title${num}" data-lpignore="true" placeholder="Title" value="${presentation.slides[num].title}" maxlength= "14" onchange="updateText()" style="${presentation.slides[num].titleStyle}">
                <div class="mediaContent">
                <div id="mediaDiv${num}" class="mediaDiv">
                ${presentation.slides[num].av} 
                </div>
                <div class="mediaTextDiv">
                    <textarea class="mediaText" id="text${num}" placeholder ="Text.." onfocus="activeTextArea(event)" style="${presentation.slides[num].textStyle}">${presentation.slides[num].text}</textarea>
                </div>
            </div>`;
             break;
     }

     changeTheme()

 }