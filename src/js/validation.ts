import Validator from "./classes/Validator";

export default function validation() {
  const elements: HTMLFormElement[] = Array.from(
    document.querySelectorAll(".js-form-to-validate")
  );

  elements.forEach((form) => {
    const validator = new Validator(form);

    form.addEventListener("submit", (event: SubmitEvent) => {
      validator.validate();

      if (!validator.valid) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  });
}
