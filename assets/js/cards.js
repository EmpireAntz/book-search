
var searchForm= document.getElementById('book-input-field')
searchForm.classList.add('black-text')

//Variable books will hold data we get from what we stored in local storage in our index.js
var books = JSON.parse(localStorage.getItem('books'))
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
        //Builds the card structure for each book. this should be updated with materailize classes to be cards
        cardsHTML += `
        <div class="row">
            <div class="col s12 m12">
                <div class="card-panel blue-grey darken-3">
                    <img src="${bookThumbnail}">
                    <a class="btn-floating btn-medium waves-effect waves-light blue-grey darken-1 right library" data-id="${index}"><i class="material-icons">favorite_border</i></a>
                    <span class="black-text">
                        <h3>${bookTitle}</h3>
                        <h5>-${bookAuthor}</h5>
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
            addBookToFavorites(bookID)
    
        })
    })
    //The add to favorites function will take in the index number we set the book ID as
    function addBookToFavorites (bookID) {
        console.log(books)
        //Varible for book by the array placement number we pass in 
        var book = books[bookID]
        console.log(book)
        //Gets our favorite books or an empty array
        var favorites = JSON.parse(localStorage.getItem('favorites')) || []
        //Adds the book by its array number
        favorites.push(book)
        //Sets to current book into local storage to retrive from favorites page
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }

})

var gBooksURL = "https://www.googleapis.com/books/v1/volumes?q=";
var gBooksAPIKey = "AIzaSyAB-DMWo1SEDPqiD8Ihs-wgBnfsUTn9DRo";

var cardsSearchForm = document.getElementById('search-form');
var cardsUserInput = document.getElementById('book-input-field'); 

cardsSearchForm.addEventListener('submit', function (e) {
    var inputVal = cardsUserInput.value;
    e.preventDefault();
    searchBooks(inputVal);
});

function searchBooks(input) {
    var fullUrl = gBooksURL + input + "&key=" + gBooksAPIKey;
    
    fetch(fullUrl)
    .then(function(resp) {
        if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
        }
        return resp.json();
    })
    .then(function(data) {
        if (data === undefined || data.items === undefined) {
            throw new Error('Data is undefined');
        }
        localStorage.setItem('books', JSON.stringify(data.items));
        window.location.href = "cards.html";
    })
    .catch(function(err) {
        console.error(err, "Could not fetch data");
    });
}

