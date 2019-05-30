<?php
    /**
     * To add some image sizes.
     */

$image_sizes = [
    ['16/9_sm', 464, 261],
    ['16/9_md', 704, 396],
    ['16/9_lg', 912, 513],
    ['square_md', 540, 540],
    ['hero_lg', '1700', '300'],
];

foreach($image_sizes as $img) {
    array_push($image_sizes, [ $img[0].'_retina', $img[1]*2, $img[2]*2] );
}

foreach ($image_sizes as $image) {
    add_image_size($image[0], $image[1], $image[2], ['center', 'center']);
}

CONST IMAGES_SIZES_WITHOUT_CROPING = [
    // Naming convention for the images sizes : ratio_width_size.
    ['full_lg', '1920', '1080'],
    ['body_sm', 464, 261],
    ['body_md', 704, 396],
    ['body_lg', 912, 912],
];

foreach($image_sizes as $img) {
    array_push($image_sizes, [ $img[0].'_retina', $img[1]*2, $img[2]*2] );
}

foreach (IMAGES_SIZES_WITHOUT_CROPING as $image) {
    add_image_size($image[0], $image[1], $image[2], false);
}
