// Initialize Firebase
// TODO: Replace with your project's customized code snippet
function signIn() {
    console.log("INNNN")
    const email = document.getElementById('login-email').value
    const pass = document.getElementById('login-pass').value
    const fname = document.getElementById('login-fname').value
    const lname = document.getElementById('login-lname').value
    firebase.auth().signInWithEmailAndPassword(email, pass).then(function () {
        console.log("signed in")
    }).catch(function (error) {
        console.log(error.message)

    });
}
function signOut(){
    firebase.auth().signOut();
    console.log('user signed out')
}
/*function addUserToDatabase(userEmail, userFirstName, userPhone, password, username) {

    var db = firebase.database()
    console.log("got db")
    firebase.auth().createUserWithEmailAndPassword(userEmail, password).then(function () {
        console.log("Success")
        var newUser = {
            firstName: userFirstName,
            email: userEmail,
            phone: userPhone,
            uname: username,
            phnum: phone,
            address1: adr1,
            address2: adr2
        }
  
        const newUserUID = firebase.auth().currentUser.uid
        firebase.database().ref('users').child(newUserUID).set(newUser)
    }).catch(function (error) { console.log("error" + error.message) })
    console.log("Done")
  }
  
function signUp(){
    const email = document.getElementById('signup-email').value
    const pass = document.getElementById('signup-pass').value
    const username = document.getElementById('signup-username').value
    const lname = document.getElementById('signup-lname').value
    const fname = document.getElementById('signup-fname').value
    
    const auth = firebase.auth();
    console.log("signed up")

   
    //firebase.auth().createUserWithEmailAndPassword(email, pass).then(function () {
    const promise = addUserToDatabase(email, fname, lname, pass, username, phone, addr1, addr2);
    promise.catch(e => console.log(e.message));
    console.log("tada")
}*/
function signUp() {
    const email = document.getElementById('signup-email').value
    const pass = document.getElementById('signup-pass').value
    const username = document.getElementById('signup-username').value
    const lname = document.getElementById('signup-lname').value
    const fname = document.getElementById('signup-fname').value
    const phone = document.getElementById('signup-phone').value
    const addr1 = document.getElementById('signup-address1').value
    const city = document.getElementById('signup-city').value
    const state = document.getElementById('signup-state').value
    const zip = document.getElementById('signup-zip').value
    const auth = firebase.auth();

    var user = {
        email: email,
        firstName: fname,
        lastName: lname,
        userName: username,
        phone: phone,
        address: {
            line1: addr1,
            city: city,
            state: state,
            zip: zip
        }
    };


    //firebase.auth().createUserWithEmailAndPassword(email, pass).then(function () {
    addUserToDatabase(user, pass)
    console.log('tada')
}

function addUserToDatabase(user, pass) {

    var db = firebase.database()
    firebase.auth().createUserWithEmailAndPassword(user.email, pass).then(function () {
        const newUserUID = firebase.auth().currentUser.uid
        firebase.database().ref('users').child(newUserUID).set(user)
    }).catch(function (error) { console.log("error" + error.message) })
    console.log("Done")
}

var itemID = 0;
var imageID = 0;
var nextitemID = itemID + 1;//get most recent id number from database;
var nextImageIF = imageID +1;
var db = firebase.database();
function today() {
    var d = new Date()
    var today = (d.getMonth() + 1) + ":" + d.getDate() + ":" + d.getFullYear()
    return today
}

//get elements
function getimg(){
    //var pic = document.getElementById('pic');
    var fileupload = document.getElementById('browseButton');
    //listen
    fileupload.addEventListener('change', function(e){
        var file = e.target.files(0);
        firebase.storage().ref('images/' + imageID.toString());
        storageRef.put(file);
        console.log('uploaded!');
    });
}
function postItem() {
    
    
    
    imageID= imageID +1;
    
    const title = document.getElementById('post-title').value;
    const desc = document.getElementById('post-desc').value;
    const price = document.getElementById('post-price').value;
    const categ = document.getElementById('post-categ').value;
    const cond = document.getElementById('post-itemcond').value;
    const uid = firebase.auth().currentUser.uid;
    const date = today();
    const status_winner = 0;
    const status_available = 'available';
    console.log("got values")

    var itemData = {
        ownerId: uid,
        //img: getimg(),
        item_cond: cond,
        title: title,
        price: price,
        category: categ,
        new_owner: status_winner,
        available: status_available,
        //itemkey:itemID,
        description: desc,
        posted_on: date,
        //itemID: newItemKey
    };
    //creates a new key for the post
    
    db.ref().child('items').child(itemID).set(itemData)
    itemID = itemID + 1;
    db.ref().child('items').child('next_item_id').set(itemData);
    // var newItemKey = db.ref().child('items').push().key;
    // //writes the new post's data in the post list and user post list
    // var updates = {};
    // updates['/items/' + newItemKey] = itemData;
    // updates['/user-items/' + uid + '/' + newItemKey] = itemData;

    console.log("success");
    //return firebase.database().ref().update(updates);
}