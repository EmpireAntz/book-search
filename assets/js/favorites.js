
var favorites = JSON.parse(localStorage.getItem('favorites'))
console.log(favorites)

document.addEventListener('DOMContentLoaded', function() {
    var cardContainer = document.getElementById('card-container')
    var cardsHTML = ''

    favorites.forEach(function(book) {
        var bookTitle = book.volumeInfo.title
        //Gets the description for each of the books
        var bookDescription = book.volumeInfo.description
        //Gets the author for each of the books
        var bookAuthor = book.volumeInfo.authors
        //Gets the cover art for each book
        var bookThumbnail = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail

        cardsHTML += `
        <div class="row">
            <div class="col s12 m12">
                <div class="card-panel teal lighten-1">
                    <img src="${bookThumbnail}">
                    <a class="btn-floating btn-medium waves-effect waves-light right library"><i class="material-icons">clear</i></a>
                    <span class="black-text">
                        <h3>${bookTitle}</h3>
                        <h5>-${bookAuthor}</h5>
                        <p>${bookDescription}</p>
                    </span>
                </div>
            </div>
        </div>

        `    
        cardContainer.innerHTML = cardsHTML
    })
    
})