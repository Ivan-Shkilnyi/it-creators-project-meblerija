window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  loader.classList.add("hidden");

  setTimeout(() => {
    loader.style.display = "none";
  }, 8000);
});

