const RANDOM_QUOTE_API_URL="https://api.quotable.io/random";

const quoteDisplayElement=document.getElementById('quoteDisplay');
const quoteInputElement=document.getElementById('quoteInput');
const timer=document.getElementById('timer');
quoteInput.addEventListener('input',()=>{
    var arrayQuote=quoteDisplayElement.querySelectorAll('span');
   var arrayInput= quoteInputElement.value.split('');
   let correct=true;
   arrayQuote.forEach((characterSpan,index)=>{
       let inputChar=arrayInput[index];
       
       if(inputChar==characterSpan.innerHTML){
        characterSpan.classList.add('correct');
        characterSpan.classList.remove('incorrect');
       }
       else if(inputChar !=null) {
        characterSpan.classList.add('incorrect');
        characterSpan.classList.remove('correct');
        correct=false;
        
       }
       else{
        characterSpan.classList.remove('correct');
        characterSpan.classList.remove('incorrect');
        correct=false;
        
       }
       
   })
   if(correct){
    renderRandomQuote();
   }
   

})
function getRandomQuote(){
    
   return fetch(RANDOM_QUOTE_API_URL)
   .then(response=>response.json())
   .then(data=>data.content)
   
}

 async function renderRandomQuote(){
    const quote=await getRandomQuote();
     quoteDisplayElement.innerHTML='';
    
    quote.split('').forEach(character => {
        let characterSpan=document.createElement('span');
        characterSpan.innerHTML=character;
        quoteDisplayElement.appendChild(characterSpan);
    });
    console.log(quoteDisplayElement);
    quoteInputElement.value=null;   
    timer.innerHTML=0;
    updateTimer();
}
let startTime;
function updateTimer(){
    startTime=new Date();
    setInterval(()=>{
        timer.innerHTML= setTime();
    },1000)
}
function setTime(){
    return Math.floor((new Date() -startTime)/1000);
}
renderRandomQuote()
