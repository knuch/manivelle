/* globals $ */

import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

export default () => {
  const openPhotoswipe = () => {
    const pswpElement = document.querySelectorAll('.content .gallery')[0];

    const items = [];
    $.each($('.content .gallery .gallery-item img'), (key, value) => {
      items.push({
        src: value.src,
        w: value.naturalWidth,
        h: value.naturalHeight,
      });
    });

    // define options (if needed)
    const options = {
      // optionName: 'option value'
      // for example:
      index: 0, // start at first slide
      history: false,
      bgOpacity: 0.7,
      // Buttons/elements
      closeEl: true,
      captionEl: true,
      fullscreenEl: true,
      zoomEl: true,
      shareEl: true,
      counterEl: true,
      arrowEl: true,
      preloaderEl: true,
    };

    const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };

  $('.gallery-open').on('click', () => {
    openPhotoswipe();
  });
};
