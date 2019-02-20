<?php

function as_blocks_gallery_render( $attributes ) {
	$gallery = [];
	foreach($attributes['ids'] as $img) {
		$gallery[] = new TimberImage($img);
	}

	$context['gallery'] = $gallery;
	$output = Timber::compile( 'view.twig', $context );
	return $output;
}

function as_blocks_register_gallery() {
	register_block_type( 'core/gallery', array(
		'render_callback' => 'as_blocks_gallery_render',
	) );
}

add_action( 'init', 'as_blocks_register_gallery' );
