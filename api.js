const loadBtn = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => showBtn(data.data));
};

const showBtn = (btns) => {
  for (const btn of btns) {
    const btnList = document.getElementById("btnList");

    const div = document.createElement("div");
    div.innerHTML = `
    <button id="btn-${btn.level_no}" onClick = "loadWord(${btn.level_no})" class="btn btn-outline btn-primary text-sm font-semibold mx-1 btn-level"><i class="fa-solid fa-book-open mr-1"></i>Lesson-${btn.level_no}</button>
    `;
    btnList.appendChild(div);
  }
};

loadBtn();

const loadWord = (btnID) => {
  showSpinner();
  fetch(`https://openapi.programming-hero.com/api/level/${btnID}`)
    .then((res) => res.json())
    .then((data) => {
      removeBtnActiveClass();
      const clickedBtn = document.getElementById(`btn-${btnID}`);
      clickedBtn.classList.add("active");
      if (data.data) {
        showWord(data.data);
        hideSpinner();
      }
    });
};

const removeBtnActiveClass = () => {
  const btnActives = document.getElementsByClassName("active");
  for (const btnActive of btnActives) {
    btnActive.classList.remove("active");
  }
};

const showWord = (words) => {
  const showWords = document.getElementById("showWords");
  showWords.innerHTML = "";
  if (words.length < 1) {
    const div = document.createElement("div");
    div.classList.add("text-center", "col-span-full");
    div.innerHTML = `
    <img src="assets/alert-error.png" alt="" class="inline-block mb-4">
    <p class="text-[#79716B] text-sm hind-siliguri pb-3 font-medium">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    <span class="hind-siliguri font-medium text-4xl text-[#292524]">নেক্সট Lesson এ যান</span>
    `;
    showWords.appendChild(div);
  } else {
    for (const word of words) {
      const div = document.createElement("div");
      div.classList.add("bg-white", "rounded-xl", "p-10", "text-center");
      div.innerHTML = `
        <h2 class="text-black font-bold text-4xl pb-6">${word.word}</h2>
        <h5 class="text-black font-bold text-xl pb-6">Meaning /Pronounciation</h5>
        <h2 class="text-black font-bold text-4xl pb-6 opacity-80 hind-siliguri">${
          word.meaning ? word.meaning : "অর্থ নেই"
        } / ${word.pronunciation}</h2> 
        <div class="flex justify-between items-center pt-6">
            <button class="text-[#374957] rounded-lg bg-[rgba(26,145,255,0.1)] flex justify-center items-center w-14 h-14 cursor-pointer" id="info-${
              word.id
            }" onClick="loadInfo(${
        word.id
      })"><i class="fa-solid fa-circle-info"></i></button>
            <button id="spkr-${word.id}" onClick="pronounceWord('${word.word}')" class="text-[#374957] rounded-lg bg-[rgba(26,145,255,0.1)] flex justify-center items-center w-14 h-14 cursor-pointer"><i class="fa-solid fa-volume-high"></i></button>
        </div>
        `;
      showWords.appendChild(div);
    }
  }
};

const loadInfo = (infoID) => {
  fetch(`https://openapi.programming-hero.com/api/word/${infoID}`)
    .then((res) => res.json())
    .then((data) => showInfo(data.data));
};

const showInfo = (informations) => {
  const synonyms = informations.synonyms;
  document.getElementById("wordInfo").showModal();
  const modalContainer = document.getElementById("modalContainer");
  modalContainer.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="rounded-xl border-[#EDF7FF] border p-6">
        <h2 class="text-black font-bold text-4xl pb-8">${
          informations.word
        } (<i class="fa-solid fa-microphone"></i> : ${
    informations.pronunciation
  })</h2>
        <p class="text-2xl text-black font-semibold pb-3">Meaning</p>
        <p class="text-2xl text-black font-medium hind-siliguri pb-8">${
          informations.meaning ? informations.meaning : "অর্থ নেই"
        }</p>
        <p class="text-2xl text-black font-semibold  pb-3">Example</p>
        <p class="text-2xl text-black font-medium opacity-80 pb-8">${
          informations.sentence
        }</p>
        <p class="text-2xl text-black font-semibold hind-siliguri pb-3">সমার্থক শব্দ গুলো</p>
        <div class="flex gap-2 flex-wrap">
            ${synonyms
              .map(
                (synonym) => `
                <span class="px-5 py-3 opacity-80 text-black bg-[#EDF7FF] rounded-md inline-block">${synonym}</span>
            `
              )
              .join("")}
        </div>
    </div>
    <div class="modal-action !justify-start">
        <form method="dialog">
        <button class="btn btn-primary">Complete Learning</button>
        </form>
    </div>
    `;
  modalContainer.appendChild(div);
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-EN'; // English
  window.speechSynthesis.speak(utterance);
}

const showSpinner = () => {
  document.getElementById("spinner").classList.remove("hidden");
};

const hideSpinner = () => {
  document.getElementById("spinner").classList.add("hidden");
};
