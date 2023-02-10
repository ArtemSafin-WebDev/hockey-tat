import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";

export default function fancybox() {
  Fancybox.bind("[data-fancybox]", {
    placeFocusBack: false,
  });
}
