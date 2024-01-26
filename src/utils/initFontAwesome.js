import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faVoteYea, faQuestion } from "@fortawesome/free-solid-svg-icons";

function initFontAwesome() {
  library.add(faStar);
  library.add(faVoteYea);
  library.add(faQuestion);
}

export default initFontAwesome;
