//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

registerBlockType( 'as/intro', {
	title: __( 'Introduction', 'lang' ),
	icon: 'media-text',
	category: 'common',
	attributes: {
		content: {
			type: 'string',
		},
	},
	edit: props => {
		const { className, attributes, setAttributes } = props;

		return (
			<p>
				<RichText
					tagName="strong"
					className={ className }
					onChange={ content => setAttributes( { content } ) }
					placeholder={ __( 'Titre', 'lang' ) }
					value={ attributes.content }
					keepPlaceholderOnFocus={ true }
					formattingControls={ [] }
					style={ { opacity: '0.6' } }
				/>
			</p>
		);
	},
	save( props ) {
		const { attributes } = props;
		return <p className="lead">{ attributes.content }</p>;
	},
} );
