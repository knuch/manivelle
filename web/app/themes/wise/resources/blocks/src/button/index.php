<?php

/**
 * DISCLAIMER: This is only usable with ACF 5.8 version (which are still in BETA)
 * 02.04.2019
 */

add_action('acf/init', 'as_acf_init_button');
function as_acf_init_button() {
	if( function_exists('acf_register_block') ) {
		acf_register_block(array(
			'name'				=> 'button',
			'title'				=> _x('Bouton','Gutenberg block', 'lang'),
			'description'		=> _x('A custom button block.','Gutenberg block', 'lang'),
			'render_callback'	=> 'as_button_block_render',
			'category'			=> 'formatting',
			'icon'				=> 'feedback',
			'keywords'			=> array( 'button'),
			'supports'          => array('align' => false) ,
			'align'             => 'wide' ,
		));
	}
}

function as_button_block_render( $block ) {
	$context = Timber::get_context();
	$context['block'] = $block;
	$fields = $block['data'];

	// empty block
	if ($fields['type'] == null) {
		echo Timber::compile( 'placeholder.twig', $context );
	}

	// block with data
	else {
		if (isset($fields['file'])) {
			$fields['file'] = new Timber\Post($fields['file']);
		}
		$context['fields'] = $fields;
		echo Timber::compile( 'view.twig', $context );
	}
}


add_filter('acf/settings/load_json', function ( $paths ) {
	// append path
	$paths[] = __DIR__;
	return $paths;
});
