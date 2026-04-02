// call element //
let grid = document.getElementById("grid");
let container = document.getElementById("container");
let gridContent = document.getElementById("gridContent");
let form = document.getElementById("form");
let turnDisplay = document.createElement("div");
turnDisplay.className = "turn-display"
let listGrid = [];
let firstName = '';
let secendName = '';
let letterOne = '';
let letterTwo = '';
let colorOne = "#ff007f";
let colorTwo = "#00d2ff";
let currentPlayer = 0;

//*******************************/ Your Function *********************************//

// main function that colltion all function //

function takeInfoFOrmUsers() {
    inputOne();
}

// function of create input //

function createInputField(placeholderText) {
    form.innerHTML = ""; // تنظيف الفورم
    let input = document.createElement("input");
    input.placeholder = placeholderText;
    input.className = "info-input";

    let errorMsg = document.createElement("div");
    errorMsg.className = "error-message";
    errorMsg.style.display = "none";

    let submit = document.createElement("input");
    submit.type = "submit";
    submit.className = "info-submit";

    form.append(input, errorMsg, submit);

    input.showError = (text) => {
        errorMsg.textContent = text;
        errorMsg.style.display = "block";
        input.classList.add("input-error");
    };

    input.hideError = () => {
        errorMsg.style.display = "none";
        input.classList.remove("input-error");
    };

    return input;
}

// function of take name one //

function inputOne() {
    let input = createInputField("Enter User Name One"); // بنستلم الـ input هنا

    input.oninput = function () {
        let nameRx = /^[a-zA-Zأ-ي]+(\s[a-zA-Z]+)*$/;
        if (input.value.trim() === "" || nameRx.test(input.value.trim())) {
            input.hideError();
        } else {
            input.showError("خطأ: الاسم حروف !");
        }
    };

    form.onsubmit = function (e) {
        e.preventDefault();
        let nameRx = /^[a-zA-Zأ-ي]+(\s[a-zA-Z]+)*$/;
        if (input.value.trim() !== "" && nameRx.test(input.value.trim())) {
            firstName = input.value;
            getLitterOne(); // ننتقل للي بعده
        } else {
            input.showError("خطأ: الاسم حروف فقط!"); // رسالة خاصة بالاسم
        }
    };
}

// function of take letter one //

function getLitterOne() {
    let input = createInputField("Enter Your Letter 1"); // بنرسم فورم جديد

    input.oninput = function () {
        let charRx = /^[a-zA-Z]$/;
        let val = input.value.trim();
        if (val === "" || (val.length === 1 && charRx.test(val))) {
            input.hideError();
        } else {
            input.showError("خطأ: حرف واحد فقط! ");
        }
    };

    form.onsubmit = function (e) {
        e.preventDefault();
        let charRx = /^[a-zA-Z]$/;
        let val = input.value.trim();

        if (val.length === 1 && charRx.test(val)) {
            letterOne = val;
            inputTwo(); // ننتقل للي بعده
        } else {
            input.showError("خطأ: حرف واحد فقط!"); // رسالة خاصة بالحرف
        }
    };
}

// function of take name two //

function inputTwo() {
    let input = createInputField("Enter User Name Two"); // بنستلم الـ input هنا

    input.oninput = function () {
        let nameRx = /^[a-zA-Zأ-ي]+(\s[a-zA-Z]+)*$/;
        if (input.value.trim() === "" || nameRx.test(input.value.trim())) {
            input.hideError();
        } else {
            input.showError("خطأ: الاسم حروف فقط!");
        }
    };

    form.onsubmit = function (e) {
        e.preventDefault();
        let nameRx = /^[a-zA-Zأ-ي]+(\s[a-zA-Z]+)*$/;
        if (input.value.trim() !== "" && nameRx.test(input.value.trim())) {
            secendName = input.value;
            getLitterTwo(); // ننتقل للي بعده
        } else {
            input.showError("خطأ: الاسم حروف !"); // رسالة خاصة بالاسم
        }
    };
}

// function of take letter two //

