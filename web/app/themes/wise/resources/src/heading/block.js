//  Import CSS.
import './style.scss';
import './editor.scss';

import nanoid from 'nanoid';

const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;
const { RichText } = wp.editor;

let initialRender = false;

registerBlockType( 'as/heading', {
	title: __( 'Titre de section', 'lang' ),
	icon: 'tag',
	category: 'common',
	attributes: {
		content: {
			type: 'string',
		},
		uid: {
			type: 'string',
		},
		as_headings: {
			type: 'array',
			source: 'meta',
			meta: 'as_headings',
		},
		as_headings_loop: {
			type: 'number',
			source: 'meta',
			meta: 'as_headings_loop',
		},
	},
	edit: props => {
		const {
			className,
			attributes,
			setAttributes,
			insertBlocksAfter,
			onReplace,
		} = props;

		const splitBlock = ( before, after, ...blocks ) => {
			if ( after !== null ) {
				// Append "After" content as a new paragraph block to the end of
				// any other blocks being inserted after the current paragraph.
				blocks.push( createBlock( 'core/paragraph', { content: after } ) );
			}

			if ( blocks.length && insertBlocksAfter ) {
				insertBlocksAfter( blocks );
			}

			const { content } = attributes;
			if ( before === null ) {
				// If before content is omitted, treat as intent to delete block.
				onReplace( [] );
			} else if ( content !== before ) {
				// Only update content if it has in-fact changed. In case that user
				// has created a new paragraph at end of an existing one, the value
				// of before will be strictly equal to the current content.
				setAttributes( { content: before } );
			}
		};

		// Create initial Unique ID
		if ( attributes.uid === undefined ) {
			const uid = nanoid( 10 );
			setAttributes( { uid } );
		}

		// Reset array on initial render
		if ( initialRender === false ) {
			initialRender = true;
			setAttributes( {
				as_headings: [ `0__${ attributes.uid }__${ attributes.content }` ],
				as_headings_loop: 0,
			} );
		}

		// Push Unique ID to Post meta
		if (
			attributes.uid !== undefined &&
			attributes.as_headings_loop !== undefined &&
			attributes.as_headings !== undefined &&
			attributes.as_headings.findIndex( i => i.includes( attributes.uid ) ) === -1
		) {
			const newHeading = `${ attributes.as_headings_loop + 1 }__${
				attributes.uid
			}__${ attributes.content }`;

			setAttributes( {
				as_headings: [ ...attributes.as_headings, newHeading ],
				as_headings_loop: attributes.as_headings_loop + 1,
			} );
		}

		return (
			<RichText
				tagName="h2"
				id={ `counter-${ props.attributes.uid }` }
				className={ className }
				onChange={ content => setAttributes( { content } ) }
				placeholder={ __( 'Titre', 'lang' ) }
				value={ attributes.content }
				keepPlaceholderOnFocus={ true }
				formattingControls={ [] }
				unstableOnSplit={ splitBlock }
			/>
		);
	},
	save: props => {
		initialRender = false;
		return (
			<h2 id={ `counter-${ props.attributes.uid }` } className={ props.className }>
				{ props.attributes.content }
			</h2>
		);
	},
} );
