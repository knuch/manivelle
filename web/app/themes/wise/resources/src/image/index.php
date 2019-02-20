<?php

function as_blocks_image_render( $attributes ) {
	$context['img'] = new TimberImage($attributes['id']);
	$output = Timber::compile( 'view.twig', $context );
	return $output;
}

function as_blocks_register_image() {
	register_block_type( 'core/image', array(
		'render_callback' => 'as_blocks_image_render',
	) );
}

add_action( 'init', 'as_blocks_register_image' );
