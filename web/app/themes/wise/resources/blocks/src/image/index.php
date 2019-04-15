<?php

function as_blocks_image_render( $attributes ) {
	$img = new TimberImage($attributes['id']);

	$context = Timber::get_context();
	$context['img'] = $img;
	$output = Timber::compile( 'view.twig', $context );
	return $output;
}

function as_blocks_register_image() {
	register_block_type( 'core/image', array(
		'render_callback' => 'as_blocks_image_render',
	) );
}

add_action( 'init', 'as_blocks_register_image' );
