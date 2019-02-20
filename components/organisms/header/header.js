/* globals $ */

export default () => {
  $('.mobile-menu-open').on('click', (e) => {
    e.preventDefault();
    $('body').addClass('mobile-menu-opened');
  });
  $('.mobile-menu-close').on('click', (e) => {
    e.preventDefault();
    $('body').removeClass('mobile-menu-opened');
  });
};
