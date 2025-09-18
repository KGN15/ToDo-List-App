// ============================
// সব DOM element select করা
// ============================
const usearInput = document.getElementById("usearInput");
const todoBTN = document.getElementById("todoBTN");
const todoList = document.getElementById("todoList");
const caunter = document.getElementById("caunter");

// সব টাস্ক রাখার জন্য Array
const tasksTO = [];

// ============================
// টাস্ক add করার ফাংশন
// ============================
function allTasks() {
    // ইউজার ইনপুট নেওয়া
    let tasksText = usearInput.value.trim();

    // খালি ইনপুট হলে alert দেবে এবং কাজ বন্ধ করবে
    if (tasksText === "") {
        alert("Please Enter a Task");
        return;
    }

    // প্রতিটা টাস্ক হবে object আকারে
    let task = {
        text: tasksText,
        id: Date.now(),     // unique id (সময়ের সাথে ইউনিক হবে)
        completed: false,   // ডিফল্ট false
    };

    // নতুন টাস্ক array তে push করা
    tasksTO.push(task);

    // ইনপুট বক্স খালি করে দেওয়া
    usearInput.value = "";

    // সব টাস্ক আবার দেখানো
    displayTasks();
}

// বাটনে click করলে টাস্ক add হবে
todoBTN.addEventListener("click", allTasks);

// ============================
// টাস্ক দেখানোর ফাংশন
// ============================
function displayTasks() {
    todoList.innerHTML = "";

    if (tasksTO.length === 0) {
        todoList.innerHTML = "<p>No More Tasks. Please add some!</p>";
    }

    tasksTO.forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.className = "fromall";

        // টাস্ক টেক্সটের span
        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        // যদি টাস্ক complete হয় তাহলে special CSS class দেবে
        if (task.completed) {
            taskText.classList.add("completed-task");
        }

        // বাটন কন্টেইনার
        const btnDiv = document.createElement("div");
        btnDiv.className = "input";

        // ✅ বাটন
        const completeBtn = document.createElement("button");
        completeBtn.className = "btn";
        completeBtn.textContent = "✅";
        completeBtn.addEventListener("click", () => {
            task.completed = !task.completed;
            displayTasks();
        });

        // ❌ বাটন
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn";
        deleteBtn.textContent = "❌";
        deleteBtn.addEventListener("click", () => {
            const index = tasksTO.findIndex((t) => t.id === task.id);
            tasksTO.splice(index, 1);
            displayTasks();
        });

        // সব element বসানো
        btnDiv.appendChild(completeBtn);
        btnDiv.appendChild(deleteBtn);
        taskElement.appendChild(taskText);
        taskElement.appendChild(btnDiv);
        todoList.appendChild(taskElement);
    });

    // কাউন্টার আপডেট
    let total = tasksTO.length;
    let completed = tasksTO.filter((t) => t.completed).length;
    caunter.textContent = `Total Tasks: ${total} || Completed Tasks: ${completed}`;
}

// প্রথমে displayTasks কল করলে default মেসেজ দেখাবে
displayTasks();
