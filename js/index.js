 let input = document.querySelector(".input");
 let submit = document.querySelector(".add");
 let tasksDiV = document.querySelector(".tasks");

let arrayOfTasks =[];


if(localStorage.getItem("tasks")){

    arrayOfTasks=JSON.parse(localStorage.getItem("tasks"));
}

getDtataFromLocalStorage();

 submit.onclick=function() {
         if (input.value !== "") {
             addTaskToArray(input.value);
             input.value = "";
         }
     };



     tasksDiV.addEventListener("click",function(e){


        if(e.target.classList.contains("del")){ 
          
            deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
            e.target.parentElement.remove();

       
        }
        if(e.target.classList.contains("task")){
            toggleStatus(e.target.getAttribute("data-id"))
            e.target.classList.toggle("done")
        }
     })

   function   addTaskToArray(taskText){

     const task  = {
         id:Date.now(),
         title:taskText,
         complated:false
     }
     arrayOfTasks.push(task);
     addElementsToPageForm(arrayOfTasks);
     addDataToLocalStorageFrom(arrayOfTasks);
 }

 function addElementsToPageForm (arrayOfTasks){
    tasksDiV.innerHTML="";

    arrayOfTasks.forEach(task => {
        

        let div = document.createElement("div");
        div.className="task";
        if(task.complated){
            div.className ="task done";
        }
        div.setAttribute("data-id",task.id);
        
        div.appendChild(document.createTextNode(task.title));
        let span = document.createElement("span");
        span.className="del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        tasksDiV.appendChild(div);
    });
 }


 function addDataToLocalStorageFrom(arrayOfTasks){

    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks))
 }

 function getDtataFromLocalStorage(){
   let data =  window.localStorage.getItem("tasks")
     if (data){
         let tasks = JSON.parse(data)
     
     addElementsToPageForm(tasks);}
 }




 function deleteTaskWith(taskId){

arrayOfTasks = arrayOfTasks.filter(function(ele){

  return ele.id !=taskId;
})
addDataToLocalStorageFrom(arrayOfTasks);

 }

 function toggleStatus(taskId){
     for(let i=0; i<arrayOfTasks.length ;i++){
         if(arrayOfTasks[i].id == taskId){
             arrayOfTasks[i].complated ==false ?arrayOfTasks[i].complated=true : arrayOfTasks[i].complated = false;
         }

     }
     addDataToLocalStorageFrom(arrayOfTasks);
 }