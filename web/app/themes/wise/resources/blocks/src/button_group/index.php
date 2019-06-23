<?php

use App\Helper;

/**
 * DISCLAIMER: This is only usable with ACF 5.8 version (which are still in BETA)
 * 02.04.2019
 */

add_action('acf/init', function() {
	if( function_exists('acf_register_block') ) {
		acf_register_block(array(
			'name'				    => 'button-group',
			'title'				    => _x('Groupe de boutons','Gutenberg block', 'lang'),
			'description'		  => _x('A custom button block.','Gutenberg block', 'lang'),
			'category'			  => 'formatting',
			'icon'				    => 'feedback',
			'keywords'		  	=> array( 'button'),
			'supports'        => array('align' => false) ,
			'align'           => 'wide' ,
			'render_callback'	=> function( $block ) {
				$context = Timber::get_context();
				$buttons = Helper::parseRepeater($block['data'], 'buttons', ['type', 'title', 'file', 'url', 'open_in_new_tab']);
				$context['block'] = $block;

				// empty block
				if ($buttons== null) {
					echo Timber::compile( 'render/placeholder.twig', $context );
				}
				// block with data
				else {
					foreach($buttons as $key => $button) {
						if (isset($button['file'])) {
							$buttons[$key]['file'] = new Timber\Post($button['file']);
						}
					}
					$block['data']['buttons'] = $buttons;
					$context['data'] = $block['data'];
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
