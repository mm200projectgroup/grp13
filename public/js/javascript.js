let STATUS;







function sendData(endpoint, data) {
    return fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
    }).then(data => {
        STATUS = data.status;
        return data.json();


    });
}


function getData(endpoint) {
    return fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    }).then(data => {
        //console.log(data);
    });
}




async function loggInn() {
    let login = loggInnUsername.value;
    let password = loggInnpassword.value;
    try {
        let data = {
            username: login,
            password: password
        };
        let json = await sendData("/app/users/login", data);
        console.log(typeof json, json);
        if (json.username) {
            console.log("yay");

            localStorage.setItem("logindata", JSON.stringify(json));

            logInForm.style.display = "none";
            setHeaderView("signedIn", header);

            let user = document.getElementById("user");
            user.innerHTML = json.username;
            user.onclick = function changePassword() {
                document.getElementById('userSettingsForm').style.display = 'block'
            };
            getAllPresentaionToUser();

        } else {
            console.log("ops");
            outputLogIn1.innerHTML = json.mld;
        }

    } catch (e) {
        console.log(e);
    }


}


async function register() {


    let data = {
        username: regUsername.value,
        password: regPassword.value,
        email: regEmail.value,
    };

    let response = await sendData("/app/users/register", data);
    console.log(response);
    if (STATUS == 200) {
        localStorage.setItem("logindata", JSON.stringify(response));

        signUpForm.style.display = "none";
        setHeaderView("signedIn", header);

        let user = document.getElementById("user");
        user.innerHTML = response.username;
        user.onclick = function changePassword() {
            document.getElementById('userSettingsForm').style.display = 'block';
        };
    } else {
        outputSignUp1.innerHTML = response.mld;
    }
}

//EDIT USER--------------------------
async function changeUsername() {
    let newUsername = document.getElementById("newUsername").value;
    let user = JSON.parse(localStorage.getItem('logindata')).username;
    let output = document.getElementById("userSettingsOutput");
    let data = {
        newUsr: newUsername,
        username: user
    };
    let res = await sendData("/app/editUsers/changeLogin/username", data);
    console.log(res);
    if (res.status == 200) {
        output.style.color = "black";
        output.innerText = res.message;
        let user = JSON.parse(localStorage.getItem("logindata"));
        user.username = newUsername;
        localStorage.setItem("logindata", JSON.stringify(user));
    } else if (res.status == 400) {
        output.style.color = "red";
        output.innerText = res.error;
    }

}

async function changeEmail() {
    let newEmail = document.getElementById("newEmail").value;
    let user = JSON.parse(localStorage.getItem('logindata')).username;
    let output = document.getElementById("userSettingsOutput");
    let data = {
        email: newEmail,
        username: user
    };

    let res = await sendData("/app/editUsers/changeLogin/email", data);
    if (res.status == 200) {
        output.style.color = "black";
        output.innerText = res.message;
    } else if (res.status == 400) {
        output.style.color = "red";
        output.innerText = res.error;
    }

}



async function changePassword() {
    let prompt = confirm("WARNING: Are you sure about changing the password?");
    if (prompt !== true) {
        return;
    }

    let newPassword = document.getElementById("newPassword").value;
    let user = JSON.parse(localStorage.getItem("logindata")).username;
    let output = document.getElementById("userSettingsOutput");
    let data = {
        password: newPassword,
        username: user
    };

    let res = await sendData("/app/editUsers/changeLogin/password", data);
    if (res.status == 200) {
        output.style.color = "black";
        output.innerText = res.message;
    } else if (res.status == 400) {
        output.style.color = "red";
        output.innerText = "Something went wrong";
    }

}
//-----------------------------------


//---------------DELETE USER--------------------
async function deleteUser() {
    let prompt = window.prompt("Please enter your password to confirm. WARNING:This will permanently delete your account!");
    console.log(prompt);
    let n = await getHash();
    console.log(n);
    let hash = n.hash;
    let user = JSON.parse(localStorage.getItem("logindata")).username;

    if (!bcrypt.compareSync(prompt, hash)) {
        return window.alert("Imma need you to enter the correct password, chief");
    }


    let cfg = {
        method: 'DELETE'
    };

    let res = await fetch("/app/editUsers/changeLogin/" + user, cfg);
    if (res.status == "200") {
        logOut();
    } else {
        console.error(res);
    }


}




function logOut() {
    localStorage.removeItem('logindata');
    document.getElementById("userSettingsForm").style.display = "none";
    setHeaderView("notSignedIn", header);
}


async function getHash(usr) {
    let username;
    if (usr) {
        username = usr;
    } else {
        username = JSON.parse(localStorage.getItem('logindata')).username;
    }
    return await fetch('/app/editUsers/hash/' + username).then(data => {
        return data.json();
    });
}




//SAVE PRESENTATION TO DB---------------------------
async function savePresentation() {


    let token = JSON.parse(localStorage.getItem("logindata")).token;
     let userId = JSON.parse(localStorage.getItem("logindata")).userId.toString();
    let title = document.getElementById("presentationTitle").value;
    if(!title){
        title = 'untitled';
    }
    let presID = localStorage.getItem('presentationid');
   /* try{
        presID = localStorage.getItem('presentationid');
    }
    catch (e) {
        presID = null;
    } */

    let data = {
        presId: presID,
        presentationTitle: title,
        presentationData: presentation,
        token: token,
        userId: userId
    };

    let res = await sendData("/app/presentation/savePresentation/", data);

    if (res.presId) {
        localStorage.setItem("presentationid", JSON.stringify(res.presId));
        
        let presdata = JSON.parse(localStorage.getItem('presentation'));
        window.alert("Success!");
        getAllPresentaionToUser();
        
    }
}


