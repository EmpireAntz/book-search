//Gets our favorites books from local storage
var favorites = JSON.parse(localStorage.getItem('favorites')) || []
//Gets our read status from local storage as true or false
var readStatus = JSON.parse(localStorage.getItem('readStatus')) || {}
console.log(favorites)
//Waits for dom content to load before running
document.addEventListener('DOMContentLoaded', function() {
    //Gets our card container to append favorite cards to
    var cardContainer = document.getElementById('card-container')
    //Creates a varible for cardsHTML and gives it an empty string
    var cardsHTML = ''
    //Iterates through our favorite cards
    favorites.forEach(function(book, index) {
        //Gets the title for each of the books
        var bookTitle = book.volumeInfo.title
        //Gets the description for each of the books
        var bookDescription = book.volumeInfo.description
        //Gets the author for each of the books
        var bookAuthor = book.volumeInfo.authors
        //Gets the cover art for each book
        var bookThumbnail = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
        // Determine if the book is marked as read
        var isRead = readStatus[index] || false
        //Sets the dynamic Html for our cards 
        cardsHTML += `
        <div class="row">
            <div class="col s12 m12">
                <div class="card-panel blue-grey darken-3 z-depth-5">
                    <div class="switch center">
                        <label class>
                            To Read
                            <input type="checkbox" ${isRead ? 'checked' : ''} data-index="${index}">
                            <span class="lever"></span>
                            Read
                        </label>
                    </div>
                    <img src="${bookThumbnail}">
                    <a class="btn-floating btn-medium waves-effect waves-light blue-grey darken-1 right library" data-index ="${index}">
                        <i class="material-icons">clear</i>
                    </a>
                    <span class="black-text">
                        <h3>${bookTitle}</h3>
                        <h5>-${bookAuthor}</h5>
                        <p>${bookDescription}</p>
                    </span>
                </div>
            </div>
        </div>

        `    
        //Appends the generated cards to the cards container
        cardContainer.innerHTML = cardsHTML
    })
    var noCardsHTML = document.getElementById('oops')
    if (favorites.length === 0) {
        noCardsHTML.style.display = "block"
    }
    //Selects all our buttons on each card
    document.querySelectorAll('.library').forEach(function(button) {
        //Adds a click listener to each button 
        button.addEventListener('click', function(e) {
            //Gets the index number of the button from the data-index we set in the html above
            var index = parseInt(e.currentTarget.getAttribute('data-index'))
            console.log(index)
            //Removes indexed card from favorites list 
            favorites.splice(index, 1)
            //Saves new list to local storage
            localStorage.setItem('favorites', JSON.stringify(favorites))
            //Live reloads to show card has been deleted
            location.reload()
        })
    })
        

    // Selects all toggle switches on each card and iterates over them 
    document.querySelectorAll('.switch input[type="checkbox"]').forEach(function(toggle) {
        //Adds a change listener to each toggle switch
        toggle.addEventListener('change', function(e) {
            //Gets the index number of the toggle from the data-index we set in the HTML above
            var index = parseInt(e.currentTarget.getAttribute('data-index'))
            //Updates the read status in local storage
            readStatus[index] = e.currentTarget.checked
            localStorage.setItem('readStatus', JSON.stringify(readStatus))
        })
    })
})