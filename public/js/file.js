let shareWith = document.getElementById("shareWith");
let shareButton = document.getElementById("shareButton");

function shareOption(value){
    if (value == "privet"){
        document.getElementById("shareWith").disabled =false;
        shareButton.setAttribute('onclick','sharePresentation()')
        
    }else{
        document.getElementById("shareWith").disabled =true;
        shareButton.setAttribute('onclick','sharePublicPresentation()')
    }
}





//--------------OPEN PRESENTATION-------------------------
 function openPresentation(index) {
     //Henter presentationene fra local storage
     let openPres = JSON.parse(localStorage.getItem("loadedPresentation"))
     document.getElementById("presentationTitle").value = openPres[index].titel;
     localStorage.setItem("presentationid", openPres[index].presentationid);
     delete presentation.slides;
     presentation = openPres[index].slides
     createPresentation(presentation.slides);
     currentSlide(1);

 }



 //------------------EXPORT-------------------------------------------
 function exportFile() {
     //Her exporteres innholdet i presentation til pcen som en json fil		
     let presObject = (JSON.stringify(presentation));
     let download = document.createElement('a');
     let presentationTitle = document.getElementById("presentationTitle").value;

     download.setAttribute('download', presentationTitle + '.json');

     download.setAttribute('href', 'data:text;charset=utf-8,' + presObject);

     document.body.appendChild(download);
     download.click();
     document.body.removeChild(download);
 };



 //--------------------IMPORT-----------------------------
 function ImportFile() {

     var files = document.getElementById("file").files;
     console.log(files);

     if (files.length <= 0) {
         return false;
     }


     let filereader = new FileReader();

     filereader.onload = function (e) {
         let result = JSON.parse(e.target.result);
         delete presentation.slides;
         presentation = result;
         console.log(presentation);
         createPresentation(presentation.slides);
          currentSlide(1);

     }

        filereader.readAsText(files.item(0))


 }



 //------------------EXPORT PRESENTERNOTES------------------
 function exportPresenterNotes() {
     //I denne function exporteres innholdet i slide notes til pcen som en txt fil	
     let noteColletions = "Notes: \r\n";
     let download = document.createElement('a');

     for (let i = 0; i < presentation.slides.length; i++) {
         let presObject = (JSON.stringify(presentation.slides[i].notes));

         noteColletions += "Slides " + [i + 1] + ": " + presObject + "\r\n";

     }

     download.setAttribute('href', 'data:text;charset=utf-8,' + noteColletions);

     let presenterNotes = document.getElementById("presentationTitle").value;

     download.setAttribute('download', presenterNotes + "(Notes)" + '.txt');

     document.body.appendChild(download);
     download.click();
     document.body.removeChild(download);
 };