//  Import CSS.
import './style.scss';
import './editor.scss';

const __ = wp.i18n.__;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

const generateId = () => Math.random().toString( 36 ).substr( 2, 9 );

registerBlockType( 'as/toggles', {
	title: __( 'Accordéons', 'lang' ),
	icon: 'menu',
	category: 'common',
	keywords: [ __( 'Toggles' ) ],

	attributes: {
		toggles: {
			type: 'array',
			default: [ {
				id: generateId(),
				title: '',
				content: '',
			} ],
		},
	},

	edit: ( props ) => {
		const { setAttributes, attributes } = props;
		const { toggles } = attributes;

		const onChangeToggle = ( value, key, toggle ) => {
			const newArray = toggles.map( tog => {
				if ( tog.id === toggle.id ) {
					tog[ key ] = value;
				}
				return tog;
			} );

			return setAttributes( {
				toggles: newArray,
			} );
		};

		const removeToggle = ( toggle ) => {
			const newArray = toggles.filter( tog => tog.id !== toggle.id );

			return setAttributes( {
				toggles: newArray,
			} );
		};

		const togglesList = () => toggles
			.map( toggle => {
				return (
					<div key={ toggle.id } >

						<RichText
							tagName="p"
							className={ props.className + '-title' }
							onChange={ ( value ) => onChangeToggle( value, 'title', toggle ) }
							placeholder={ __( 'Titre', 'lang' ) }
							keepPlaceholderOnFocus={ true }
							value={ toggle.title }
						/>

						<RichText
							tagName="p"
							className={ props.className + '-content' }
							onChange={ ( value ) => onChangeToggle( value, 'content', toggle ) }
							placeholder={	__( 'Contenu', 'lang' ) }
							keepPlaceholderOnFocus={ true }
							value={ toggle.content }
						/>
						<button
							className="button-gutenberg components-button is-button is-default"
							onClick={ () => removeToggle( toggle ) }
						>Supprimer</button>
						<hr />
					</div>
				);
			} );

		return (
			<div className={ props.className } >
				{ togglesList() }
				<button
					className="button-gutenberg components-button editor-post-publish-button is-button is-large is-primary"
					onClick={ () => setAttributes( {
						toggles: [
							...attributes.toggles,
							{
								id: generateId(),
								title: '',
								content: '',
							},
						],
					} )
					} >
					Ajouter
				</button>
			</div>
		);
	},
	save: () => null,
} );
