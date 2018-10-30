let status;





function sendData(endpoint, data) {
    return fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data)
    }).then(data => {
        if(data.status==200){
        status = data.status;
        return data.json();
        }
    });
}





function getData(endpoint) {
    return fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    }).then(data => {
        console.log(data);
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
            if (status == 200) {
                console.log("yay");
                headerButton1.style.visibility = 'hidden';
                headerButton2.style.visibility = 'hidden';
                logInForm.style.display = "none";

                let hyperlink = document.createElement("button");
                hyperlink.innerHTML = data.username;
                hyperlink.onclick = function changePassword() {
                    document.getElementById('userSettingsForm').style.display = 'block'
                };
                user.innerHTML = "hello, ";
                user.appendChild(hyperlink)
                //user.innerHTML = json.mld;
                user.style.visibility = 'visible';

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

    let data = {
        username: regUsername.value,
        password: regPassword.value,
        email: regEmail.value
    };

    sendData("/app/users/register", data)
        .then(json => {
            outputSignUp1.style.color = "white";
            outputSignUp1.innerHTML = "Bruker registrert";
            signUpForm.style.display = "none";
        })
        .catch(error => {
            outputSignUp1.style.color = "red";
            outputSignUp1.innerHTML = "error";
            console.log(error);
        });



}


function changeLogin() {
    let data = {
        username: newUsername.value,
        password: newPassword.value,
    };
    sendData("/app/editUsers/changeLogin", data)
}




//Test funksjoner
/*
//Test function. Delete if now longer needed.
function tempFunction() {
    return fetch("/app/update/email/", {
        method: "UPDATE",
        headers: {
            "Content-Type": "application/json; charset=utf8"
        },
        body: JSON.stringify({
            newEmail: "nordbom@gmail.com",
            oldEmail: "nordbom@live.no"
        })
    })
}*/

/*
//Test function. Checking if GET works
(function () {
    getData("/app/users/getUsers");
})();
*/