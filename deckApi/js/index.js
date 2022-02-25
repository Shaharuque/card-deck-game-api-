//for better error handling use it here to access it globally
//use it to display cards
const showCard=document.getElementById('show-cards')

//use it to display single card details
const singleCardDetails=document.getElementById('single-card')


//while search btn clicked (btn click event handler)
let searchDeck=()=>{
    const noOfDeck=document.getElementById("input-value")
    const input=parseInt(noOfDeck.value)   //float number will also be converted to Int

    const errorMassege=document.getElementById('error-massege')
    //error-massege innerText initially hide thakbey always
    errorMassege.innerText=''
    //error handling
    if(isNaN(input) || input==''){
        errorMassege.innerText='Please put a Number value....!'
        noOfDeck.value=""
        //removing previous results
        showCard.innerHTML=""
        singleCardDetails.innerHTML=""
    }
    //error handling
    else if(input<=0){
        errorMassege.innerText='Please put a positive number value...!'
        noOfDeck.value=""
        //removing previous results
        showCard.innerHTML=""
        singleCardDetails.innerHTML=""
    }
    //error handling
    //as deck only 52 card thakey so 52 ar opor input diley nicher error show korbey
    else if(input>52){
        errorMassege.innerText=`Not enough cards remaining to draw ${input} additional!`
        noOfDeck.value=""
        //removing previous results
        showCard.innerHTML=""
        singleCardDetails.innerHTML=""
    }

    //getting positive number value and fetch data
    else{
        //remove previous single card details when hit search btn again
        singleCardDetails.innerHTML=""
        //remove input field value 
        noOfDeck.value=""
        const url=`https://deckofcardsapi.com/api/deck/new/draw/?count=${input}`
        // console.log(url)
        fetch(url)
        .then(res=>res.json())
        .then(data=>displaycards(data))         //object of array will be sent as parameter to displaycards function
    }
}

//display all cards while search btn clicked
let displaycards=(data)=>{

    //removing previous search result/deck cards
    showCard.innerHTML=""

    // console.log(data)
    const cards=data.cards      //array of object will be stored into cards
    cards.forEach(card=>{
        console.log(card)

        //creating div element
        const div=document.createElement('div')
        div.classList.add('col')
        
        div.innerHTML=`
        <div class="card h-100 custom-color p-3 ">
        <div class="d-flex justify-content-center">
        <img src="${card.image}" class="card-img-top w-50" alt="...">
        </div>
        <div class="card-body ">
            <h5 class="card-title text-center">${card.suit}</h5>
            <p class="card-text text-center">${card.value}</p>
            <div class="d-flex justify-content-center">
                <button onclick="cardDetails('${card.code}')" class="card-text text-center custom-button">More Details</button>
            </div>
        </div>
        </div>`;
        showCard.appendChild(div)
    })
}

//showing single card details while clicking more details btn
let cardDetails=(cardCode)=>{
    //removing previous card details
    singleCardDetails.innerHTML=""

    // console.log(cardCode)
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
    .then(res=>res.json())
    .then(data=>{
        cardsPool=data.cards       //52 cards array of object stored in cardsPool
        const singleCard=cardsPool.find(card=>card.code===cardCode)  //find returns single result whice fullfills condition
        // console.log(singleCard)

        //showing singleCard details
        const div=document.createElement('div')
        div.classList.add('col')
        div.innerHTML=`
        <div class="d-flex justify-content-center">
        <img class="customBorder" src="${singleCard.image}"  alt="...">
        </div>
        <div class="card-body ">
            <h5 class="card-title text-center cardTextStyle">${singleCard.suit}</h5>
            <p class="card-text text-center cardTextStyle">${singleCard.value}</p>
        </div>
        `;
        singleCardDetails.appendChild(div)
    })
}