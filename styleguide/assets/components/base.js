/* globals jQuery, document */

// You will use that file to import all your scripts
// Ex: import gallery from './gallery'
import svgIcons from '../icons/svg-icons';
import menu from '../components/organisms/header/header';

svgIcons(); // Must run as soon as possible

const init = () => {
  // Run your imported scripts
  // Ex: gallery();
  menu();
};

(function ($) {
  $(document).ready(() => init());
})(jQuery);
document.addEventListener('ToolboxReady', () => init());
