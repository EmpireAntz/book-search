// This event listener will wait until the document's content has fully loaded
document.addEventListener('DOMContentLoaded', function() {
    //Variable books will hold data we get from what we stored in local storage in our index.js
    var books = JSON.parse(localStorage.getItem('books'))
    //Console will give us our array of object to traverse
    console.log(books)
    //Variable will select our card container so we can use it to append our cards
    var cardContainer = document.getElementById('card-container')
    //Clears the html in card container so theres no duplication of content
    cardContainer.innerHTML = ''
    //Creates an empty string to hold the HTML for the book cards
    var cardsHTML = ''
    //Iterates over the array of books
    books.forEach(function(book) {
        //Gets the title for each of the books
        var bookTitle = book.volumeInfo.title
        //Gets the description for each of the books
        var bookDescription = book.volumeInfo.description
        //Gets the author for each of the books
        var bookAuthor = book.volumeInfo.authors
        //Gets the cover art for each book
        var bookThumbnail = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
        //Builds the card structure for each book. this should be updated with materailize classes to be cards
        cardsHTML += `
        <div>
            <img src="${bookThumbnail}">
            <h3>${bookTitle}</h3>
            <h5>-${bookAuthor}</h5>
            <p>${bookDescription}</p>
        </div>
        `    
    })
    //Sets the HTML inside of our card container to the above cardsHTML for each book in our array
    cardContainer.innerHTML = cardsHTML

})