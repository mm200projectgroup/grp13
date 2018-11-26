# grp13
Group members:
Magnus Nordbø
Alexandra Regina Fjelstrup
Ina F. Pedersen
Henrik Vedal


Server API:

Server URL: "https://mm200project.herokuapp.com/app"

------------------------------------------------------------------Create User: 
------------------------------------------------------------------

Send a POST request to "/users/register" containing: 

username: the new username
password: the new password
email: the new email adress

Expected response (if successful): 

username: the username as registered in the database
token: the authentication token
userID: the ID of the user in the database
role: either 1 or 2. 1 = normal user, 2 = admin

Expected response (if unsuccessful): 

mld: Will tell you if email or username is already taken


------------------------------------------------------------------Login 
------------------------------------------------------------------

Send a POST request to "/users/login" containing:

username: the username OR the email of the user
password: the password

Expected response (if successful):

username: username as registered in the database
token: the authentication token
userID: the ID of the user in the database
role: either 1 or 2. 1 = normal user, 2 = admin

Expected response (if unsuccesful)

mld: "Wrong username or password"


------------------------------------------------------------------Change email: 
------------------------------------------------------------------
POST request to "/editUsers/changeLogin/email" containing:

email: new email
token: token

Expected response (if successful):

message: "email changed succesfully"
status: 200

Expected response (if unsuccessful):
error: "Email is already taken"
status: 400


------------------------------------------------------------------Change username: 
------------------------------------------------------------------
POST request to "/editUsers/changeLogin/username" containing:

newUsr: new username
token: token

Expected response (if successful):

message: "username changed successfully"
status: 200
token: new token

Expected response (if unsuccessful):

message: "Username is taken"
status: 400

------------------------------------------------------------------Change password: 
------------------------------------------------------------------
POST request to "/editUsers/changeLogon/password" containing:

password: New password
token: token

Expected response (if successful):
message:"Password changed successfully"


------------------------------------------------------------------Delete user: 
------------------------------------------------------------------
DELETE request to "/app/editUsers/changeLogin/" + token

Expected response (if successful):

user deleted from server 
status: 200

Expected response (if unsuccessful)

message: "Imma need you to enter the correct password, chief"


------------------------------------------------------------------Save presentation: 
------------------------------------------------------------------
POST request to "/app/presentation/savePresentation/" containing

presId: send in presId if found
presentationTitle: collect presentation title
presentationData: the whole presentation object
token: the authentication token
userId: the ID of the user 

Expected response (if successful):

message: "Presentation saved"


------------------------------------------------------------------Delete prentation: 
------------------------------------------------------------------
POST request to "/app/presentation/deletePresentation/"

data:
token: the authentication token
presID: collect the presentation ID
userID: the ID of the user in the database



------------------------------------------------------------------Get the presentaiton to the user: 
------------------------------------------------------------------
POST request to "/app/presentation/listOutPresentations/" containing:

userId: the ID of the user in the database
token: the authentication token

Expected response (if successful):
loadPres: containing the users presentation + presentation id
status: 200


------------------------------------------------------------------Get all public presentations: 
------------------------------------------------------------------
POST request to "/app/presentation/listPublic/"

data:
token: the authentication token

Expected response (if successful)
loadPublicPres: containing all presentations that is public
status: 200


------------------------------------------------------------------Share private presentaiton: 
------------------------------------------------------------------
POST request to '/app/presentation/sharePresentation/'

data:
login: users you want to share with
presID: collect the presentation ID
token: the authentication token

Expected response (if successful)

message: "Success!"
status: 200

------------------------------------------------------------------Share public presentaiton: 
------------------------------------------------------------------
POST request '/app/presentation/makePublic/' containing: 

userId: the ID of the user
presID: the id of the presentation
token: the authentication token

Expected response (if successful)

 feedback: "Presentation is now public"