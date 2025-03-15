document.getElementById("btn-started").addEventListener("click", (e) => {
  const nameField = document.getElementById("nameField").value;
  const passField = document.getElementById("passField").value;

  if (!nameField && !passField) {
    alert("Please use your Name and Password");
  } else {
    if (nameField && parseInt(passField) === 123456) {
      sweetAlert();
      const bannerSection = document
        .getElementById("bannerSection")
        .classList.add("hidden");
      const menu = document.getElementById("menu").classList.remove("hidden");
      const learn = document.getElementById("learn").classList.remove("hidden");
      const faq = document.getElementById("faq").classList.remove("hidden");
    } else {
      if (passField) {
        alert("Please type your Password (123456) ");
      }
      if (!nameField) {
        alert("Please use your Name");
      }
      if (!passField) {
        alert("Please use your Password");
      }
    }
  }
});

const sweetAlert = () => {
  swal("Good job!", "You clicked the button!", "success");
};

// window.addEventListener("scroll", () => {
//   const menu = document.getElementById("menu");
//   if (window.pageYOffset > 0) {
//     menu.classList.add("fixed");
//   } else {
//     menu.classList.remove("fixed");
//   }
// });

const links = document.querySelectorAll(".btnList a");
for (const link of links) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}
