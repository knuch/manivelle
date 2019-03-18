/* globals $ */

import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

export default () => {
  const openPhotoswipe = () => {
    const pswpElement = document.querySelectorAll('.pswp')[0];

    // build items array
    const items = [{
      src: 'https://placekitten.com/600/400',
      w: 600,
      h: 400,
    },
    {
      src: 'https://placekitten.com/1200/900',
      w: 1200,
      h: 900,
    }];

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
