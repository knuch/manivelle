<?php

function as_blocks_register_heading() {
	register_meta( 'post', 'as_headings', array(
		'show_in_rest' => true,
		'single' => false,
		'type' => 'string',
	) );
	register_meta( 'post', 'as_headings_loop', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'number',
	) );
}

add_action( 'init', 'as_blocks_register_heading' );
