//Varibale for the Google Books API base URL
var gBooksURL = "https://www.googleapis.com/books/v1/volumes?q="
//Variable for the Google Books API key 
var gBooksAPIKey = "AIzaSyAB-DMWo1SEDPqiD8Ihs-wgBnfsUTn9DRo"
//Selects the form element from the html
var searchForm = document.getElementById('search-form')
//Selects the text input field where the user will enter their unput
var userInput = document.getElementById('book-input-field')
//Creastes an instance variable to use with our modal
var instance
//Calls our function to display random quotes on the inex.html
displayQuote()
//Adds an event listener to wait for all content to load before rendering
document.addEventListener('DOMContentLoaded', function() {
    //Selects all modal classes
    var elems = document.querySelectorAll('.modal')
    //Sets our instance value to the modal initiation
    instance = M.Modal.init(elems)[0]
    //Logs the instance for reference
    console.log (instance)
  })
//Adds an event listener of submit to the entire search form
searchForm.addEventListener('submit', function (e) {
    //Gets the value entered by the user in the input field
    var inputVal = userInput.value
    //Prevents the page from refreshing
    e.preventDefault()
    console.log('submitted')
    //Look in the console to see what value we are getting
    console.log(inputVal)
    //Calls the searchBooks function with a argument of the users input value
    searchBooks(inputVal)
    //If the user doest input a value 
    if (!inputVal) {
        //Modal will open and tell the user to input a book or author 
        instance.open()
    }
})
//Function to search for books using Google Books API based on user input
function searchBooks(input) {
    //Creates the full URL by concating user input and the API key to the base URL
    var fullUrl = gBooksURL + input + "&key=" + gBooksAPIKey
    //Makes an http request to Google Books
    fetch(fullUrl)
    .then(function(resp) {
        //If the response is not an OK code a new Error will be thrown and caught at the end of the response chain, skipping any code between
        if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`)
        }
        //Returns the response in json format
        return resp.json()
    })
    //Parsed json data from the above returned promise will be stored in data
    .then(function(data) {
        if(data === undefined || data.items === undefined) {
            throw new Error('data is undefined')
        }
        //Sets our searched data items into an array of objects in local storage for us to be able to grab by the key of'books' later
        localStorage.setItem('books', JSON.stringify(data.items))
        //Sets our userinput into local storage to use on the cards page for showing results 
        localStorage.setItem('user-input', JSON.stringify(userInput.value))
        //When the user searches a book we are directed to the cards.html which is connected to the cards.js
        window.location.href = "assets/html/cards.html"
        
    })
    //Catches our thrown error and logs the error in the console
    .catch (function(err) {
        console.error(err, "Could not fetch data")
    })
}
//Function to display random quotes on the inex.html
function displayQuote() {
    //Varibale to store our category for the quotes api to use
    var category = "knowledge"
    //Fetches our url with the applied parameters
    fetch('https://api.api-ninjas.com/v1/quotes?category=' + category, {
        method: 'GET',
        headers: {
            'X-Api-Key': '9xPjrDWw0/aH+SruJ0tRJw==24YxIRpIMy6xeVRc',
            'Content-Type': 'application/json'
        },
    })
    //Requests a response from the server
    .then(function(resp){
        //If the response status is not an OK code, an error is thrown and caught at the end of the response chain
        if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`)
        }
        //Gets the response in the form of json data
        return resp.json()
    })
    //Gets the data we return from our first then
    .then(function(data){
        //Log the data to be able to traverse
        console.log(data)
        //Gets the element where the quote will be appended
        var quotePlacement = document.getElementById('quote-placement')
        //Gets the area where the quote author will be appended
        var quoteAuthorPlacement = document.getElementById('quote-author')
        //Gets the author info from our returned json data
        var author = data[0].author
        //Gets the quote info from our returned json data
        var quote = data[0].quote
        //If the quote length returned is less than 150 characters then we append the quote
        if(quote.length < 160) {
            //Appends the random quote to the html
            quotePlacement.textContent = '"' + quote + '"'
            //Appends the quotes author to the html
            quoteAuthorPlacement.textContent = "-" + author
        }
        //Otherwise we recursively call displayQuote so that we can get a quote that is less than 150 characters
        else {
            displayQuote()
        }
    })
    //Will catch our above error if the response is not OK
    .catch (function(err){
        console.error(err, "Could not fetch data")
    })
 
}