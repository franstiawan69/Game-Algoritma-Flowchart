const blocksContainer =
    document.getElementById("blocks");

const answerArea =
    document.getElementById("answerArea");

let draggedBlock = null;


// =====================================
// DATA FLOWCHART
// =====================================

const flowchartData = [

    {
        id: "mulai",
        text: "Mulai",
        type: "oval"
    },

    {
        id: "siapkan",
        text: "Siapkan wajan dan telur",
        type: "rectangle"
    },

    {
        id: "panaskan",
        text: "Panaskan minyak",
        type: "rectangle"
    },

    {
        id: "pecahkan",
        text: "Pecahkan telur ke wajan",
        type: "rectangle"
    },

    {
        id: "goreng",
        text: "Goreng telur hingga matang",
        type: "rectangle"
    },

    {
        id: "angkat",
        text: "Angkat telur",
        type: "parallelogram"
    },

    {
        id: "selesai",
        text: "Selesai",
        type: "oval"
    }

];


// =====================================
// URUTAN JAWABAN YANG BENAR
// =====================================

const correctAnswer = [

    "mulai",

    "siapkan",

    "panaskan",

    "pecahkan",

    "goreng",

    "angkat",

    "selesai"

];


// =====================================
// ACAK ARRAY
// =====================================

function shuffle(array) {

    let shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}


// =====================================
// MEMBUAT BLOK
// =====================================

function createBlocks() {

    blocksContainer.innerHTML = "";

    const shuffledBlocks =
        shuffle(flowchartData);


    shuffledBlocks.forEach(item => {

        const block =
            document.createElement("div");

        block.classList.add(
            "flow-block",
            item.type
        );

        block.setAttribute(
            "draggable",
            "true"
        );

        block.dataset.value =
            item.id;

        block.innerHTML =
            item.text;


        // DRAG START

        block.addEventListener(
            "dragstart",
            function() {

                draggedBlock = this;

            }
        );


        blocksContainer.appendChild(block);

    });

}


// =====================================
// DROP AREA
// =====================================

answerArea.addEventListener(
    "dragover",
    function(event) {

        event.preventDefault();

    }
);


answerArea.addEventListener(
    "drop",
    function(event) {

        event.preventDefault();


        if (draggedBlock) {

            const placeholder =
                document.querySelector(
                    ".placeholder"
                );

            if (placeholder) {
                placeholder.remove();
            }


            answerArea.appendChild(
                draggedBlock
            );


            draggedBlock = null;

        }

    }
);


// =====================================
// CEK JAWABAN
// =====================================

function checkAnswer() {

    const answerBlocks =
        answerArea.querySelectorAll(
            ".flow-block"
        );


    const result =
        document.getElementById(
            "result"
        );


    // BELUM LENGKAP

    if (
        answerBlocks.length !==
        correctAnswer.length
    ) {

        result.className =
            "error";

        result.innerHTML =
            "❌ Susun semua simbol flowchart terlebih dahulu.";

        return;

    }


    // AMBIL JAWABAN

    let answer = [];


    answerBlocks.forEach(block => {

        answer.push(
            block.dataset.value
        );

    });


    // CEK URUTAN

    let benar = true;


    for (
        let i = 0; i < correctAnswer.length; i++
    ) {

        if (
            answer[i] !==
            correctAnswer[i]
        ) {

            benar = false;

            break;

        }

    }


    // HASIL

    if (benar) {

        result.className =
            "success";

        result.innerHTML =
            "🎉 BENAR! Kamu berhasil menyusun algoritma menggoreng telur dengan tepat!";

    } else {

        result.className =
            "error";

        result.innerHTML =
            "❌ Urutan masih salah. Coba pikirkan langkah menggoreng telur dari awal sampai selesai.";

    }

}


// =====================================
// ACAK ULANG
// =====================================

function resetGame() {

    answerArea.innerHTML = `
        <p class="placeholder">
            Tarik simbol ke sini...
        </p>
    `;


    document.getElementById(
        "result"
    ).style.display = "none";


    createBlocks();

}


// =====================================
// MULAI GAME
// =====================================

createBlocks();