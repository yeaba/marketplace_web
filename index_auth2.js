function signIn() {
    console.log("INNNN")
    const email = document.getElementById('login-email').value
    const pass = document.getElementById('login-pass').value
    firebase.auth().signInWithEmailAndPassword(email, pass).then(function () {
        console.log("signed in")
        feed()
    }).catch(function (error) {
        console.log(error.message)
    });
}
function signOut(){
    firebase.auth().signOut();
    console.log('user signed out')
}

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


var db = firebase.database();
//var db = firebase.database();
function today() {
    var d = new Date()
    var today = (d.getMonth() + 1) + ":" + d.getDate() + ":" + d.getFullYear()
    return today
}
function postItem() {
    //var imageName = (uid.jpg);
    //var uidRef = imagesRef.child(imageName);
    //var imagesRef = uidRef.parent;
    
    const title = document.getElementById('post-title').value;
    const desc = document.getElementById('post-desc').value;
    const price = document.getElementById('post-price').value;
    const categ = document.getElementById('post-categ').value;
    const cond = document.getElementById('post-itemcond').value;
    const date = today();
    const status_winner = 0;
    const status_available = 'available';
    const uid = firebase.auth().currentUser.uid;
    
    //var path = uidRef.fullPath
    //var name = uidRef.name;
    
    
    console.log("got values")

    var itemData = {
        ownerId: uid,
        item_cond: cond,
        // img: image,
        title: title,
        price: price,
        category: categ,
        ownerID: uid,
        new_owner: status_winner,
        available: status_available,
        description: desc,
        posted_on: date,
        // itemID: newItemKey
    };
    //creates a new key for the post

    db.ref().child('items').child("100").set(itemData)
    // var newItemKey = db.ref().child('items').push().key;
    // //writes the new post's data in the post list and user post list
    // var updates = {};
    // updates['/items/' + newItemKey] = itemData;
    // updates['/user-items/' + uid + '/' + newItemKey] = itemData;

    console.log("success");
    //return firebase.database().ref().update(updates);
}

function feed() {
    updateFeedTableWithHeader()

    db.ref('items').once('value').then(function (data) {
        const itemsData = data.val();
        delete itemsData.next_item_id
        updateFeedContents(itemsData)
        console.log(itemsData);
        console.log("hello")
    });
}
function updateFeedTableWithHeader() {
    console.log('sfsf')
    var table = document.getElementById('feeds')
    table.innerHTML = ''
    var row = table.insertRow(table.rows.length)
    var titleCell = row.insertCell(0)
    titleCell.innerHTML = "Title"
    var descriptionCell = row.insertCell(1)
    descriptionCell.innerHTML = "Description"
}

function updateFeedContents(data) {
    var itemIds = Object.keys(data)
    var table = document.getElementById('feeds')
    for (var i = 0; i < itemIds.length; i++) {
        const item = data[itemIds[i]]
        var row = table.insertRow(table.rows.length)
        row.innerHTML = buildItemRow(item)
    }
    var row = table.insertRow(table.rows.length)
    row.innerHTML = buildItemRow()

}

function buildItemRow(item) {
    var title = item['title']
    var description = item['description']
    var imageRef = item['imageRef']
    var price = item['priceInCents']
    console.log(imageRef)
    var retVal = ' <div class = "row"> <div class = "col s4"><img src= ' + imageRef + ' style="width: 300px" alt=""> </div> <div class = "col s8"> <b> ' + title + '</b>'
    retVal += ' <br> Description : ' + description + ' <br> Price: ' + price + '</div> </div>'
    return retVal
}