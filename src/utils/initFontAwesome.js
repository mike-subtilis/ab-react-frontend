import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBan, faCaretDown, faCaretUp, faCheck, faChevronDown, faChevronUp, faEdit, faExclamationTriangle,
  faHockeyPuck,
  faPlus, faPowerOff, faQuestion, faSearch, faSpinner,
  faStar, faTimes, faUser, faVoteYea,
} from '@fortawesome/free-solid-svg-icons';
import { faCommentDots, faStar as farStar } from '@fortawesome/free-regular-svg-icons';

function initFontAwesome() {
  library.add(faBan);
  library.add(faCaretDown);
  library.add(faCaretUp);
  library.add(faCheck);
  library.add(faChevronDown);
  library.add(faChevronUp);
  library.add(faCommentDots);
  library.add(faEdit);
  library.add(faExclamationTriangle);
  library.add(faHockeyPuck);
  library.add(faPowerOff);
  library.add(faPlus);
  library.add(faSearch);
  library.add(faSpinner);
  library.add(faStar);
  library.add(farStar);
  library.add(faTimes);
  library.add(faUser);
  library.add(faVoteYea);
  library.add(faQuestion);
}

export default initFontAwesome;
