<?php

function as_blocks_list_two_col_render( $attributes ) {
	$context['data'] = $attributes;
	$output = Timber::compile( 'view.twig', $context );
	return $output;
}

function as_blocks_register_list_two_col() {

	register_block_type( 'as/list-two-col', [
		'render_callback' => 'as_blocks_list_two_col_render',
	]);
}

add_action( 'init', 'as_blocks_register_list_two_col' );
