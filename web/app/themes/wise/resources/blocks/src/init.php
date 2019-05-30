<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 */
function info_cgb_block_assets() {
	// Styles.
	wp_enqueue_style(
		'info-cgb-style-css',
		get_template_directory_uri().'/blocks/dist/blocks.style.build.css',
		array( 'wp-editor' )
	);
}
add_action( 'enqueue_block_assets', 'info_cgb_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 */
function info_cgb_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'info-cgb-block-js',
		get_template_directory_uri().'/blocks/dist/blocks.build.js',
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		true
	);

	// Styles.
	wp_enqueue_style(
		'info-cgb-block-editor-css',
		get_template_directory_uri().'/blocks/dist/blocks.editor.build.css',
		array( 'wp-edit-blocks' )
	);
}

add_action( 'enqueue_block_editor_assets', 'info_cgb_editor_assets' );


/**
 * Autoload all blocks
 */
$blocks = glob(plugin_dir_path(dirname(__FILE__)).'/src/*/index.php');
foreach ($blocks as $block) {
  require_once $block;
}

/**
 * Define available blocks
 */
add_filter( 'allowed_block_types', 'as_blocks_allowed_block_types' );

function as_blocks_allowed_block_types( $allowed_blocks, $post = null ) {

	$allowed_blocks = array(
		'core/paragraph',
		'core/image',
		'core/heading',
		'core/gallery',
		'core/list',
		'core/quote',
		'core/table',
		'core/columns',
		'as/intro',
		'acf/button'
	);

	if( $post && $post->post_type === 'shortcode_page' ) {
		$allowed_blocks[] = 'core/shortcode';
	}

	return $allowed_blocks;
}

add_action('after_setup_theme', function() {
	// only normal font size
	add_theme_support( 'editor-font-sizes', [[
			'name' => __( 'Normal', 'gutenberg-test' ),
			'shortName' => __( 'N', 'gutenberg-test' ),
			'size' => 16,
			'slug' => 'normal'
	]]);
	// no custom font size
	add_theme_support( 'disable-custom-font-sizes' );
	// hide colors
	add_theme_support( 'disable-custom-colors' );
	add_theme_support( 'editor-color-palette' );
});
