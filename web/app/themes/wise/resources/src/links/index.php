<?php

function as_blocks_links_render( $attributes ) {
	$context['links'] = $attributes['links'];
	$output = Timber::compile( 'view.twig', $context );
	return $output;
}

function as_blocks_register_links() {

	register_block_type( 'as/links', [
		'render_callback' => 'as_blocks_links_render',
	]);
}

add_action( 'init', 'as_blocks_register_links' );
