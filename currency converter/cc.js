const BASE_URL =
"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

  const dropdowns = document.querySelectorAll(".dropdown select");  
  //jo jo sslects hai na iske andar aa jinge 
  
  

const bttn=document.querySelector("#result");
const fromcurrency=document.querySelector(".from select");
const tocurrency=document.querySelector(".to select");
const msg=document.querySelector(".mssg");



//hma chate hai ki window jab load ho to jo by default input me hai vo aa jaye to ham uspe ek event listner de skte hain
window.addEventListener("load",()=>{
    updatemssg();
})






  for(let select of dropdowns) {    //to jitna select hai n usme ye option add krna hai waise bola hai ye
    for(currCode in countryList)     
    {
        let newoption=document.createElement("option");
        newoption.innerText=currCode;
        newoption.value=currCode;
        //ham chahte hai ki jab v jaye to start me from usd to inr dikhaye
        if(select.name==="from" && currCode==="USD")
        {
            newoption.selected="selected";
            let from=document.querySelector("#from-change");
            let code=countryList[currCode];
           from.src=`https://flagsapi.com/${code}/flat/64.png`;

        }
        if(select.name==="to" && currCode==="INR")
        {
            //image wale ko v hamne yha dynamically hi default rkha ahi ki jo v hga phle uska image v dynamically hi ana chaiye
            newoption.selected="selected";
            let to=document.querySelector("#to-change");
            let code=countryList[currCode];
            to.src=`https://flagsapi.com/${code}/flat/64.png`;
        }
        select.append(newoption);


       
    }
     //ham chahte hai ki jab v hmara select change ho then flag v change hina chiaye
     //for loop ke andar hai iska matlab ye nhi ki ye for loop bar bar chlega it is like
     //jise onclick hota tha na to waise hi in select total 2 select hai to dono select me ye evnt add kr rha hai
     //to jab v change hga to updateflag call hga

     select.addEventListener("change",(event)=>{
        updateflag(event.target);
                })
  }

//Add an event listener to the <select> element for the change event.

const updateflag=(element)=>{
    console.log(element);
  
let countrycode=element.value;
let code=countryList[countrycode];
if(element.name==="from"){
let from=document.querySelector("#from-change");
from.src=`https://flagsapi.com/${code}/flat/64.png`;
}
else{
let to=document.querySelector("#to-change");
to.src=`https://flagsapi.com/${code}/flat/64.png`;
}
}



bttn.addEventListener("click",async (evt)=>{
    evt.preventDefault();//chuki form me tha ye to jab v button pe click krte the to form me hota hai ki ye automatic submit jisa kam krta hai
    //to jab jab button pe click kroge to refresh hga
    //to vo sab na ho isliye ham ye kiye hain
  
    updatemssg();
})

const updatemssg=async()=>{
    let amt=document.querySelector("#amnt");
    let amtval=amt.value;

  if(amtval===""||amtval<1)
  {
    amt.value=1;
    amtval=1;
  }

  const url=`${BASE_URL}/${fromcurrency.value.toLowerCase()}.json`;
  //ab fetch kro ise
  let response=await fetch(url); //par await tab tak kam nhi krega jab tak async na ho fucntion to upar jo event wala fucntion hai usko async bna diya hamne
  //ab is response ko v json me badlna hga
  let data=await response.json();
  //console.log(data);
  let rate = data[fromcurrency.value.toLowerCase()][tocurrency.value.toLowerCase()]; //kyuki ab na usd jo aya let vo v ek array hai usme se jo inr hga jo ki to wale me hai uska rate nikal kar do
  let finalval=amtval*rate;
  msg.innerText = `${amtval} ${fromcurrency.value} = ${finalval} ${tocurrency.value}`;
}



