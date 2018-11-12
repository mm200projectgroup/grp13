let STATUS;
let ROLE = 1;






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






function loggInn() {
    let data = {
        username: loggInnUsername.value,
        password: loggInnpassword.value
    };


    sendData("/app/users/login", data)
        .then(json => {
            console.log(status);
            if (STATUS == 200) {
                console.log("yay");
                
                localStorage.setItem("logindata", JSON.stringify(json));
                let token = JSON.parse(localStorage.getItem("logindata")).token;
              
                logInForm.style.display = "none";
                setHeaderView("signedIn", header);
                
                let user = document.getElementById("user");
                user.innerHTML = json.username;
                user.onclick = function changePassword() {
                document.getElementById('userSettingsForm').style.display = 'block'
                };

      

            } else {
                console.log("ops");
                outputLogIn1.innerHTML = json.mld;
            }
        })
        .catch(error => {
            outputLogIn1.innerHTML = error;
            console.log(error);
        });

}



function register() {
    
    let hash = bcrypt.hashSync(regPassword.value, 10);
    
    let data = {
        username: regUsername.value,
        password: hash,
        email: regEmail.value,
        role: ROLE
    };

    sendData("/app/users/register", data)
        .then(json => {
                if (STATUS == 200) {
                console.log("yay");
                
                localStorage.setItem("logindata", JSON.stringify(json));
                let token = JSON.parse(localStorage.getItem("logindata")).token;
              
                signUpForm.style.display = "none";
                setHeaderView("signedIn", header);
                
                let user = document.getElementById("user");
                user.innerHTML = json.username;
                user.onclick = function changePassword() {
                document.getElementById('userSettingsForm').style.display = 'block'
                };

      

            } else {
                outputSignUp1.innerHTML = json.mld;
            }
        
        
        })
        .catch(error => {
            outputSignUp1.style.color = "red";
            outputSignUp1.innerHTML = "error";
            console.log(error);
        });



}

//EDIT USER--------------------------
async function changeUsername() {
    let newUsername = document.getElementById("newUsername").value;
    let user = JSON.parse(localStorage.getItem('logindata')).username;
    let output = document.getElementById("userSettingsOutput");
    let data = {
        newUsr:newUsername,
        username: user
    };
    let res = await sendData("/app/editUsers/changeLogin/username", data);
        console.log(res);
        if(res.status == 200){
            output.style.color = "black";
            output.innerText = res.message;
            let user = JSON.parse(localStorage.getItem("logindata"));
            user.username = newUsername;
            localStorage.setItem("logindata",JSON.stringify(user));
        }
        else if(res.status == 400){
            output.style.color = "red";
            output.innerText = res.error;
        }

}

async function changeEmail() {
    let newEmail = document.getElementById("newEmail").value;
    let user = JSON.parse(localStorage.getItem('logindata')).username;
    let output = document.getElementById("userSettingsOutput");
    let data = {
        email:newEmail,
        username:user
    };

    let res = await sendData("/app/editUsers/changeLogin/email", data);
    if(res.status == 200){
        output.style.color = "black";
        output.innerText = res.message;
    }
    else if(res.status == 400){
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
        username:user
    };

    let res = await sendData("/app/editUsers/changeLogin/password", data);
    if(res.status == 200){
        output.style.color = "black";
        output.innerText = res.message;
    }
    else if(res.status == 400){
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

    if(!bcrypt.compareSync(prompt, hash)){
        return window.alert("Imma need you to enter the correct password, chief");
    }


    let cfg = {
        method: 'DELETE'
    };

    let res = await fetch("/app/editUsers/changeLogin/" + user, cfg);
    if (res.status == "200") {
        logOut();
    }
    else {
        console.error(res);
    }


}

function logOut() {
    localStorage.removeItem('logindata');
    document.getElementById("userSettingsForm").style.display = "none";
    setHeaderView("notSignedIn", header);
}

async function getHash() {
    let username = JSON.parse(localStorage.getItem('logindata')).username;
    return fetch('/app/editUsers/hash/' + username).then(data => {
        return data.json();
    });
}



//SAVE PRESENTATION TO DB---------------------------
async function savePresentation() {
let title = document.getElementById("prenestationTitle")
let slides = {"slides":presentation}
console.log(slides)
    let data = {
        presentationTitle: title.value,
        presentationData: slides
    };


    let res = await sendData("/app/presentation/savePresentation/", data);
}

//------------------------------------------------