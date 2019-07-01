<?php

use App\Helper;

/**
 * DISCLAIMER: This is only usable with ACF 5.8 version (which are still in BETA)
 * 02.04.2019
 */

add_action('acf/init', function() {
	if( function_exists('acf_register_block') ) {
		acf_register_block(array(
			'name'				    => 'history',
			'title'				    => _x('Historique','Gutenberg block', 'lang'),
			'description'		  => _x('A custom button block.','Gutenberg block', 'lang'),
			'category'			  => 'formatting',
			'icon'				    => 'info-outline',
			'keywords'		  	=> array( 'historique'),
			'supports'        => array('align' => false) ,
			'align'           => 'wide' ,
			'render_callback'	=> function( $block ) {
				$context = Timber::get_context();
				$block = Helper::parseBlockData($block);
				$context['block'] = $block;

				// empty block
				if ($block['data']['years'] == null) {
					echo Timber::compile( 'render/placeholder.twig', $context );
				}
				// block with data
				else {
					echo Timber::compile( 'render/index.twig', $context );
				}
			},
		));
	}
});

add_filter('acf/settings/load_json', function ( $paths ) {
	// append path
	$paths[] = __DIR__;
	return $paths;
});
