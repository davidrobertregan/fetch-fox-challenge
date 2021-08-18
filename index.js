/*
 DELIVERABLE 1: When a user clicks on the button, display a picture of a fox using the fox API (https://randomfox.ca/floof/)
This deliverable will require you to combine event handling, communication with the server (fetch), and DOM manipulation
*/

const button = document.querySelector("button")
const image = button.nextElementSibling;
console.log(button, image)

function addFox(source){
    image.src = source
}

fetch(`https://randomfox.ca/floof/`)
    .then(resp => resp.json())
    .then(foxObj => {
        console.log(foxObj)
        const source = foxObj.image
        button.addEventListener('click', () => addFox(source))
    })

/*
DELIVERABLE 2: Start the json-server so that it is able to serve the data from the db.json file (json-server --watch db.json).
 Make a fetch request to "http://localhost:3000/foxes" to get an array of objects with fox data! For each object, create a <li></li>
element that displays the fox's name. The li element should also save the fox's ID. You can append the li element to the ul#list-of-foxes
element.
*/

const foxList = document.getElementById("list-of-foxes")
console.log(foxList)

const featuredFoxImg = document.querySelector("#featured-fox img")
const featuredFoxName = document.getElementsByClassName("fox-name")[0]
console.log(featuredFoxName)
console.log(featuredFoxImg)

function createFoxList(foxArr) {
    for(i = 0; i < foxArr.length; i++){
        const foxes = foxArr[i].name
        const foxId = foxArr[i].id
        const foxNames = document.createElement('li')
        foxNames.textContent = `${foxes}`
        foxNames.id = foxId;
        console.log(foxNames)
        foxList.appendChild(foxNames)
        foxNames.addEventListener('click', () => addFoxNameImg(foxId))
    }
}


fetch(`http://localhost:3000/foxes`)
    .then(resp => resp.json())
    .then(foxArr => {
        createFoxList(foxArr)
        console.log(foxArr)
    });

/*
DELIVERABLE 3: When a user clicks on a li, get more information about the fox that the li represents by making
a fetch request to `http://localhost:3000/foxes/${foxId}` where foxId is the id of the fox that the li represents. You should get back an object
with information about one fox. Use the data inside of this object to update the img element and li element in the DOM in
the div#featured-fox section under the deliverable 2 & 3section.
*/

//added this function to createFoxList

function addFoxNameImg(foxId){
    fetch(`http://localhost:3000/foxes/${foxId}`)
        .then(resp => resp.json())
        .then(oneFox => {
            featuredFoxImg.src = oneFox.image;
            featuredFoxName.textContent = oneFox.name;
        })
}

/*
DELIVERABLE 4: When a user submits the form, get the user input and add the new fox to the list of foxes in the
 Deliverable 2 & 3section. So this requires creating an <li></li> element that displays the new fox's name and appending it
 to the ul#list-of-foxes element. When you refresh the page, this won't persist, but that's alright for now! You need to learn about
 POST requests in order to make this persist. POST requests will not be on the code challenge. (:
*/

// const submitButton = document.querySelector("form button");
// const nameInput = document.querySelector("form input")
// const imgLabel = nameInput.nextElementSibling
// const imgInput = imgLabel.nextElementSibling

const form = document.querySelector("form")

console.log(form[1])


form.addEventListener('submit', function(event){
    event.preventDefault()
    newFoxName = document.createElement('li')
    newFoxName.textContent = event.target[0].value
    foxList.append(newFoxName);
    featuredFoxImg.src = event.target[1].value
})