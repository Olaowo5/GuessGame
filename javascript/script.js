const inputs = document.querySelector(".inputs"),
resetBtn = document.querySelector(".reset-btn"),
hint = document.querySelector(".hint span"),
guessLeft =document.querySelector(".guess-left span");
wrongLetter = document.querySelector(".wrong-letter span"),
typing = document.querySelector(".typing-input");
let word, maxGuesses, corrects=[], incorrects =[];

function randomWord()
{
    //pick random word
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    //
     word = ranObj.word; //get the word
    hint.innerText = ranObj.hint; //get the hint

    maxGuesses = word.length+1; //maximum number of guesses
    corrects =[]; incorrects = []; //reset
    //console.log(word);
    let tml ="";
    for(let l =0; l<word.length;l++)
    {
        tml+= `<input type ="text" disabled>`;

    }
    guessLeft.innerText = maxGuesses;
    inputs.innerHTML = tml;
    wrongLetter.innerText = incorrects;

}
randomWord();
function initGame(e)
{
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`)
    && !corrects.includes(key))
    {
        //check input
        if(word.includes(key))
        {
            //check if correct letter is found
            for (let ip= 0; ip < word.length; ip++) {
                
                if(word[ip]=== key)
                {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[ip].value = key
                }
            }
        }
        else{
            //letter not found
            maxGuesses--; //decrement maxguesses by 1
            incorrects.push(` ${key}`);
            guessLeft.innerText = maxGuesses;
        }
        wrongLetter.innerText = incorrects;
    }
   
    typing.value = "";

  setTimeout(()=>{
    if(corrects.length === word.length)
    {
        //player has won
        alert(`Congrats! You found the word ${word.toUpperCase()}`);
        randomWord(); //now to reset the game
    }
    else if(maxGuesses < 1)
    {
        //user couldnt found all letters
        alert("Game over! You dont have remaining guesses left");
        for (let ip= 0; ip < word.length; ip++) {
                
            //showing matched leeter in the input value
            inputs.querySelectorAll("input")[ip].value = word[ip];
            
        }
    }
  });
}
resetBtn.addEventListener("click",randomWord);
typing.addEventListener("input", initGame);
inputs.addEventListener("click", ()=>typing.focus());
document.addEventListener("keydown",()=>typing.focus());