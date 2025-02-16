const blob = document.querySelector(".blob");
// const default_page_animation = document.querySelector("default-page-animation");
// const project_title = document.querySelector("h1");

window.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;

  blob.animate(
    {
      left: `${clientX}px`,
      top: `${clientY}px`,
    },
    { duration: 5, fill: "forwards" }
  );
  // }
});

// project_title.textContent = localStorage.getItem('name')

