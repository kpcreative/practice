let todo = []; // Initialize an empty array for tasks

// Read from local storage if it exists
let storedTodos = localStorage.getItem('todo');
if (storedTodos !== null) { // Check if localStorage has a value
    todo = JSON.parse(storedTodos); // Parse the JSON string back to an array
    display(); // Display the existing todos
}


//or
//        let todo = JSON.parse(localStorage.getItem('todo')) || []; // Retrieve existing todos or initialize an empty array



function extracttextanddate(){
    let t=document.querySelector('#todo').value;
    let d=document.querySelector('#date').value;
    todo.push({
        item:t,
        duedate:d,

    });
 
  


    document.querySelector('#todo').value='';   //ye isliye kiya taki add click krne pe phir empty v ho jaye ye
    document.querySelector('#date').value='';
    display();

}
function display()
{
    //yha hame jo array me hai na vo display krna hai
    localStorage.setItem('todo',JSON.stringify(todo));
   let pp= document.querySelector('.todo');//suru me empty phir
   let newhtml='';
    for(let i=0;i<todo.length;i++)
{
    let todo_task=todo[i].item;
    let todo_date=todo[i].duedate;
   newhtml+=
   `

   <span> ${todo_task} </span>
   <span> ${todo_date} </span>
   <button id="dlt-bttn" onclick="
   todo.splice(${i},1);
   display()   
   "> Delete </button>

   
   
   
   
   `
   //delete krke display v krna hai na isliye
}

pp.innerHTML=newhtml;
}