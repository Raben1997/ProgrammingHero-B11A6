document.getElementById("btn-started").addEventListener("click", (e) => {
  const nameField = document.getElementById("nameField").value;
  const passField = document.getElementById("passField").value;

  if (!nameField && !passField) {
    alert("Please use your Name and Password");
  } else {
    if (nameField && parseInt(passField) === 123456) {
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
      document.getElementById("bannerSection").classList.add("hidden");
      document.getElementById("menu").classList.remove("hidden");
      document.getElementById("learn").classList.remove("hidden");
      document.getElementById("faq").classList.remove("hidden");
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
