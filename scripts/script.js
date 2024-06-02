// Unsplash key
const accessKey = "iJ-iWopgvFdV_P6BqTyi16Uhcny2C2Xw4D8Ddo_4kfQ";

// Follow pointer
const blob = document.getElementById("blob");
let text = "Loading content"
// const palabras = ["Web Developer", "Drake shlong", "Puerto Freako"];
let element = document.querySelector(".typing-text");
let easter = document.querySelector(".intro");
let i = 0;
const letras = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
let delay = false;
let typingText = document.querySelector(".typing-text");
let introText = document.querySelector(".introText");
let loadContainer = document.querySelector(".load");
let startContainer = document.querySelector(".start");
let skillsContainer = document.querySelector(".skills");
let projectsContainer = document.querySelector(".projects");
let carousel = document.querySelector(".carousel");
let dragInfo = document.getElementById("dragInfo");
let restContainers = document.querySelectorAll(".rest");
let realContainer = document.querySelectorAll(".real");
let downloadCV = document.querySelector(".download");
let downloadBlob = document.getElementById("dlCv");
let playBtn = document.querySelector(".playBtn");
let gridItemsAll = document.querySelectorAll(".gridItem");
let video = document.getElementById("video");
let videoSrc = document.getElementById("videoSrc");
let mediaContainer = document.querySelector(".mediaContainer");
let forwards = document.querySelector(".forwards");
let backwards = document.querySelector(".backwards");
let closeVideo = document.querySelector(".close");
let progressBar = document.querySelector(".progressBar");
let fullScreen = document.querySelector(".fullScreen");
let videoContainer = document.querySelector(".videoContainer");
let skillItems = document.querySelectorAll(".skillItem");
let footer = document.querySelector('.footer');


carousel.style.translate = "-16%";

gridItemsAll.forEach(function (gItem) {
  gItem.addEventListener("click", function () {
    let videoUrl = gItem.dataset.videourl;
    if (!videoUrl) return;
    // console.log(gItem.dataset.videourl);
    mediaContainer.style.display = "flex";

    videoSrc.src = videoUrl;
    video.load();
  });
});