function getLitterTwo() {
    let input = createInputField("Enter Your Letter 2"); // بنرسم فورم جديد

    input.oninput = function () {
        let charRx = /^[a-zA-Z]$/;
        let val = input.value.trim();
        if (val === "" || (val.length === 1 && charRx.test(val))) {
            input.hideError();
        } else {
            input.showError("خطأ: حرف واحد فقط!");
        }
    };

    form.onsubmit = function (e) {
        e.preventDefault();
        let charRx = /^[a-zA-Z]$/;
        let val = input.value.trim();

        if (val.length === 1 && charRx.test(val)) {
            letterTwo = val;
            form.style.display = "none";
            turnDisplay.textContent = `دور الاعب ${firstName}`;
            container.prepend(turnDisplay);
            currentPlayer = 1;
            creategrid();
        } else {
            input.showError("خطأ: حرف واحد فقط!"); // رسالة خاصة بالحرف
        }
    };
}

// create your grid //

function creategrid() {
    gridContent.innerHTML = '';
    grid.style.display = "block";
    for (let i = 1; i <= 9; i++) {
        let input = document.createElement("input");
        input.className = "input";
        input.value = "";
        input.id = i;
        listGrid.push(input);
        gridContent.append(input);
    }
    addGridListeners();
}

// function of check win // 

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;

        // استخدم .trim() هنا عشان تشيل أي مسافات اللاعب كتبها بالغلظ
        let valA = listGrid[a].value.trim();
        let valB = listGrid[b].value.trim();
        let valC = listGrid[c].value.trim();

        // التأكد إن المربع مش فاضي (بعد الـ trim) وإن التلاتة متساويين
        if (valA !== "" && valA === valB && valB === valC) {
            listGrid[a].classList.add("line-win");
            listGrid[b].classList.add("line-win");
            listGrid[c].classList.add("line-win");
            return [listGrid[a], listGrid[b], listGrid[c]];
        }
    }
    return false;
}

// function of drow // 

function checkDorw() {
    for (let i = 0; i < listGrid.length; i++) {
        if (listGrid[i].value === "") {
            return false;
        }
    }
    return true;
}

// function of switch players // 

function switchPlayer() {
    turnDisplay.style.display = "block";
    if (currentPlayer === 0) {
        turnDisplay.className = "turn-display";
        turnDisplay.textContent = `دور الاعب ${firstName}`;
        currentPlayer = 1;
    } else if (currentPlayer === 1) {
        turnDisplay.className = "turn-display-two";
        turnDisplay.textContent = `دور الاعب ${secendName}`;
        currentPlayer = 0;
    }
    container.prepend(turnDisplay);
}

// function of check win and drow and switch // 

function check() {
    const winningCells = checkWin();

    if (winningCells) {
        let message = document.createElement("div");
        let text = currentPlayer === 0 ? `الاعب ${secendName} فاز` : `الاعب ${firstName} فاز`;
        message.textContent = text;
        message.className = "win-message";
        container.prepend(message);
        listGrid.forEach((input) => {
            input.disabled = true;

        })
        const winColor = (currentPlayer === 0) ? colorOne : colorTwo;
        winningCells.forEach(el => {
            el.classList.add("line-win");
            el.style.backgroundColor = winColor;
        });
        return;
    }
    if (checkDorw()) {
        let message = document.createElement("div");
        message.textContent = "DROW";
        message.className = "drow-message"
        container.prepend(message);
        listGrid.forEach((input) => {
            input.disabled = true;
        })
        return
    }
    else {
        switchPlayer();
    }
}
// addEventListener to us inputs // 

function addGridListeners() {
    listGrid.forEach((input) => {
        input.addEventListener("click", function (event) {
            // تأكد إن المربع فاضي قبل ما يلعب فيه
            if (event.target.value === "") {
                if (currentPlayer === 1) {
                    event.target.value = letterOne;
                    event.target.style.color = colorOne;
                } else {
                    event.target.value = letterTwo;
                    event.target.style.color = colorTwo;
                }
                check();
            }
        });
    });
}



// start us app // 
takeInfoFOrmUsers();