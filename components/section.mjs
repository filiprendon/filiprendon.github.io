import { projectDetails } from "../scripts/projectDetails.mjs";

let nextName;
let nextLink;
let prevName;

let technologies;
class Section extends HTMLElement {
  connectedCallback() {
    const project = this.getAttribute("project");
    const keys = Object.keys(projectDetails);
    const index = keys.indexOf(project);

    const img = projectDetails[project].img;
    const video = projectDetails[project].video;
    const desc = projectDetails[project].description;
    technologies = projectDetails[project].technologies
    // technologies
    let nextProject = keys[index + 1];
    if (!nextProject) {
      nextProject = keys[0];
    }

    let tryProject = projectDetails[project].try || "pause";

    this.innerHTML = `
            <section class="default-page-start" index="${index}">
              <div class="details-title">
              <div class="project-title"><h1 class="textEffect">${project}</h1></div>
                <div class="project-description"><p class="textEffect">${desc}</p></div>
                <div class="project-presentation animate-image">
                  <img src="${img}">
                </div>
                <div class="project-improvements">
                  <p class="textEffect">Used technologies</p>
                <div class="marquee">
                  <div class="marquee__inner" id="marqueeContent">
                  </div>
                </div>
              </div>

                <div class="project-presentation animate-image">
                  <video src="${video}" autoplay loop muted try="${tryProject}">
                </div>
                <div class="next-project"><p class="textEffect">Next Project</p></div>

              </div>
            </section>
            <div class="hide-next">
              <p class="nextTitle">${nextProject}</p>
              <div class="scrollNext">Scroll to next project</div>
            </div>

            <div class="animate-next-project">
              <img src="${projectDetails[nextProject].img}">
            </div>           
        `;
  }
}
customElements.define("custom-section", Section);

class Title extends HTMLElement {
  connectedCallback() {
    const project = this.getAttribute("project");
    const keys = Object.keys(projectDetails);
    const index = keys.indexOf(project);

    this.innerHTML = `
      <section class="default-page-animation" index="${index}">
        <h1 class="hide-project-name">${project}</h1>
      </section>
    `;
  }
}
customElements.define("default-page-animation", Title);

class EndAnimation extends HTMLElement {
  connectedCallback() {
    const project = this.getAttribute("project");
    const keys = Object.keys(projectDetails);
    const index = keys.indexOf(project);

    let nextProject = keys[index + 1];
    let previousProject = keys[index - 1]
    if (!previousProject){
      previousProject = 'Home'
    }
    if (!nextProject) {
      nextProject = keys[0];
    }
    nextName = nextProject;
    nextLink = projectDetails[nextProject].link;

    // prevName = previousProject
    
    this.innerHTML = `
      <section class="end-animation-default">
        <h1></h1>
      </section>
    `;
  }
}
customElements.define("end-page-animation", EndAnimation);

const videoElement = document.querySelector("video");
const hideProjectName = document.querySelector(".hide-project-name");
const detailsTitle = document.querySelector(".details-title");
const projectDescription = document.querySelector(".project-description");
const endAnimation = document.querySelector(".end-animation-default");
const projectName = endAnimation.querySelector("h1");
const nextProjectAnimation = document.querySelector(".next-project");
const scrollNext = document.querySelector(".scrollNext");

const pausedIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause" viewBox="0 0 16 16"><path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5"/></svg>`;
const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/></svg>`;

hideProjectName.addEventListener("animationend", (e) => {
  detailsTitle.classList.add("details-title-anim");
  projectDescription.classList.add("details-title-anim");
});

const marqueeContent = document.getElementById('marqueeContent');

technologies.forEach(tech => {
  const techP = document.createElement('p');
  techP.className = 'textEffect'
  techP.textContent = tech;
  marqueeContent.appendChild(techP);
});

const textEffect = document.querySelectorAll(".textEffect");

textEffect.forEach((t) => {
  t.addEventListener("mouseover", (e) => {
    let fontSize = parseFloat(window.getComputedStyle(e.target).fontSize);
    blob.style.transform = `scaleY(${fontSize / 40})`;
    blob.style.borderRadius = "0";
    blob.style.width = "4px";
    blob.style.backdropFilter = "";
    blob.style.backgroundColor = "black";
    blob.style.border = "none";
  });
});
textEffect.forEach((t) => {
  t.addEventListener("mouseout", (e) => {
    blob.style.transform = "scaleY(1)";
    blob.style.borderRadius = "50%";
    blob.style.width = "30px";
    blob.style.backgroundColor = "";
    blob.style.backdropFilter = "invert(1)";
  });
});

videoElement.addEventListener("click", () => {
  if (videoElement.getAttribute("try") !== "pause") {
    window.open(videoElement.getAttribute("try"));
  } else {
    if (videoElement.paused) {
      videoElement.play();
      blob.innerHTML = pausedIcon;
    } else {
      videoElement.pause();
      blob.innerHTML = playIcon;
    }
  }
});

videoElement.addEventListener("mouseover", () => {
  if (videoElement.getAttribute("try") !== "pause") {
    blob.style.transform = "scale(3)";
    blob.textContent = "try!";
    blob.style.color = "black";
    blob.style.backgroundColor = "rgba(255,255,255,0.3)";
    blob.style.backdropFilter = "blur(150px)";
    blob.style.boxShadow = "1px 0 20px grey";
  } else {
    blob.style.transform = "scale(3)";

    blob.innerHTML = videoElement.paused ? playIcon : pausedIcon;

    blob.style.color = "black";
    blob.style.backdropFilter = "blur(150px)";
    blob.style.boxShadow = "1px 0 20px grey";
  }
});

videoElement.addEventListener("mouseout", () => {
  blob.style.transform = "scale(1)";
  blob.textContent = "";
  blob.style.color = "";
  blob.style.backdropFilter = "invert(1)";
  blob.style.boxShadow = "";
  blob.style.backgroundColor = "";
});

window.addEventListener("scroll", () => {
  if (window.getComputedStyle(scrollNext).opacity == 1) {
    endAnimation.classList.add("show-end-animation");
    setTimeout(() => {
      projectName.className = "project-name";
      projectName.textContent = nextName;
    }, 700);

    setTimeout(() => {
      window.location.href = nextLink;
    }, 900);
  }
});

