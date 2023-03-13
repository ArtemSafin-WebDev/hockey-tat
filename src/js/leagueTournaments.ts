export default function leagueTournaments() {
  const elements = Array.from(
    document.querySelectorAll(".league-tournaments__season-btn-wrapper")
  );

  elements.forEach((element) => {
    const btn = element.querySelector(".league-tournaments__season-btn");

    btn.addEventListener("click", (event) => {
      event.preventDefault();
      btn.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (element.contains(target)) return;
      btn.classList.remove("active");
    });
  });
}
