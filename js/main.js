`use strict`;

let submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", (e) => {
    e.preventDefault();


    // Gather the users input for a request celebrity
    let userRequestQuery = () => {
        let userInput = document.querySelector("#user-input").value;
        //console.log(userInput)
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
    // This button creates a clear button to reset the application
    let createClearButton = () => {
        let clearButton = document.createElement("button");
        clearButton.setAttribute("type", "submit");
        clearButton.className = "btn btn-primary clear-all";
        clearButton.textContent = "Reset fields";
        document.querySelector("form").insertBefore(clearButton, document.querySelector("#submit-button").nextSibling);
    }

    // parentDiv.insertBefore(nodeToInsert, nodeToInsertAfter.nextSibling);

    // This function simply causes the sumbit button to be disabled
    let disableQueryButton = () => {
        let myQueryButton = document.querySelector("#submit-button");
        myQueryButton.disabled = true;
    };
    
    
    // This function will reinstate original button and it's functionality and delete reset button
    let reinstateOriginalButton = () => {
        let myQueryButton = document.querySelector("#submit-button");
        myQueryButton.disabled = false;

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
    





    fetch(testUrl)
    .then((res) => {
        return res.json();
    })
    .then((myJson) => {
        console.log(myJson);
        let queryFeedback = document.querySelector("#query-feedback");
        queryFeedback.textContent = (  (myJson.meta.status === 200) && (myJson.data.length !== 0)  ) ? `Enjoy your Giphyies of ${userRequestQuery()}!` : `Sorry please try a different search`;
        updateDisplay(myJson);
        createClearButton();
        disableQueryButton();
        resetPage();
        
       

    });

    
})