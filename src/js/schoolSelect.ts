export default function schoolSelect() {
  const elements = Array.from(
    document.querySelectorAll(".school__sidebar-select")
  );

  elements.forEach((element) => {
    const btn = element.querySelector(".school__sidebar-select-btn");
    const dropdown = element.querySelector(".school__sidebar-select-dropdown");

    btn?.addEventListener("click", (event) => {
      event.preventDefault();
      dropdown?.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (element.contains(target)) return;
      dropdown?.classList.remove("active");
    });
  });
}
