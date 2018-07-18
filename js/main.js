`use strict`;

let submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", (e) => {
    e.preventDefault();


    // Gather the users input for a request celebrity
    let userRequestQuery = () => {
        let userInput = document.querySelector("#user-input").value;
        return userInput;
    }
        

    testUrl = `https://api.giphy.com/v1/gifs/search?api_key=f5Ta7EWUg2aEG510IWtL681MvgHXoa1v&q=${userRequestQuery()}&limit=5&offset=0&rating=G&lang=en`
   
    // Code source to grap data from the json and display it in the DOM
    let updateDisplay = (response) => {
        let giphyInputs = document.querySelector(".giphy-inputs");
        for (let i = 0; i < response.data.length; i++) {
            let cardDiv = document.createElement("div");
            cardDiv.className = "card w-100";
            //cardDiv.setAttribute = ("width", "18rem");
            let cardImage = document.createElement("img");
            cardImage.setAttribute("src", response.data[i].images.fixed_height.url)
            cardImage.className = "card-img-top";
            cardImage.setAttribute("alt", `animated photo of ${userRequestQuery()}`)
            let cardCaptionDiv = document.createElement("div");
            cardCaptionDiv.className = "card-body";
            let paragraph = document.createElement("p");
            paragraph.className = "card-text";
            paragraph.textContent = `${response.data[i].title}`

            cardCaptionDiv.appendChild(paragraph);
            cardDiv.appendChild(cardImage);
            cardDiv.appendChild(cardCaptionDiv);

            giphyInputs.appendChild(cardDiv);

        }

    }
    // This function creates a clear button to reset the application
    let createClearButton = () => {
        let clearButton = document.createElement("button");
        clearButton.setAttribute("type", "submit");
        clearButton.className = "btn btn-warning clear-all";
        clearButton.textContent = "Reset fields";
        document.querySelector("form").insertBefore(clearButton, document.querySelector("#submit-button").nextSibling);
    }



    // This function simply causes the sumbit button to be disabled
    let disableQueryButton = () => {
        let myQueryButton = document.querySelector("#submit-button");
        myQueryButton.disabled = true;
    };
    
    
    // This function will reinstate original button and it's functionality and delete reset button
    let reinstateOriginalButton = () => {
        let myQueryButton = document.querySelector("#submit-button");
        myQueryButton.disabled = false;

        // now let's delete the reset button from the dom
        let clearButton = document.querySelector(".clear-all");
        let containingBody = clearButton.parentNode;
        containingBody.removeChild(clearButton);


    }


    // This function clears all content and resets the form
    let resetPage = () => {
        let clearButton = document.querySelector(".clear-all");
        clearButton.addEventListener("click", (e) => {
            e.preventDefault();
            let dynamicContentArea = document.querySelector(".giphy-inputs");
            dynamicContentArea.innerHTML = "";
            let inputField = document.querySelector("form");
            inputField.reset();
            let queryFeedback = document.querySelector("#query-feedback");
            queryFeedback.textContent = "Please enter the name of your favorite celebrity.";
            reinstateOriginalButton();

            
        })
    }
    
    // In below fetch call i changed the query feed back in it 
    // i then updated the dynamic section fo the page 
    // i then created and set into motion the clearbutton to reset the app 
    // I then disabled that button so that no more querries would flood the page 
    // Finally i reset the app without a hard reload so that user may continue searching for GIFS



    fetch(testUrl)
    .then((res) => {
        return res.json();
    })
    .then((myJson) => {
        console.log(myJson);
        let queryFeedback = document.querySelector("#query-feedback");
        queryFeedback.textContent = ((myJson.meta.status === 200) && (myJson.data.length !== 0)) ? `Enjoy your Giphyies of ${userRequestQuery().charAt(0).toUpperCase() + userRequestQuery().substr(1)}!` : `Sorry please try a different search`;
        updateDisplay(myJson);
        createClearButton();
        disableQueryButton();
        resetPage();
    });
})


    // This code below to be used for insertafter in future projects :
    //  parentDiv.insertBefore(nodeToInsert, nodeToInsertAfter.nextSibling);