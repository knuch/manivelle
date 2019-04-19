/* globals $ */

import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

export default () => {
  const openPhotoswipe = (e) => {
    const pswpElement = $('.pswp')[0];
    const galleryContainer = $(e.target).parentsUntil('.gallery').parent();

    const items = [];
    $.each($('.full_img', galleryContainer), (key, value) => {
      items.push({
        src: value.src,
        w: value.naturalWidth,
        h: value.naturalHeight,
      });
    });

    const index = $(e.target).parent().index();

    // define options (if needed)
    const options = {
      // optionName: 'option value'
      // for example:
      index, // start at first slide
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

  $('.gallery-open').on('click', (e) => {
    openPhotoswipe(e);
  });
};
