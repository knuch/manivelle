<?php

/**
 * DISCLAIMER: This is only usable with ACF 5.8 version (which are still in BETA)
 * 02.04.2019
 */

add_action('acf/init', 'as_acf_init_quote');
function as_acf_init_quote() {
	if( function_exists('acf_register_block') ) {
		acf_register_block(array(
			'name'				=> 'quote',
			'title'				=> __('Quote'),
			'description'		=> __('A custom quote block.'),
			'render_callback'	=> 'as_quote_block_render',
			'category'			=> 'formatting',
			'icon'				=> 'admin-comments',
			'keywords'			=> array( 'quote', 'excerpt' ),
			'supports'          => array('align' => false) ,
			'align'             => 'wide' ,
		));
	}
}

function as_quote_block_render( $block ) {
	$context = Timber::get_context();
	$context['fields'] = $block['data'];
	$output = Timber::compile( 'view.twig', $context );
	echo $output;
}