/*
function savePresentation() {
    if (localStorage.presentationid == null) {
        saveNewPresentation();
    } else {
        updatePresentation();
    }
}



//SAVE PRESENTATION TO DB---------------------------
async function saveNewPresentation() {


    let token = JSON.parse(localStorage.getItem("logindata")).token;
    let userId = JSON.parse(localStorage.getItem("logindata")).userId.toString();
    let title = document.getElementById("presentationTitle")



    let data = {
        presentationTitle: title.value,
        presentationData: presentation,
        token: token,
        userId: userId
    };


    let res = await sendData("/app/presentation/savePresentation/", data);

    if (res.status = 200) {
        localStorage.setItem("presentationid", JSON.stringify(res.presId));

        let presdata = JSON.parse(localStorage.getItem('presentation'));
        getAllPresentaionToUser();

    }
}
*/
//------------------------------------------------
/*
async function updatePresentation() {
    let presId = JSON.parse(localStorage.getItem("presentationid"));
    let token = JSON.parse(localStorage.getItem("logindata")).token;
    let userId = JSON.parse(localStorage.getItem("logindata")).userId.toString();
    let title = document.getElementById("presentationTitle")



    let data = {
        presentationTitle: title.value,
        presentationData: presentation,
        token: token,
        userId: userId,
        presId: presId
    };


    let res = await sendData("/app/presentation/updatePresentation/", data);
}
*/

async function deletePresentation(presID, lsIndex){
    
    let token = JSON.parse(localStorage.getItem("logindata")).token;
    let userId = JSON.parse(localStorage.getItem("logindata")).userId.toString();
    
    
    let data = {
        token: token,
        presID: presID,
        userID: userId
    };
    
     let res = await sendData("/app/presentation/deletePresentation/", data);
     
    if (STATUS == 200){
        
        let listDiv = document.getElementById("loadedPrivetPresentation");
        let presentations = JSON.parse(localStorage.getItem("loadedPresentation"));
        presentations.splice(lsIndex, 1);
        

        
        listDiv.innerHTML = "";
        
        for (let i = 0; i < presentations.length; i++) {
            
            listDiv.innerHTML += `<div class="loadedPres"><p id="${presentations[i].presentationid}" onclick="openPresentation(${i})">${presentations[i].titel}</p><span onclick="deletePresentation(${presentations[i].presentationid}, ${i})" class="deleteSlide">&times;</span></div>`;
        }
        
        
        localStorage.setItem("loadedPresentation", JSON.stringify(presentations));
        

    }
    
}



async function getAllPresentaionToUser() {
    let userId = JSON.parse(localStorage.getItem("logindata")).userId;
    let token = JSON.parse(localStorage.getItem("logindata")).token;

    let data = {
        userId: userId,
        token: token
    }

    let res = await sendData("/app/presentation/listOutPresentations/", data);

    let listDiv = document.getElementById("loadedPrivetPresentation");


    if (res.status = 200) {
        localStorage.setItem("loadedPresentation", JSON.stringify(res.loadPres));
        


        listDiv.innerHTML = "";
        
        for (let i = 0; i < res.loadPres.length; i++) {
            
           let presID = JSON.parse(localStorage.getItem("loadedPresentation"))[i].presentationid;
            
            listDiv.innerHTML += `<div class="loadedPres"><p  id="${presID}" onclick="openPresentation(${i})">${res.loadPres[i].titel}</p><span onclick="deletePresentation(${presID}, ${i})" class="deletePres">&times;</span></div>`;
        }
    }
}


async function getAllPublicPresentation() {

    let token = JSON.parse(localStorage.getItem("logindata")).token;
    
    let data = {
        token: token
    }
    let res = await sendData("/app/presentation/listPublic/", data)

    let listDiv = document.getElementById("loadedPublicPresentation")

    if (STATUS == 200) {
        
        localStorage.setItem("loadedPublicPresentation", JSON.stringify(res.loadPublicPres));
        
        listDiv.innerHTML = "";
        for (let i = 0; i < res.loadPublicPres.length; i++) {
            listDiv.innerHTML += `
            <div class="loadedPres">
            <p onclick="openPublicPresentation(${i})">${res.loadPublicPres[i].titel}</p>
            </div>`;
        }

    }
}



///TODO: Forløpig må du lagre og deretter laste for å kunne dele presentasjon. Fix this!!!
///TODO: Ikke tillat å dele to ganger med samme presentasjon
async function sharePresentation() {
    savePresentation();
    let user = document.getElementById("shareWith").value;
    let token = JSON.parse(localStorage.getItem("logindata")).token;
    if (!user) {
        return;
    }



    let data = {
        login: user,
        presID: localStorage.getItem("presentationid"),
        token: token
    };

    let response = await sendData('/app/presentation/sharePresentation/', data);
    if (STATUS == 200) {
        window.alert(response.feedback);
    }
}


async function sharePublicPresentation() {
    let userId = JSON.parse(localStorage.getItem("logindata")).userId;
    let token = JSON.parse(localStorage.getItem("logindata")).token;


    let data = {
        userID: userId,
        presID: localStorage.getItem("presentationid"),
        token: token
    };

    console.log(data);

    let response = await sendData('/app/presentation/makePublic/', data);
    if (STATUS == 200) {
        window.alert("success");
        
    getAllPublicPresentation();
        
    }
}