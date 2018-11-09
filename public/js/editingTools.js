//Denne funksjonen setter størrelse
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


	//her tilpasses høyden og bredden til skjermen og konverteres over til pixels
	//presObject.style.width = screen.width - (screen.width * resizeAmount) + "px";
	//presObject.style.height = screen.height - (screen.height * resizeAmount) + "px";

	//her kjører knappen funksjonen addImg
	addImgBtn.addEventListener("click", addImg);
	//her kjører slideren funksjonen resizeImg
	imgSlider.addEventListener("input", resizeImg);
	filter.addEventListener("change", changeFilter);

	//funksjon som legger til et bilde ved hjelp av prompt vindu hvor du kan skrive link til en bildefil.
	///DETTE MÅ VI ENDRE TIL ET INPUT FELT -----------------------------------------------------------///
	function addImg() {
		//Lag egen div til hvor bilde skal være og legg den som verdi.
		let slideId = localStorage.getItem("currentSlide");
		let presObject = document.getElementById(slideId);
		//her settes størrelsen til diven 
		//let canvasWidth = parseInt(presObject.style.width, 10);
		//Denne åpner et prompt vindu hvor du legger inn bildelinken
		let input = prompt("skriv inn lenke til bilde");

		//sjekker om bildefil er bildefil hvis ikke skjer det ingenting
		if (input.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
			//her lager du et object av bildeurl du har skrevet inn
			imgObj = document.createElement("IMG");
			//her henter du img objektet fra inputet fra prompt vinduet
			imgObj.src = input;
			//her settes størrelsen til bilde objektet du har lagt til
			//imgObj.width = canvasWidth - (canvasWidth * 0.3);

			presObject.appendChild(imgObj);
		} else {
			//her skrives det ut en alert hvis urlen ikke er en bilde fil
			alert("url not an image!");
		}

	}

	//funksjon som skalerer bilde ved hjelp av range slideren
	function resizeImg(e) {
		if (imgObj) {
			imgObj.width = e.target.value;

		}


	}

	//funksjon som setter filter på bildene
	function changeFilter(evt) {
		//console.log(evt.target.value);
		if (imgObj) {
			//legger til det valgte filteret fra select options
			imgObj.style.filter = evt.target.value;
		}

	}
	//Returnerer det skalerte objektet
	return imgResizerObj;
}
//kjører funksjonen resizeImg
imgResizer();




function selectActive() {
    let activeWindow = document.activeElement;
    if (activeWindow.tagName == "INPUT") {
        activeInput = activeWindow;
    }
}


function toBold() {
    if (activeInput.style.fontWeight == 700) {
        activeInput.style.fontWeight = 100;
    } else {
        activeInput.style.fontWeight = 700;
    }

}

function toItalic() {
    if (activeInput.style.fontStyle == "italic") {
        activeInput.style.fontStyle = "normal";
    } else {
        activeInput.style.fontStyle = "italic";
    }
}

function toUnderline() {
    if (activeInput.style.fontVariant == "small-caps") {
        activeInput.style.fontVariant = "normal";
    } else {
        activeInput.style.fontVariant = "small-caps";
    }
}


/*
function changeColor(color){
    
    let currentSlideID = localStorage.getItem('currentSlide');
     document.getElementById(currentSlideID).style.backgroundColor=color; 
    updateBackground(currentSlideID, color);


    
}*/