closeVideo.addEventListener("click", function () {
  video.currentTime = 0;
  playBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="icon icon-tabler icons-tabler-outline icon-tabler-player-play playBtn">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 4v16l13 -8z" />
</svg>`;
  mediaContainer.style.display = "none";
});
video.addEventListener("timeupdate", function () {
  var progress = video.currentTime / video.duration;
  progressBar.style.width = progress * 100 + "%";
});

playBtn.addEventListener("click", function () {
  if (video.paused) {
    video.play();
    playBtn.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-player-pause playBtn"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /><path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /></svg>`;
    playBtn.classList.add("pauseBtn");
  } else if (playBtn.classList.contains("pauseBtn")) {
    video.pause();
    playBtn.classList.remove("pauseBtn");

    playBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="icon icon-tabler icons-tabler-outline icon-tabler-player-play playBtn">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 4v16l13 -8z" />
</svg>`;
  }
});


function openFile(file){
  window.open(file)
}
fullScreen.addEventListener("click", function () {
  // if (video.requestFullscreen) {
  //   video.requestFullscreen();
  // } else if (video.mozRequestFullScreen) {
  //   video.mozRequestFullScreen();
  // } else if (video.webkitRequestFullscreen) {
  //   video.webkitRequestFullscreen();
  // }

  videoContainer.style.width = "100%";
  videoContainer.style.height = "95%";
});
document.querySelector("pauseBtn")?.addEventListener("click", function () {
  video.pause();
});

forwards.addEventListener("click", function () {
  video.currentTime += 15;
});

backwards.addEventListener("click", function () {
  video.currentTime -= 15;
});

// let dataNames = document.querySelectorAll("[data-name]");
// dataNames.forEach((name) => {
//   let searchRef = name.dataset.name;

//   const url = `https://api.unsplash.com/search/photos?query=${searchRef}&client_id=${accessKey}`;

//   fetch(url)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok " + response.statusText);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error(
//         "There has been a problem with your fetch operation:",
//         error
//       );
//     });

//   console.log(name.dataset.name);
// });

window.onpointermove = (event) => {
  const { clientX, clientY } = event;

  blob.animate(
    {
      left: `${clientX}px`,
      top: `${clientY}px`,
    },
    { duration: 6000, fill: "forwards" }
  );
};

carousel.addEventListener("mouseenter", function () {
  dragInfo.classList.remove("ok");
  dragInfo.classList.add("dragInfo");
  dragInfo.style.display = "flex";
  document.body.style.cursor = "pointer";
});

carousel.addEventListener("mouseleave", function () {
  dragInfo.classList.add("ok");
  dragInfo.classList.remove("dragInfo");
  document.body.style.cursor = "default";
});

// downloadCV.addEventListener("mouseenter", function () {
//   // downloadBlob.classList.remove("downloadOk");
//   downloadBlob.classList.add("downloadBlob");
//   downloadBlob.style.display = "flex";

//   document.body.style.cursor = "pointer";
// });

// downloadCV.addEventListener("mouseleave", function () {
//   downloadBlob.classList.add("downloadOk");
//   downloadBlob.classList.remove("downloadBlob");
//   document.body.style.cursor = "default";
// });

// downloadCV.addEventListener("pointermove", function (event) {
//   const { clientX, clientY } = event;

//   downloadBlob.animate(
//     {
//       left: `${clientX}px`,
//       top: `${clientY}px`,
//     },
//     { duration: 4000, fill: "forwards" }
//   );
// });

carousel.addEventListener("pointermove", function (event) {
  if (!dragInfo.classList.contains("ok")) {
    event.preventDefault();
    const { clientX, clientY } = event;

    dragInfo.animate(
      {
        left: `${clientX}px`,
        top: `${clientY}px`,
      },
      { duration: 4000, fill: "forwards" }
    );
  }
});

downloadCV.onmouseover = (e) => {
  if (delay) return;
  delay = true;
  let v = 0;
  const originalText = e.target.dataset.value;

  const interval = setInterval(() => {
    e.target.innerText = originalText
      .split("")
      .map((letra, index) => {
        if (index < v) {
          return originalText[index];
        }
        return letras[Math.floor(Math.random() * letras.length)];
      })
      .join("");
    setTimeout(() => {
      if (downloadCV.textContent.charAt(0) === "d") {
        downloadCV.style.color = "#FF6F61";
        downloadCV.style.fontWeight = "900";
        downloadCV.style.cursor = "pointer";
        downloadCV.addEventListener("click", downloadCVHandler);
      } else {
        downloadCV.style.fontWeight = "normal";
        downloadCV.style.color = "#f5f5f5";
        downloadCV.style.cursor = "default";
        downloadCV.removeEventListener("click", downloadCVHandler);
      }
    }, 50);

    e.target.dataset.value =
      e.target.dataset.value === "download my cv"
        ? "creativity"
        : "download my cv";
    if (v >= originalText.length) {
      clearInterval(interval);
      setTimeout(() => {
        delay = false;
      }, 1500);
    }

    v += 1;
  }, 45);
};

function downloadCVHandler() {
  var link = document.createElement("a");
  link.href = "resume.pdf";
  link.download = "resume.pdf";
  link.click();
}

function typeWriter(lp, i = 0) {
  if (i < text.length) {
    element.textContent += text.charAt(i);
    setTimeout(() => typeWriter(lp, i + 1), 50);
  } else {
    lp();
  }
}

document.addEventListener('scroll', () => {
    footer.style.display = 'flex';
  });


// scroll carousel

// carousel.addEventListener('mousemove', (e) => {
//   if (isDragging) {
//     const currentPosition = e.clientX;
//     deltaX = currentPosition - startPosition;
//     const scrollAmount = deltaX * 0.7;
//     carousel.style.transform = `translateX(-${scrollAmount}px) rotate(5deg) rotateX(15deg)`;
//   }
// });

// document.addEventListener('scroll', () => {
//   const scrollTop = document.documentElement.scrollTop;
//   carousel.classList.add('beingScrolled');
//   const scrollAmount = scrollTop * 0.5;
//   carousel.style.transform = `translateX(-${scrollAmount}px)`;
// });

$(function () {
  var $carousel = $(".carousel");
  var containerWidth = $(".container").width();
  var carouselWidth = $carousel.width();
  var maxOffset = 1500;
  console.log(maxOffset);

  var margin = 500;

  $carousel.draggable({
    axis: "x",
    drag: function (event, ui) {
      if (ui.position.left > margin || ui.position.left < -maxOffset - margin) {
        ui.position.left = Math.min(
          Math.max(ui.position.left, -maxOffset - margin),
          margin
        );
      }
    },
    stop: function (event, ui) {
      if (ui.position.left > 0) {
        $carousel.animate({ left: 0 }, 500);
      } else if (ui.position.left < -maxOffset) {
        $carousel.animate({ left: -maxOffset }, 500);
      }
    },
  });
});

skillItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    console.log(e.target.closest("div"));
    item.classList.add("showSkillUsage");
  });
});

