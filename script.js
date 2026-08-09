// ======================================================
// DATA PESERTA
// ======================================================

let studentName = "";

let studentClass = "";


// ======================================================
// INPUT NAMA & KELAS
// ======================================================

function submitIdentity() {

  let name =
    document
      .getElementById("studentName")
      .value
      .trim();


  let kelas =
    document
      .getElementById("studentClass")
      .value
      .trim();


  let error =
    document
      .getElementById("identityError");


  if (name === "") {

    error.innerText =
      "Nama harus diisi.";

    document
      .getElementById("studentName")
      .focus();

    return;

  }


  if (kelas === "") {

    error.innerText =
      "Kelas harus diisi.";

    document
      .getElementById("studentClass")
      .focus();

    return;

  }


  studentName = name;

  studentClass = kelas;

  error.innerText = "";


  document
    .getElementById("identity")
    .classList
    .add("hidden");


  document
    .getElementById("instruction")
    .classList
    .remove("hidden");

}

const firebaseConfig = {

  apiKey: "AIzaSyDWPv1eHBJ8l3Z6g_Ti1cHZLHFY759UE6k",
  authDomain: "tes-digit-span.firebaseapp.com",
  projectId: "tes-digit-span",
  storageBucket: "tes-digit-span.firebasestorage.app",
  messagingSenderId: "815711240131",
  appId: "1:815711240131:web:c6df500eab0947c9a2c776",
  measurementId: "G-61D19S7Z5D"

};

// ======================================================
// DATA TEST
// ======================================================

let mode = "forward";

let level = 1;

let trial = 1;

let digits = [];

let forwardScore = 0;

let backwardScore = 0;

let timer;

let timeLeft = 30;


// ======================================================
// JUMLAH DIGIT
// ======================================================

function getDigitCount() {

  if (level === 1) {

    return 2;

  }

  return level + 1;

}


// ======================================================
// START TEST
// ======================================================

function startTest() {

  document
    .getElementById("instruction")
    .classList
    .add("hidden");


  document
    .getElementById("forwardIntro")
    .classList
    .remove("hidden");

}


// ======================================================
// START FORWARD
// ======================================================

function startForwardTest() {

  mode = "forward";

  level = 1;

  trial = 1;


  document
    .getElementById("forwardIntro")
    .classList
    .add("hidden");


  document
    .getElementById("test")
    .classList
    .remove("hidden");


  nextTrial();

}


// ======================================================
// START BACKWARD
// ======================================================

function startBackwardTest() {

  mode = "backward";

  level = 1;

  trial = 1;


  document
    .getElementById("backwardIntro")
    .classList
    .add("hidden");


  document
    .getElementById("test")
    .classList
    .remove("hidden");


  nextTrial();

}


// ======================================================
// NEXT TRIAL
// ======================================================

function nextTrial() {

  document
    .getElementById("feedback")
    .innerText = "";


  document
    .getElementById("inputArea")
    .classList
    .add("hidden");


  document
    .getElementById("answer")
    .value = "";


  if (level > 8) {

    if (mode === "forward") {

      document
        .getElementById("test")
        .classList
        .add("hidden");


      document
        .getElementById("backwardIntro")
        .classList
        .remove("hidden");


      return;

    }

    else {

      showResult();

      return;

    }

  }


  document
    .getElementById("mode")
    .innerText =
    mode.toUpperCase();


  document
    .getElementById("level")
    .innerText =
    "Level " + level;


  document
    .getElementById("trialInfo")
    .innerText =
    "Trial " + trial + "/2";


  if (level === 1) {

    document
      .getElementById("timer")
      .innerText = "";

  }

  else {

    document
      .getElementById("timer")
      .innerText =
      "Waktu: 30 detik";

  }


  if (level === 1) {

    document
      .getElementById("note")
      .innerText =
      "Level 1 adalah latihan (tidak dinilai)";

  }

  else {

    document
      .getElementById("note")
      .innerText = "";

  }


  digits = [];


  let count =
    getDigitCount();


  for (
    let i = 0;
    i < count;
    i++
  ) {

    digits.push(
      Math.floor(
        Math.random() * 9
      )
    );

  }


  if (trial === 1) {

    showWarning();

  }

  else {

    showDigits();

  }

}


// ======================================================
// WARNING LEVEL
// ======================================================

function showWarning() {

  let warning =
    document
      .getElementById("warning");


  let countdown = 3;


  let digitCount =
    getDigitCount();


  document
    .getElementById("mode")
    .style
    .display = "none";


  document
    .getElementById("level")
    .style
    .display = "none";


  document
    .getElementById("trialInfo")
    .style
    .display = "none";


  document
    .getElementById("note")
    .style
    .display = "none";


  document
    .getElementById("timer")
    .style
    .display = "none";


  function renderWarning() {

    warning.innerHTML =

      "<span style='font-size:36px; font-weight:bold; color:black;'>LEVEL "
      + level +
      "</span>"

      +

      "<br><br>"

      +

      "<span style='font-size:24px; font-weight:bold; color:black;'>Level ini terdiri dari "
      + digitCount +
      " digit angka</span>"

      +

      "<br><br><br>"

      +

      "<span style='font-size:30px; font-weight:bold; color:#764ba2;'>Dimulai dalam "
      + countdown +
      "</span>";

  }


  renderWarning();


  let interval =
    setInterval(() => {

      countdown--;


      if (countdown > 0) {

        renderWarning();

      }

      else {

        clearInterval(interval);


        warning.innerHTML = "";


        document
          .getElementById("mode")
          .style
          .display = "block";


        document
          .getElementById("level")
          .style
          .display = "block";


        document
          .getElementById("trialInfo")
          .style
          .display = "block";


        document
          .getElementById("note")
          .style
          .display = "block";


        document
          .getElementById("timer")
          .style
          .display = "block";


        showDigits();

      }

    }, 1000);

}


