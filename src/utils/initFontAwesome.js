import { library } from "@fortawesome/fontawesome-svg-core";
import { faBan, faChevronDown, faPowerOff, faStar, faVoteYea, faQuestion, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots, faStar as farStar } from "@fortawesome/free-regular-svg-icons";

function initFontAwesome() {
  library.add(faBan);
  library.add(faChevronDown);
  library.add(faCommentDots);
  library.add(faExclamationTriangle);
  library.add(faPowerOff);
  library.add(faStar);
  library.add(farStar);
  library.add(faVoteYea);
  library.add(faQuestion);
}

export default initFontAwesome;
