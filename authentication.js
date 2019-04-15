// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var firebaseConfig = {
  apiKey: "AIzaSyCEqWuL7oLq3Xl0-7WIEuEbsE2EgkTbo0M",
  authDomain: "marketplacev2-21876.firebaseapp.com",
  databaseURL: "https://marketplacev2-21876.firebaseio.com",
  projectId: "marketplacev2-21876",
  storageBucket: "marketplacev2-21876.appspot.com",
  messagingSenderId: "169110498947"
};
function addUserToDatabase(userEmail, userFirstName, userPhone, password, username) {

  var db = firebase.database()
  console.log("got db")
  firebase.auth().createUserWithEmailAndPassword(userEmail, password).then(function () {
      console.log("Success")
      var newUser = {
          firstName: userFirstName,
          email: userEmail,
          phone: userPhone,
          uname: username
      }

      const newUserUID = firebase.auth().currentUser.uid
      firebase.database().ref('users').child(newUserUID).set(newUser)
  }).catch(function (error) { console.log("error" + error.message) })
  console.log("Done")
}
//firebase.auth().signInWithEamilandPassword(email, password)
//firebase.initializeApp(firebaseConfig);
//Get Elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

//add login event
btnLogin.addEventListener('click', e => {
  console.log(3)
  //get email and pass
  const fname = txtFname.value;
  const lname = txtLname.value;
  const username = txtUsername.value;
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  //Sign in 
  const promise = auth.signInWithEamilandPassword(email, password);
  promise.catch(e => console.log(e.message));

});
btnSignUp.addEventListener('click', e => {
  //get email and pass
  const fname = txtFname.value;
  const lname = txtLname.value;
  const username = txtUsername.value;
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  //Sign in

  addUserToDatabase(email, fname, 12345, pass, username)
  promise.catch(e => console.log(e.message));
});

btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
});