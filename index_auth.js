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


var db = firebase.database();

function postItem() {
    var imageName = (uid.jpg);
    var uidRef = imagesRef.child(imageName);
    var path = uidRef.fullPath
    var name = uidRef.name;
    var imagesRef = uidRef.parent;
    const title = document.getElementById('post-title').value;
    const desc = document.getElementById('post-desc').value;
    const price = document.getElementById('post-price').value;
    const categ = document.getElementById('post-categ').value;
    const uid = firebase.auth().currentUser.uid;

    console.log("got values")

    var itemData = {
        ownerId: uid,
        // img: image,
        title: title,
        price: price,
        category: categ,
        // ownerID: uid,
        description: desc,
        //posted_on: date,
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
    return firebase.database().ref().update(updates);
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