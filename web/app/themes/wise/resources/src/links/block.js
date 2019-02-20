//  Import CSS.
import './style.scss';
import './editor.scss';

const __ = wp.i18n.__;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload } = wp.editor;
const { SelectControl } = wp.components;

const generateId = () => Math.random().toString( 36 ).substr( 2, 9 );

registerBlockType( 'as/links', {
	title: __( 'Links' ),
	icon: 'admin-links',
	category: 'common',
	keywords: [ __( 'Links' ) ],

	attributes: {
		links: {
			type: 'array',
			default: [ {
				id: generateId(),
				icon: 'download',
				text: '',
				link: {
					display: false,
					data: '',
				},
				image: '',
			} ],
		},
	},

	edit: ( props ) => {
		const { setAttributes, attributes } = props;
		const { links } = attributes;
		const ALLOWED_MEDIA_TYPES = [ 'application/pdf' ];

		const onChangeLink = ( value, key, link ) => {
			const newArray = links.map( item => {
				if ( item.id === link.id ) {
					item[ key ] = value;
				}
				return item;
			});

			return setAttributes( {
				links: newArray,
			} );
		};

		const removeLink = ( link ) => {
			const newArray = links.filter( item => item.id !== link.id );

			return setAttributes( {
				links: newArray,
			} );
		};

		const buttonAddLink = ( link ) => {
			if ( !link.link.display ) {
				return (
					<button
						onClick={ () => AddALink( link ) }
						className='button-gutenberg components-button is-button is-default'
					>URL</button>
				)
			}
		};

		const AddALink = ( link ) => {
			const newArray = links.map( item => {
				if ( item.id === link.id ) {
					item[ 'link' ][ 'display' ] = true;
				}
				return item;
			} );

			return setAttributes( {
				links: newArray,
			} );
		};

		const displayNameImage = ( link ) => {
			if ( link.image !== '' ) {
				return (
					<span className="imageName"> { link.image.filename }</span>
				)
			}
		};

		const displayLink = ( link ) => {
			if ( link.link.display === false ) {
				return 'hidden';
			}
			return '';
		};

		const displayImageButton = ( link ) => {
			if ( link.link.display !== false ) {
				return 'hidden';
			}
			return '';
		};

		const onImageSelect = ( data, media ) => {
			const newArray = links.map( link => {
				if ( data.id === link.id ) {
					link[ 'image' ] = media;
				}
				return link;
			});

			return setAttributes( {
				links: newArray,
			} );
		};

		const linksList = () => links
			.map( link => {
				return (
					<div key={ link.id } >
						<SelectControl
							label={ __( 'Selectionner une icône :' ) }
							onChange={ ( value ) => onChangeLink( value, 'icon', link ) }
							value={ link.icon }
							options={ [
								{ value: 'download', label: 'Télécharger' },
								{ value: 'arrow-right', label: 'Flèche à droite' },
							] }
							style={ { width: '200px' } }
						/>
						<RichText
							tagName="p"
							className={ props.className }
							onChange={ ( value ) => onChangeLink( value, 'text', link ) }
							placeholder={ __( 'Insérez ici le texte de votre lien', 'lang' ) }
							keepPlaceholderOnFocus={ true }
							value={ link.text }
							formattingControls={ [] }
						/>
						<RichText
							type="text"
							tagName="p"
							className={ `${ props.className } link ${ displayLink( link ) }` }
							onChange={ ( value ) => onChangeLink( value, 'link', link ) }
							placeholder={ __( 'Saisissez votre URL', 'lang' ) }
							keepPlaceholderOnFocus={ true }
							value={ link.link }
							formattingControls={ [] }
						/>
						<MediaUpload
							className={ `${ props.className } media ${ displayImageButton( link ) }` }
							onSelect={ ( media ) => onImageSelect( link, media ) }
							type="image"
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							value={ link.image.id }
							render={ ( { open } ) => (
								<button
									onClick={ open }
									className={ `button-gutenberg components-button is-button is-default ${ displayImageButton( link ) }` }
								>PDF
								</button>
							) }
						/>
						{ displayNameImage( link ) }
						{ buttonAddLink( link ) }
						<br />
						<button
							className="button-gutenberg components-button is-button is-default"
							onClick={ () => removeLink( link ) }
							style={ { marginTop: '25px', marginBottom: '10px', background: '#ffc0c0' } }
						>Supprimer ce lien</button>
						<hr />
					</div>
				);
			} );

		return (
			<div className={ props.className } >
				{ linksList() }
				<button
					className="button-gutenberg components-button editor-post-publish-button is-button is-large is-primary"
					onClick={ () => setAttributes( {
						links: [
							...attributes.links,
							{
								id: generateId(),
								icon: 'download',
								text: '',
								link: {
									display: false,
									data: '',
								},
								image: '',
							},
						],
					} )
					} >
					Ajouter un lien
				</button>
			</div>
		);
	},
	save: () => null,
} );
