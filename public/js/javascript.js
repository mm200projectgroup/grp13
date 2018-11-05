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

    let data = {
        username: regUsername.value,
        password: regPassword.value,
        email: regEmail.value,
        role: ROLE
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