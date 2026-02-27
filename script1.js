// ====== Sound Effects ======
const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");

// ====== Quiz Questions ======
const questions = [

    // ===== EASY LEVEL (5) =====
    {
        level: "Easy",
        question: "Who is known as the first computer programmer?",
        options: ["Ada Lovelace", "Marie Curie", "Kalpana Chawla", "Grace Hopper"],
        answer: 0
    },
    {
        level: "Easy",
        question: "Which Indian woman became the first woman Prime Minister?",
        options: ["Pratibha Patil", "Indira Gandhi", "Sarojini Naidu", "Sushma Swaraj"],
        answer: 1
    },
    {
        level: "Easy",
        question: "Which company was led by Indra Nooyi as CEO?",
        options: ["Google", "PepsiCo", "Microsoft", "Amazon"],
        answer: 1
    },
    {
        level: "Easy",
        question: "What does STEM stand for?",
        options: ["Science, Tech, Engineering, Math", "Social, Tech, English, Math", "Science, Teaching, English, Management", "System, Tech, Engineering, Media"],
        answer: 0
    },
    {
        level: "Easy",
        question: "Who was the first woman to go to space?",
        options: ["Kalpana Chawla", "Valentina Tereshkova", "Sunita Williams", "Sally Ride"],
        answer: 1
    },

    // ===== MEDIUM LEVEL (5) =====
    {
        level: "Medium",
        question: "Who founded Girls Who Code?",
        options: ["Reshma Saujani", "Sheryl Sandberg", "Whitney Wolfe", "Susan Wojcicki"],
        answer: 0
    },
    {
        level: "Medium",
        question: "Which woman won a Nobel Prize for Radioactivity research?",
        options: ["Rosalind Franklin", "Marie Curie", "Dorothy Hodgkin", "Ada Yonath"],
        answer: 1
    },
    {
        level: "Medium",
        question: "Which programming language was developed by Grace Hopper?",
        options: ["Python", "Java", "COBOL", "C++"],
        answer: 2
    },
    {
        level: "Medium",
        question: "Who was the first Indian woman to win an Olympic medal?",
        options: ["P. V. Sindhu", "Karnam Malleswari", "Mary Kom", "Saina Nehwal"],
        answer: 1
    },
    {
        level: "Medium",
        question: "Which tech company was co-founded by Susan Wojcicki?",
        options: ["YouTube", "Facebook", "Instagram", "LinkedIn"],
        answer: 0
    },

    // ===== HARD LEVEL (5) =====
    {
        level: "Hard",
        question: "Who developed the first compiler for a computer programming language?",
        options: ["Ada Lovelace", "Grace Hopper", "Hedy Lamarr", "Anita Borg"],
        answer: 1
    },
    {
        level: "Hard",
        question: "Hedy Lamarr contributed to which technology?",
        options: ["WiFi & Bluetooth", "Search Engine", "Operating System", "Microprocessor"],
        answer: 0
    },
    {
        level: "Hard",
        question: "Who is known for the concept of the 'Mother of the Internet'?",
        options: ["Radia Perlman", "Meg Whitman", "Shafi Goldwasser", "Fei-Fei Li"],
        answer: 0
    },
    {
        level: "Hard",
        question: "Which Indian woman led the Mars Orbiter Mission (Mangalyaan) project?",
        options: ["Ritu Karidhal", "Tessy Thomas", "Nandini Harinath", "Muthayya Vanitha"],
        answer: 0
    },
    {
        level: "Hard",
        question: "Who is the first woman to receive the Turing Award?",
        options: ["Barbara Liskov", "Shafi Goldwasser", "Frances Allen", "Radia Perlman"],
        answer: 2
    }
];

// ====== DOM Elements ======
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const levelBadge = document.getElementById("level-badge");
const scoreElement = document.getElementById("score");

// ====== Variables ======
let currentQuestionIndex = 0;
let score = 0;

// ====== Start Quiz ======
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.innerText = currentQuestion.question;
    levelBadge.innerText = currentQuestion.level + " Level";
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectAnswer(index));
        optionsElement.appendChild(button);
    });

    nextButton.style.display = "none";
}

// ====== Select Answer ======
function selectAnswer(selectedIndex) {
    const buttons = document.querySelectorAll(".option-btn");
    const correctIndex = questions[currentQuestionIndex].answer;

    buttons.forEach((btn, index) => {
        btn.disabled = true;

        if (index === correctIndex) {
            btn.classList.add("correct");
        } else if (index === selectedIndex) {
            btn.classList.add("wrong");
        }
    });

    if (selectedIndex === correctIndex) {
        score++;
        correctSound.play();
    } else {
        wrongSound.play();
    }

    scoreElement.innerText = "Score: " + score;
    nextButton.style.display = "inline-block";
}

// ====== Next Question ======
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// ====== Show Result ======
function showResult() {
    questionElement.innerText = "Quiz Completed 🎉";
    optionsElement.innerHTML = "";
    levelBadge.innerText = "";
    nextButton.innerText = "Restart";
    nextButton.style.display = "inline-block";

    nextButton.onclick = () => location.reload();
}

// ====== Start on Load ======
loadQuestion();