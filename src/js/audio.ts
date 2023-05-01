import Plyr from "plyr";
import "plyr/dist/plyr.css";

export default function audio() {
  const elements = Array.from(
    document.querySelectorAll<HTMLAudioElement>(".js-audio")
  );

  elements.forEach((element) => {
    new Plyr(element);
  });
}
