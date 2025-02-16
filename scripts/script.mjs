// VARIABLES

const removableSection = document.querySelector(".removable-section");
const mainSection = document.querySelector(".main-section");
const ok = document.querySelector(".intro-container");
const projects = document.querySelector(".projects-section");
const carousel_items = document.querySelectorAll(".carousel-item");
// const blob = document.querySelector(".blob");
const single_project_title = document.querySelector(".single-project-title");
const details_title = document.querySelector(".details-title");
const project_description = document.querySelector(".project-description");
const project_title = document.querySelector(".project-title");

const animateLinks = document.querySelectorAll(".animate-link");

const projectPresentationImg = document.querySelector(
  ".project-presentation img"
);


const single_project_details = document.querySelector(
  ".single-project-details"
);

let secondLine = document
  .querySelectorAll(".intro-line")[1]
  .querySelectorAll("h1");
let thirdLine = document
  .querySelectorAll(".intro-line")[2]
  .querySelectorAll("h1");

let slot0 = secondLine[0].innerText;
let slot1 = secondLine[1].innerText;
let tlot0 = thirdLine[0].innerText;
let tlot2 = thirdLine[1].innerText;

// removableSection.addEventListener("animationend", () => {
removableSection.remove();
// });

const createSpans = (cl) => {
  const elements = document.querySelectorAll(cl);

  elements.forEach((elem) => {
    let text = elem.innerText.split("");
    elem.innerText = "";

    text.forEach((l, index) => {
      const span = document.createElement("span");
      span.classList.add("letter");
      span.style.setProperty("--i", index);
      span.innerText = l;
      elem.appendChild(span);
    });
  });
};

createSpans(".effect");

// window.addEventListener("mousemove", (e) => {
//   const { clientX, clientY } = e;

//   blob.animate(
//     {
//       left: `${clientX}px`,
//       top: `${clientY}px`,
//     },
//     { duration: 50, fill: "forwards" }
//   );
//   // }
// });

carousel_items[0].addEventListener("animationend", () => {
  let isInCenter = getComputedStyle(carousel_items[0]).backdropFilter;

  if (isInCenter == "blur(1px)") {
    secondLine[0].innerText = "integrates";
    secondLine[1].innerText = "ai";

    thirdLine[0].innerText = "web";
    thirdLine[1].innerText = "automation";
    console.log();
  } else {
    secondLine[0].innerText = slot0;
    secondLine[1].innerText = slot1;

    thirdLine[0].innerText = tlot0;
    thirdLine[1].innerText = tlot2;
  }
});

document.querySelectorAll("a").forEach((a) => {
  a.addEventListener("mouseover", () => {
    blob.style.transform = "scale(2)";
  });
  a.addEventListener("mouseout", () => {
    blob.style.transform = "scale(1)";
  });
});

carousel_items.forEach((i) => {
  i.addEventListener("mouseover", () => {
    blob.style.transform = "scale(4)";
    blob.style.backdropFilter = "";
    blob.style.backgroundColor = "white";
    blob.textContent = "click me!";
    // document.body.style.backgroundColor = getComputedStyle(i).backgroundColor;

    blob.style.color = "black";
  });
  i.addEventListener("mouseout", () => {
    blob.style.transform = "scale(1)";
    blob.style.backdropFilter = "invert(1)";
    blob.textContent = "";
    blob.style.backgroundColor = "";
    document.body.style.backgroundColor = "black";
  });

  i.addEventListener("click", (e) => {
    carousel_items.forEach((f) => {
      f.classList.add("show-projects");
    });

    let projectDiv = e.target.closest("div");
    if (!projectDiv.className.includes("item-title")) {
      single_project_title.classList.add("show-single-project");
      single_project_title.addEventListener("animationend", (e) => {
        single_project_title.querySelector("h1").textContent =
          projectDiv.dataset.name;
        single_project_title.querySelector("h1").className = "project-name";

        setTimeout(() => {
          single_project_title.style.clipPath = "none";
          single_project_title.style.transform = "translateY(0)";
          // single_project_title.style.clipPath = ''
          single_project_title.classList.remove("show-single-project");
          single_project_title
            .querySelector("h1")
            .classList.remove("project-name");
          single_project_title
            .querySelector("h1")
            .classList.add("hide-project-name");
          single_project_title.classList.add("project-content");
          single_project_details.classList.add("show-details");

          project_title.textContent = projectDiv.dataset.name;
          single_project_title.addEventListener("animationend", (e) => {
            details_title.classList.add("details-title-anim");
            project_description.textContent =
              projectDetails[projectDiv.dataset.name].description;
            project_description.classList.add("details-title-anim");
            projectPresentationImg.src =
              projectDetails[projectDiv.dataset.name].img;
          });
        }, 1000);
      });
    }
  });
});

animateLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    let projectDiv = e.target.closest("div");
    localStorage.setItem("name", projectDiv.dataset.name);
    setTimeout(() => {
      window.location.href = link.href
    }, 900);
  }, true);
});