// ======================================================
// SHOW DIGITS
// ======================================================

function showDigits() {

  let digitDiv =
    document
      .getElementById("digit");


  digitDiv.innerText = "";


  let i = 0;


  let interval =
    setInterval(() => {

      digitDiv.innerText +=
        digits[i] + " ";


      i++;


      if (i >= digits.length) {

        clearInterval(interval);


        setTimeout(() => {

          digitDiv.innerText = "";


          document
            .getElementById("inputArea")
            .classList
            .remove("hidden");


          startTimer();

        }, 1000);

      }

    }, 1000);

}


// ======================================================
// TIMER
// ======================================================

function startTimer() {

  if (level === 1) {

    return;

  }


  clearInterval(timer);


  timeLeft = 30;


  document
    .getElementById("timer")
    .innerText =
    "⏳ " + timeLeft + " detik";


  timer =
    setInterval(() => {

      timeLeft--;


      document
        .getElementById("timer")
        .innerText =
        "⏳ " + timeLeft + " detik";


      if (timeLeft <= 0) {

        clearInterval(timer);


        document
          .getElementById("feedback")
          .innerText =
          "Waktu Habis";


        setTimeout(() => {

          processWrongAnswer();

        }, 1000);

      }

    }, 1000);

}


// ======================================================
// SUBMIT ANSWER
// ======================================================

function submitAnswer() {

  clearInterval(timer);


  let ans =
    document
      .getElementById("answer")
      .value
      .trim();


  ans =
    ans.replace(
      /[^0-9]/g,
      ""
    );


  document
    .getElementById("answer")
    .value = "";


  let correct =
    digits.join("");


  if (mode === "backward") {

    correct =
      digits
        .slice()
        .reverse()
        .join("");

  }


  let isCorrect =
    ans === correct;


  if (isCorrect) {

    document
      .getElementById("feedback")
      .innerText =
      "Correct";

  }

  else {

    document
      .getElementById("feedback")
      .innerText =
      "Wrong";

  }


  setTimeout(() => {

    if (isCorrect) {


      if (level >= 2) {

        if (mode === "forward") {

          forwardScore++;

        }

        else {

          backwardScore++;

        }

      }


      level++;

      trial = 1;


      nextTrial();

    }

    else {

      processWrongAnswer();

    }

  }, 1000);

}


// ======================================================
// LOGIC JAWABAN SALAH
// ======================================================

function processWrongAnswer() {


  if (level === 1) {


    if (trial === 1) {

      trial = 2;

    }

    else {

      level = 2;

      trial = 1;

    }


    nextTrial();


    return;

  }


  if (trial === 1) {

    trial = 2;

    nextTrial();

  }

  else {


    if (mode === "forward") {

      document
        .getElementById("test")
        .classList
        .add("hidden");


      document
        .getElementById("backwardIntro")
        .classList
        .remove("hidden");

    }

    else {

      showResult();

    }

  }

}


// ======================================================
// SIMPAN HASIL FIREBASE
// ======================================================

async function saveResultToFirebase() {

  try {


    if (!window.firebaseDB) {

      throw new Error(
        "Firebase belum terhubung."
      );

    }


    let totalScore =
      forwardScore +
      backwardScore;


    await window.firebaseAddDoc(

      window.firebaseCollection(
        window.firebaseDB,
        "testResults"
      ),

      {

        name:
          studentName,

        className:
          studentClass,

        forwardScore:
          forwardScore,

        backwardScore:
          backwardScore,

        totalScore:
          totalScore,

        createdAt:
          window.firebaseServerTimestamp()

      }

    );


    document
      .getElementById("saveStatus")
      .innerText =
      "✓ Hasil berhasil disimpan ke database.";


    document
      .getElementById("saveStatus")
      .style
      .color = "green";


  }

  catch (error) {

    console.error(
      "Firebase Error:",
      error
    );


    document
      .getElementById("saveStatus")
      .innerText =
      "✕ Gagal menyimpan hasil.";


    document
      .getElementById("saveStatus")
      .style
      .color = "red";

  }

}


// ======================================================
// RESULT
// ======================================================

function showResult() {

  clearInterval(timer);


  document
    .getElementById("test")
    .classList
    .add("hidden");


  document
    .getElementById("result")
    .classList
    .remove("hidden");


  document
    .getElementById("resultName")
    .innerText =
    studentName;


  document
    .getElementById("resultClass")
    .innerText =
    studentClass;


  document
    .getElementById("forwardResult")
    .innerText =
    "Forward Score: "
    + forwardScore
    + "";


  document
    .getElementById("backwardResult")
    .innerText =
    "Backward Score: "
    + backwardScore
    + "";


  document
    .getElementById("totalResult")
    .innerText =
    "Total Score: "
    + (
      forwardScore +
      backwardScore
    )
    + "";


  document
    .getElementById("saveStatus")
    .innerText =
    "Menyimpan hasil...";


  document
    .getElementById("saveStatus")
    .style
    .color = "#666";


  // SIMPAN KE FIREBASE

  saveResultToFirebase();

}