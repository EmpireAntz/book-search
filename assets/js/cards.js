
var searchForm= document.getElementById('book-input-field')
searchForm.classList.add('black-text')

//Variable books will hold data we get from what we stored in local storage in our index.js
var books = JSON.parse(localStorage.getItem('books'))
//Selects the area in the html for us to append the showing results for and then userinput
var userSearchResults = document.querySelector('.search-display')
//Gets the userinput we saved from our search
var storedInput = JSON.parse(localStorage.getItem('user-input'))
//Appends the userinput onto the page in the following string
userSearchResults.textContent = "Showing results for " + '"'+ storedInput + '"'
// This event listener will wait until the document's content has fully loaded
document.addEventListener('DOMContentLoaded', function() {
    //Console will give us our array of object to traverse
    console.log(books)
    //Variable will select our card container so we can use it to append our cards
    var cardContainer = document.getElementById('card-container')
    //Clears the html in card container so theres no duplication of content
    cardContainer.innerHTML = ''
    //Creates an empty string to hold the HTML for the book cards
    var cardsHTML = ''
    //Gets our favorite books from local storage or an empty array
    var favorites = JSON.parse(localStorage.getItem('favorites')) || []
    //Iterates over the array of books
    books.forEach(function(book, index) {
        //Gets the title for each of the books
        var bookTitle = book.volumeInfo.title
        //If theres no title to be found it shows this insead of undefined
        if (!bookTitle) {
            console.log("couldnt find book title on card " + index)
            bookTitle = "No Found Title."
        }
        //Gets the description for each of the books
        var bookDescription = book.volumeInfo.description
        //If there is no description it shows this insead of undefined
        if (!bookDescription) {
            console.log("couldnt find book desription on card " + index)
            bookDescription = "No Description Found."
        }
        //Gets the author for each of the books
        var bookAuthor = book.volumeInfo.authors
        ///If there is no author it shows this insead of undefined
        if (!bookAuthor) {
            console.log("couldnt find book author on card " + index)
            bookAuthor = "No Known Author."
        }
        //Gets the cover art for each book
        var bookThumbnail = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
        //If there is no thumbnail it shows this insead of the stock no img 
        if (!bookThumbnail) {
            console.log("couldnt find book thumbnail on card " + index)
            bookThumbnail = ''
        }
        //Replaces the thumbnails url from http to https
        else {
            bookThumbnail = bookThumbnail.replace(/^http:/, 'https:')
        }
           // Checks if the book is already in favorites
           var isBookInFavorites = favorites.some(function(favBook){
            return favBook.id === book.id
        })
         //Sets the icon to full or outlined heart 
         var favoriteIcon = isBookInFavorites ? "favorite" : "favorite_border"

        //Builds the card structure for each book. this should be updated with materailize classes to be cards
        cardsHTML += `
        <div class="row">
            <div class="col s12 m12">
                <div class="card-panel blue-grey darken-3 z-depth-5">
                    <img src="${bookThumbnail}">
                    <a class="btn-floating btn-medium waves-effect waves-light blue-grey darken-1 right library" data-id="${index}">
                        <i class="material-icons">${favoriteIcon}</i>
                    </a>
                    <span class="black-text">
                        <h3 class="cardTitle">${bookTitle}</h3>
                        <h5 class="authorCard">-${bookAuthor}</h5>
                        <p>${bookDescription}</p>
                    </span>
                </div>
            </div>
        </div>

        `    
    })
    //Sets the HTML inside of our card container to the above cardsHTML for each book in our array
    cardContainer.innerHTML = cardsHTML
    //Variable will select all the icon buttons
    var favoriteButtons = document.querySelectorAll('.library')
    //For each of the favorite buttons we add an event listener
    favoriteButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            //ID is set above when we dynamicially update our cards, we set each card with index number as a data id
            var bookID = e.currentTarget.getAttribute('data-id')
            console.log(bookID)
            console.log('clicked')
            //Calls function to add book to favorites by the index number 
            addBookToFavorites(bookID, e)
    
        })
    })
    //The add to favorites function will take in the index number we set the book ID as and takes in an event
    function addBookToFavorites (bookID, e) {
        console.log(books)
        //Varible for book by the array placement number we pass in 
        var book = books[bookID]
        console.log(book)
        //Gets our favorite books or an empty array
        var favorites = JSON.parse(localStorage.getItem('favorites')) || []
        //Checks if the book is already in favorites based on a unique identifier
        var isBookInFavorites = favorites.some(function(favBook){
            //Returns the value of the special ID of the favbook and the ID of the favbook
            return favBook.id === book.id
        })
        //If the id check returns true then that means we already have the book in our local storage/favorites
        if(isBookInFavorites) {
            console.log('book already in favorites')
        }
        //If the book is not already in our favorites it can be added to localstorage
        else {
            //Adds the book by its array number
            favorites.push(book)
            //Sets to current book into local storage to retrive from favorites page
            localStorage.setItem('favorites', JSON.stringify(favorites))
            //Console logs what are event target is
            console.log(e.target)
            //when the event target gets clicked it sets the text content to favorite
            e.target.textContent = "favorite"
        }
    }

})
//Variable for Google Books API base URL
var gBooksURL = "https://www.googleapis.com/books/v1/volumes?q=";
//Variable for Google Books API key
var gBooksAPIKey = "AIzaSyAB-DMWo1SEDPqiD8Ihs-wgBnfsUTn9DRo";
//Selects the form element from the html
var cardsSearchForm = document.getElementById('search-form');
//Selects the text input field where the user will enter their unput
var cardsUserInput = document.getElementById('book-input-field'); 
//Adds an event listener of submit to the cards search form
cardsSearchForm.addEventListener('submit', function (e) {
    //Gets the value entered by the user in the input field at the cards html
    var inputVal = cardsUserInput.value;
    //Prevents the page from refreshing
    e.preventDefault();
     //Calls the searchBooks function with a argument of the users input value
    searchBooks(inputVal);
});
//Function to search for books using Google Books API based on user input
function searchBooks(input) {
    //Creates the full URL by concating user input and the API key to the base URL
    var fullUrl = gBooksURL + input + "&key=" + gBooksAPIKey;
     //Makes an http request to Google Books
    fetch(fullUrl)
    .then(function(resp) {
       //If the response is not an OK code a new Error will be thrown and at the end of the response chain, skipping any code between
        if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
        }
         //Returns the response in json format
        return resp.json();
    })
   //Parsed json data from the above returned promise will be stored in data
    .then(function(data) {
        if (data === undefined || data.items === undefined) {
            throw new Error('Data is undefined');
        }
       //Sets our searched data items into an array of objects in local storage for us to be able to grab by the key of'books' later
        localStorage.setItem('books', JSON.stringify(data.items));
       //When the user searches a book we are directed to the cards.html which is connected to the cards.html
        window.location.href = "cards.html";
    })
     //Catches our thrown error and logs the error in the console
    .catch(function(err) {
        console.error(err, "Could not fetch data");
    });
}

