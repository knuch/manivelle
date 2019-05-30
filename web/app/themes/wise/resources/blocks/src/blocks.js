/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */

import './block/block.js';
import './intro/block.js';

window.onload = () => {
	wp.blocks.unregisterBlockStyle( 'core/quote', 'large' );
	wp.blocks.unregisterBlockStyle( 'core/quote', 'default' );

	// Our filter function
	function setBlockCustomClassName( className, blockName ) {
		return blockName === 'core/table' ?
			'wp-block-table table' :
			className;
	}

	// Adding the filter
	wp.hooks.addFilter(
		'blocks.getBlockDefaultClassName',
		'wise/set-block-custom-class-name',
		setBlockCustomClassName
	);
};