window.ondblclick = (e) => {
  console.log(letras.length);
};

typeWriter(loadPage);

function loadPage() {
  setTimeout(() => {
    typingText.classList.add("animated");
    loadContainer.classList.add("animated");
    startContainer.classList.add("loadAnimation", "show");
    realContainer.forEach((element) => {
      element.classList.add("loadAnimation");
    });
    loadContainer.addEventListener("animationend", () => {
      loadContainer.remove();
    });
    typingText.addEventListener("animationend", () => {
      typingText.remove();
    });
    realContainer.forEach((element) => {
      element.addEventListener("animationend", () => {
        element.classList.remove("real");
      });
    });
  }, 1500);
}

let icons = document.querySelectorAll(".bi");

document.querySelector(".bi-github").onclick = () => {
  window.open("https://github.com/filiprendon", "_blank");
};

document.querySelector(".bi-linkedin").onclick = () => {
  window.open(
    "https://www.linkedin.com/in/filip-rend%C3%B3n-toneva-a8362826b/",
    "_blank"
  );
};
document.querySelector(".bi-instagram").onclick = () => {
  window.open("https://www.instagram.com/filiipp02/", "_blank");
};
document.querySelector(".bi-envelope").onclick = () => {
  window.open("mailto:rendonfilip@gmail.com", "_blank");
};


// Para un futuro
// const textEl = document.getElementById("text");
// const customCursor = document.getElementById("custom-cursor");

// // Calcular el tamaño del cursor personalizado
// const fontSize = parseInt(
//   window
//     .getComputedStyle(textEl)
//     .getPropertyValue("font-size")
//     .replace("px", "")
// );
// const cursorSize = fontSize * 1.4;

// // Función para mover el cursor personalizado
// function moveCursor(event) {
//   customCursor.style.left = event.clientX - cursorSize / 2 + "px";
//   customCursor.style.top = event.clientY - cursorSize / 2 + "px";
// }

// // Función para ampliar el cursor cuando se coloca sobre el texto
// function enlargeCursor() {
//   customCursor.style.width = cursorSize + "px";
//   customCursor.style.height = cursorSize + "px";
// }

// // Función para restablecer el tamaño del cursor cuando se sale del texto
// function resetCursor() {
//   customCursor.style.width = "20px";
//   customCursor.style.height = "20px";
// }

// // Agregar eventos de escucha
// textEl.addEventListener("mouseover", enlargeCursor);
// textEl.addEventListener("mouseout", resetCursor);
// document.addEventListener("mousemove", moveCursor);
