  // Base URL for the book API obtained from google 
  var apiBaseURL = "https://www.googleapis.com/books/v1/volumes?q=";

  // API key to access the Google Book API
  var apiKey = "AIzaSyCcxgEUgvSu8RkuT8vls4mBHU95bbQTI1A";
  
  // The form where users input their search query, in this case the book name
  var searchForm = document.getElementById("search-form");
  var userInput = document.getElementById("book-input-field");
  
  // Functions used to submit the input or event
  searchForm.addEventListener("submit", function (e) {
    var inputVal = userInput.value;
    // Prevent the default form submission action when the form is submitted 
    e.preventDefault();
    // Update the localStorage with the new search term before performing the search
    localStorage.setItem('user-input', JSON.stringify(inputVal));
    // Obtains the user input from the input field and call the 'performSearch' fucntion with the user's input
    performSearch(inputVal);
  });
  
  // This main function is used to handle searches by contructing the URL needed to make the API request
  function performSearch(input) {
      // Uses the user input to contructs the full URL for the API request
      var fullUrl = apiBaseURL + encodeURIComponent(input);
      if (apiKey) {
        fullUrl += "&key=" + apiKey;
      }
      // Creating the response for the HTTP, makes the HTTP create a request to the URL
      fetch(fullUrl)
      // Making sure the HTTP response work and block potential errors
        .then(function (response) {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          // If the HTTP response is successfull, it will translate the responds into javascript 
          return response.json();
        })
        // Checks the search data that returned if it is valid and contains the result
        .then(function (data) {
          if (!data || !data.items) {
            throw new Error("No data found");
          }
          // Storing all the data from the user input to local storage 
          localStorage.setItem("books", JSON.stringify(data.items));
          // Location of the window that will display the result, since the navabr is located in the cards.html
          window.location.href = "cards.html";
        })
        // This function handles any error that could occur during the fetch
        .catch(function (error) {
          console.error(error, "Could not fetch data");
        });
    }  
    
var searchForm = document.getElementById("book-input-field");
searchForm.classList.add("black-text");
//Gets our favorites books from local storage
var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//Gets our read status from local storage as true or false
var readStatus = JSON.parse(localStorage.getItem("readStatus")) || {};
console.log(favorites);
//Waits for dom content to load before running
document.addEventListener("DOMContentLoaded", function () {
  //Gets our card container to append favorite cards to
  var cardContainer = document.getElementById("card-container");
  //Creates a varible for cardsHTML and gives it an empty string
  var cardsHTML = "";
  //Iterates through our favorite cards
  favorites.forEach(function (book, index) {
    //Gets the title for each of the books
    var bookTitle = book.volumeInfo.title;
    //If theres no title to be found it shows this insead of undefined
    if (!bookTitle) {
      console.log("couldnt find book title on card " + index);
      bookTitle = "No Found Title.";
    }
    //Gets the description for each of the books
    var bookDescription = book.volumeInfo.description;
    //If there is no description it shows this insead of undefined
    if (!bookDescription) {
      console.log("couldnt find book desription on card " + index);
      bookDescription = "No Description Found.";
    }
    //Gets the author for each of the books
    var bookAuthor = book.volumeInfo.authors;
    ///If there is no author it shows this insead of undefined
    if (!bookAuthor) {
      console.log("couldnt find book author on card " + index);
      bookAuthor = "No Known Author.";
    }
    //Gets the cover art for each book
    var bookThumbnail =
      book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;
    //If there is no thumbnail it shows this insead of the stock no img
    if (!bookThumbnail) {
      console.log("couldnt find book thumbnail on card " + index);
      bookThumbnail = "";
    }
    //Replaces the thumbnails url from http to https
    else {
      bookThumbnail = bookThumbnail.replace(/^http:/, "https:");
    }
    // Determine if the book is marked as read
    var isRead = readStatus[index] || false;
    //Sets the dynamic Html for our cards
    cardsHTML += `
        <div class="row">
            <div class="col s12 m12">
                <div class="card-panel blue-grey darken-3 z-depth-5">
                    <div class="switch center">
                        <label class>
                            To Read
                            <input type="checkbox" ${
                              isRead ? "checked" : ""
                            } data-index="${index}">
                            <span class="lever"></span>
                            Read
                        </label>
                    </div>
                    <img src="${bookThumbnail}">
                    <a class="btn-floating btn-medium waves-effect waves-light blue-grey darken-1 right library" data-index ="${index}">
                        <i class="material-icons">clear</i>
                    </a>
                    <span class="black-text">
                        <h3 class="cardTitle">${bookTitle}</h3> 
                        <h5 class="authorCard">-${bookAuthor}</h5>
                        <p>${bookDescription}</p>
                    </span>
                </div>
            </div>
        </div>

        `;

    //Appends the generated cards to the cards container
    cardContainer.innerHTML = cardsHTML;
  });
  var noCardsHTML = document.getElementById("oops");
  if (favorites.length === 0) {
    noCardsHTML.style.display = "block";
  }
  //Selects all our buttons on each card
  document.querySelectorAll(".library").forEach(function (button) {
    //Adds a click listener to each button
    button.addEventListener("click", function (e) {
      //Gets the index number of the button from the data-index we set in the html above
      var index = parseInt(e.currentTarget.getAttribute("data-index"));
      console.log(index);
      //Removes indexed card from favorites list
      favorites.splice(index, 1);
      //Saves new list to local storage
      localStorage.setItem("favorites", JSON.stringify(favorites));
      //Live reloads to show card has been deleted
      location.reload();
    });
  });
});
          
        //Appends the generated cards to the cards container
        cardContainer.innerHTML = cardsHTML
   
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
document
  .querySelectorAll('.switch input[type="checkbox"]')
  .forEach(function (toggle) {
    //Adds a change listener to each toggle switch
    toggle.addEventListener("change", function (e) {
      //Gets the index number of the toggle from the data-index we set in the HTML above
      var index = parseInt(e.currentTarget.getAttribute("data-index"));
      //Updates the read status in local storage
      readStatus[index] = e.currentTarget.checked;
      localStorage.setItem("readStatus", JSON.stringify(readStatus));
    });
  });

 