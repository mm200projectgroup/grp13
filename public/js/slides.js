        let data = [{
            presentationsID: 1,
            titel: "Forside",
            text: "Et Esel er ikke en hest",
            bakgrunn: "darkseagreen"
        }, {
            presentationsID: 1,
            titel: "Innhold",
            text: "Et Esel har lange ører",
            bakgrunn: "cadetblue"
        }, {
            presentationsID: 1,
            titel: "Litt text",
            text: "Jeg håper at dette er en fine slide. Det hadde vært syn hvis den gikk utenfor div taggen. La oss håpe at jeg slipper å måtte gjøre mye for å fikse dette. Kanskje det tilog med ikke er et problem. Tror jeg skal bare slå hode på keybordet for å få litt mer text her.. asijfhasjhdfaousjfgaoøsiudpoajghsfouajsdahjsfpaskjdouahsøkgfjsdfhjaøskdpiaoshjgfpoask",
            bakgrunn: "darkslateblue"
        }];


        let canvas = document.getElementById("canvas");
        for (let i = 0; i < data.length; i++) {
            let div = document.createElement("div");
            let slides = `
            <div class="title">${data[i].titel}</div>
            <div class="text">${data[i].text}</div>
        `;


            div.innerHTML = slides;
            div.className = "mySlides";
            div.id = "slide" + i;
            canvas.appendChild(div)
            document.getElementById("slide" + i).style.backgroundColor = `${data[i].bakgrunn}`;


        }


        let preview = document.getElementById("preview");
        for (let i = 0; i < data.length; i++) {

            let div = document.createElement("div");
            let slides = `
            <div class="previewTitle">${data[i].titel}</div>
        `;

            div.innerHTML = slides;
            div.className = "myPreview";
            div.id = "preview" + i;
            div.onclick = select;
            preview.appendChild(div)
            document.getElementById("preview" + i).style.backgroundColor = `${data[i].bakgrunn}`;

        }



        function select(evt) {
            let target = evt.currentTarget.id;
            let getNr = target.match(/\d+/g).map(Number);
            let index = parseInt(getNr)+1;
            console.log(index);
            
            currentSlide(index);

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
                preview[i].className = preview[i].className.replace(" active", "");
            }
            slides[slideIndex - 1].style.display = "block";
            preview[slideIndex - 1].className += " active";
        }

        