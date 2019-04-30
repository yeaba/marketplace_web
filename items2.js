// Initialize Firebase
// TODO: Replace with your project's customized code snippet
function signIn() {
    console.log("INNNN")
    const email = document.getElementById('login-email').value
    const pass = document.getElementById('login-pass').value
    firebase.auth().signInWithEmailAndPassword(email, pass).then(function () {
        console.log("signed in")
    }).catch(function (error) {
        console.log(error.message)

    });
}
var db = firebase.database();
function postItem() {
    // var imageName = (uid.jpg);
    //var uidRef = imagesRef.child(imageName);
    //var path = uidRef.fullPath
    //var name = uidRef.name;
    //var imagesRef = uidRef.parent;
    //var today = new Date();
    //var date = today.getFullYear() + '/'+(today.getMonth()+1)+'/'+today.getDate();
    
    const title = document.getElementById('post-title').value;
    const desc = document.getElementById('post-desc').value;
    const price = document.getElementById('post-price').value;
    const categ = document.getElementById('post-categ').value;
    const cond = document.getElementById('post-itemcond').value;
    const uid = firebase.auth().currentUser.uid;
    const date = ServerValue.TIMESTAMP;
    const status_winner = 0;
    const status_available = 'available';
    console.log("got values")

    var itemData = {
        ownerId: uid,
        // img: image,
        item_cond: cond,
        title: title,
        price: price,
        category: categ,
        new_owner: status_winner,
        available: status_available,
        // ownerID: uid,
        description: desc,
        posted_on: date,
        // itemID: newItemKey
    };
    //creates a new key for the post

    db.ref().child('items').child().set(itemData)
    // var newItemKey = db.ref().child('items').push().key;
    // //writes the new post's data in the post list and user post list
    // var updates = {};
    // updates['/items/' + newItemKey] = itemData;
    // updates['/user-items/' + uid + '/' + newItemKey] = itemData;

    console.log("success");
    //return firebase.database().ref().update(updates);
}