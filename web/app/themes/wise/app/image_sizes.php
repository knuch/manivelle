<?php
    /**
     * To add some image sizes.
     */

CONST IMAGES_SIZES = [
/*  ['image_1600px', 1600, 1067],
    ['image_1600px_retina', 3200, 2134],
    ['image_1140px', 1140, 760],
    ['image_1140px_retina', 2280, 1521] */
];

foreach (IMAGES_SIZES as $image) {
    add_image_size($image[0], $image[1], $image[2], ['center', 'top']);
}

CONST IMAGES_SIZES_WITHOUT_CROPING = [
    // Naming convention for the images sizes : ratio_width_size.
    ['', '', ''],
];

foreach (IMAGES_SIZES_WITHOUT_CROPING as $image) {
    add_image_size($image[0], $image[1], $image[2], false);
}
