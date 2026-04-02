window.onload = function() {
    createBubbles();
    const welcome = document.getElementById('welcome-msg');
    welcome.classList.add('show');
    
    setTimeout(() => {
        welcome.classList.remove('show');
    }, 5000);
};
createBubbles();
let input = document.getElementsByClassName("input")[0];
let submit = document.getElementsByClassName("add")[0];
let divTaks = document.getElementsByClassName("tasks")[0];

let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
};

getDataFromLocalStorage();

submit.onclick = function(){
    if(input.value !== "") {
        addTaskToArray(input.value);
        input.value = "";
    }
};

divTaks.addEventListener("click", (e) =>{
    if (e.target.classList.contains("del")){
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove()
    }
    if (e.target.classList.contains("task")){
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
    }
});

function  addTaskToArray(taskTest) {
    const task = {
        id: Date.now(),
        title: taskTest,
        completed:false,
    };
    arrayOfTasks.push(task);
    addElementsToPageFrom(arrayOfTasks);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
    divTaks.innerHTML = "";
    arrayOfTasks.forEach(task =>{
        let div = document.createElement("div");
        div.className = "task";
        if(task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.textContent = task.title;

        let span = document.createElement("span");
        span.className = "del";
        span.innerHTML = '<i class="fa-solid fa-trash-can"></i> حذف';
        div.append(span);
        divTaks.append(div);
});
}

function addDataToLocalStorageFrom (arrayOfTasks){
    localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
    let data = localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    };
}

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter(task => task.id != taskId) ;
    addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
    arrayOfTasks.forEach(task => {
        if (task.id == taskId){
        task.completed == false ? (task.completed = true) : (task.completed = false);
        }
    })
    addDataToLocalStorageFrom(arrayOfTasks);
}


function createBubbles() {
    const container = document.getElementById('bubbles-container');
    const bubbleCount = 100; // يمكنك زيادة العدد كما تحب

    for (let i = 0; i < bubbleCount; i++) {
        let bubble = document.createElement('span');
        bubble.className = 'bubble';

        // خصائص عشوائية لكل فقاعة
        const size = Math.random() * 40 + 10 + "px"; // حجم بين 10 و 70 بكسل
        const left = Math.random() * 100 + "%";     // مكان انطلاق عشوائي عرضياً
        const delay = Math.random() * 15 + "s";      // تأخير عشوائي للبداية
        const duration = Math.random() * 10 + 10 + "s"; // سرعة صعود عشوائية (بين 10 و 20 ثانية)

        bubble.style.width = size;
        bubble.style.height = size;
        bubble.style.left = left;
        bubble.style.animationDelay = delay;
        bubble.style.animationDuration = duration;

        // تنويع الألوان قليلاً بين الأزرق الفاتح والغامق
        const opacity = Math.random() * 0.3;
        bubble.style.opacity = opacity;

        container.appendChild(bubble);
    }
}

// استدعاء الدالة عند تحميل الصفحة
