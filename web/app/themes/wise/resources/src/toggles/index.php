<?php

function as_blocks_toggles_render( $attributes ) {
	$context['toggles'] = $attributes['toggles'];
	$output = Timber::compile( 'view.twig', $context );
	return $output;
}

function as_blocks_register_toggles() {

	register_block_type( 'as/toggles', [
		'render_callback' => 'as_blocks_toggles_render',
	]);
}

add_action( 'init', 'as_blocks_register_toggles' );
