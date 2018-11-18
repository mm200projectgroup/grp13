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

    }
    catch (e) {
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
    if(STATUS == 200){
        localStorage.setItem("logindata", JSON.stringify(response));

        signUpForm.style.display = "none";
        setHeaderView("signedIn", header);

        let user = document.getElementById("user");
        user.innerHTML = response.username;
        user.onclick = function changePassword() {
            document.getElementById('userSettingsForm').style.display = 'block';
        };
    }else {
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
    let hash = bcrypt.hashSync(newPassword, 10);
    let user = JSON.parse(localStorage.getItem("logindata")).username;
    let output = document.getElementById("userSettingsOutput");
    let data = {
        password: hash,
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
    let userId = JSON.parse(localStorage.getItem("logindata")).userId;
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

//------------------------------------------------

async function updatePresentation(){
    let presId = JSON.parse(localStorage.getItem("presentationid"));
    let token = JSON.parse(localStorage.getItem("logindata")).token;
    let userId = JSON.parse(localStorage.getItem("logindata")).userId;
    let title = document.getElementById("presentationTitle")
    /*let slides = {
        "slides": presentation
    }*/
    
    //let slides = presentation;
    
    
    let data = {
        presentationTitle: title.value,
        presentationData: presentation,
        token: token,
        userId: userId,
        presId: presId
    };
    
    
    let res = await sendData("/app/presentation/updatePresentation/", data);
}

getAllPresentaionToUser();
async function getAllPresentaionToUser(){
    let userId = JSON.parse(localStorage.getItem("logindata")).userId;
    let token = JSON.parse(localStorage.getItem("logindata")).token;
    let data = {
        userId: userId,
        token: token
    }
    
        
    let res = await sendData("/app/presentation/listOutPresentations/", data);
    
    let listDiv = document.getElementById("loadedPresentation");

    
    if(res.status =200){
        localStorage.setItem("loadedPresentation", JSON.stringify(res.loadPres));
        
        for(let i = 0; i < res.loadPres.length; i++){
        listDiv.innerHTML += `<p onclick="openPresentation(${i})" >${res.loadPres[i].titel}</p>`;   
        }
        
    }
    
      
}

