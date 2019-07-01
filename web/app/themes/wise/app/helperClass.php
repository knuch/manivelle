<?php

namespace App;

class Helper {
    public static function parseBlockData($block){

        //Setup global block post data context
        acf_setup_meta( $block['data'], $block['id'], true );

        // Get ACF fields
        $block['data'] = get_fields();

        // Restore global context
        acf_reset_meta( $block['id'] );

        return $block;
    }
}
