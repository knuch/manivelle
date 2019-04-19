<?php
    /**
     * To add some image sizes.
     */

$image_sizes = [
    ['sm', 464, 261],
    ['md', 704, 396],
    ['lg', 912, 513],
    ['square_md', 540, 540],
];


foreach($image_sizes as $img) {
    array_push($image_sizes, [ $img[0].'_retina', $img[1]*2, $img[2]*2] );
}

foreach ($image_sizes as $image) {
    add_image_size($image[0], $image[1], $image[2], ['center', 'top']);
}

CONST IMAGES_SIZES_WITHOUT_CROPING = [
    // Naming convention for the images sizes : ratio_width_size.
    ['', '', ''],
];

foreach (IMAGES_SIZES_WITHOUT_CROPING as $image) {
    //add_image_size($image[0], $image[1], $image[2], false);
}
