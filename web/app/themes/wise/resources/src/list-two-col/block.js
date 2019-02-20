//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

registerBlockType( 'as/list-two-col', {
	title: __( 'Liste deux colonnes', 'lang' ),
	icon: 'list-view',
	category: 'common',
	attributes: {
		left: {
			type: 'string',
		},
		right: {
			type: 'string',
		},
	},
	edit: props => {
		const { className, attributes, setAttributes } = props;

		return (
			<div className={ className }>
				<div className="col">
					<RichText
						tagName="ul"
						multiline="li"
						onChange={ left => setAttributes( { left } ) }
						placeholder={ __( 'Liste', 'lang' ) }
						value={ attributes.left }
						keepPlaceholderOnFocus={ true }
					/>
				</div>
				<div className="col">
					<RichText
						tagName="ul"
						multiline="li"
						onChange={ right => setAttributes( { right } ) }
						placeholder={ __( 'Liste', 'lang' ) }
						value={ attributes.right }
						keepPlaceholderOnFocus={ true }
					/>
				</div>
			</div>
		);
	},
	save: () => null,
} );
