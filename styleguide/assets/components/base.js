/* globals jQuery, document */

// You will use that file to import all your scripts
// Ex: import gallery from './gallery'
import svgIcons from '../icons/svg-icons';
import menu from '../components/organisms/header/header';
import gallery from '../components/molecules/gallery/gallery';

svgIcons(); // Must run as soon as possible

const init = () => {
  // Run your imported scripts
  gallery();
  menu();
};

(function ($) {
  $(document).ready(() => init());
})(jQuery);
