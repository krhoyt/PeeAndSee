class Label extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
    template.innerHTML = `
      <style>
        :host {
          box-sizing: border-box;
          position: relative;
        }

        p {
          box-sizing: border-box;
          color: #2c2c2c;
          cursor: default;
          font-family: 'Source Sans Pro', sans-serif;
          font-size: 14px;
          font-weight: 400;
          margin: 0;
          padding: 0;
          user-select: none;
        }

        .truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      </style>
      <p></p>
    `;

    // Properties
    this._data = null;

    // Root
    const shadowRoot = this.attachShadow( {mode: 'open'} );
    shadowRoot.appendChild( template.content.cloneNode( true ) );

   // References
    this.$label = shadowRoot.querySelector( 'p' );
  }

  // Attributes
  static get observedAttributes() {
    return [
      'basis',
      'color',
      'cursor',
      'disabled',
      'disabled-color',
      'font-size',
      'font-weight',
      'grow',
      'height',
      'hidden',
      'padding-bottom',
      'padding-left',
      'padding-right',
      'padding-top',
      'selectable',
      'text',
      'text-align',
      'text-decoration',
      'text-transform',
      'truncate',
      'width'
    ];
  }

  // Render
  attributeChangedCallback( name, old, value ) {
    // Host properties
    this.style.display = this.hidden === false ? '' : 'none';
    this.style.flexBasis = this.basis === null ? '' : this.basis;
    this.style.flexGrow = this.grow === null ? '' : this.grow;
    this.style.height = this.height === null ? '' : ( this.height + 'px' );
    this.style.minWidth = this.width === null ? '' : ( this.width + 'px' );
    this.style.width = this.width === null ? '' : ( this.width + 'px' );

    // Element properties
    this.$label.innerText = this.text === null ? '' : this.text;

    // Styles
    if( this.disabled ) {
      if( this.disabledColor !== null ) {
        this.$label.style.color = this.disabledColor === null ? '' : this.disabledColor;
      } else {
        this.$label.style.color = this.color === null ? '' : this.color;
      }
    } else {
      this.$label.style.color = this.color === null ? '' : this.color;
    }

    this.$label.style.fontSize = this.fontSize === null ? '' : ( this.fontSize + 'px' );
    this.$label.style.fontWeight = this.fontWeight === null ? '' : this.fontWeight;
    this.$label.style.paddingBottom = this.paddingBottom === null ? '' : ( this.paddingBottom + 'px' );
    this.$label.style.paddingLeft = this.paddingLeft === null ? '' : ( this.paddingLeft + 'px' );
    this.$label.style.paddingRight = this.paddingRight === null ? '' : ( this.paddingRight + 'px' );
    this.$label.style.paddingTop = this.paddingTop === null ? '' : ( this.paddingTop + 'px' );
    this.$label.style.userSelect = this.selectable === true ? 'auto' : 'none';
    this.$label.style.textAlign = this.textAlign === null ? '' : this.textAlign;
    this.$label.style.textDecoration = this.textDecoration === null ? '' : this.textDecoration;
    this.$label.style.textTransform = this.textTransform === null ? '' : this.textTransform;

    // Classes
    if( this.truncate ) {
      this.$label.classList.add( 'truncate' );
    } else {
      this.$label.classList.remove( 'truncate' );
    }
  }

  get basis() {
    if( this.hasAttribute( 'basis' ) ) {
      return parseInt( this.getAttribute( 'basis' ) );
    }

    return null;
  }

  set basis( value ) {
    if( value !== null ) {
      this.setAttribute( 'basis', value );
    } else {
      this.removeAttribute( 'basis' );
    }
  }

  get color() {
    if( this.hasAttribute( 'color' ) ) {
      return this.getAttribute( 'color' );
    }

    return null;
  }

  set color( value ) {
    if( value !== null ) {
      this.setAttribute( 'color', value );
    } else {
      this.removeAttribute( 'color' );
    }
  }

  get data() {
    return this._data;
  }

  set data( value ) {
    this._data = value;
  }

  get disabled() {
    return this.hasAttribute( 'disabled' );
  }

  set disabled( value ) {
    if( value !== null ) {
      if( value === 'false' ) {
        this.removeAttribute( 'disabled' );
      } else {
        this.setAttribute( 'disabled', '' );
      }
    } else {
      this.removeAttribute( 'disabled' );
    }
  }

  get disabledColor() {
    if( this.hasAttribute( 'disabled-color' ) ) {
      return this.getAttribute( 'disabled-color' );
    }

    return null;
  }

  set disabledColor( value ) {
    if( value !== null ) {
      this.setAttribute( 'disabled-color', value );
    } else {
      this.removeAttribute( 'disabled-color' );
    }
  }

  get fontSize() {
    if( this.hasAttribute( 'font-size' ) ) {
      return parseInt( this.getAttribute( 'font-size' ) );
    }

    return null;
  }

  set fontSize( value ) {
    if( value !== null ) {
      this.setAttribute( 'font-size', value );
    } else {
      this.removeAttribute( 'font-size' );
    }
  }

  get fontWeight() {
    if( this.hasAttribute( 'font-weight' ) ) {
      return parseInt( this.getAttribute( 'font-weight' ) );
    }

    return null;
  }

  set fontWeight( value ) {
    if( value !== null ) {
      this.setAttribute( 'font-weight', value );
    } else {
      this.removeAttribute( 'font-weight' );
    }
  }

  get grow() {
    if( this.hasAttribute( 'grow' ) ) {
      return parseInt( this.getAttribute( 'grow' ) );
    }

    return null;
  }

  set grow( value ) {
    if( value !== null ) {
      this.setAttribute( 'grow', value );
    } else {
      this.removeAttribute( 'grow' );
    }
  }

  get height() {
    if( this.hasAttribute( 'height' ) ) {
      return parseInt( this.getAttribute( 'height' ) );
    }

    return null;
  }

  set height( value ) {
    if( value !== null ) {
      this.setAttribute( 'height', value );
    } else {
      this.removeAttribute( 'height' );
    }
  }

  get hidden() {
    return this.hasAttribute( 'hidden' );
  }

  set hidden( value ) {
    if( value !== null ) {
      if( value === 'false' ) {
        this.removeAttribute( 'hidden' );
      } else {
        this.setAttribute( 'hidden', '' );
      }
    } else {
      this.removeAttribute( 'hidden' );
    }
  }

  get paddingBottom() {
    if( this.hasAttribute( 'padding-bottom' ) ) {
      return parseInt( this.getAttribute( 'padding-bottom' ) );
    }

    return null;
  }

  set paddingBottom( value ) {
    if( value !== null ) {
      this.setAttribute( 'padding-bottom', value );
    } else {
      this.removeAttribute( 'padding-bottom' );
    }
  }

  get paddingLeft() {
    if( this.hasAttribute( 'padding-left' ) ) {
      return parseInt( this.getAttribute( 'padding-left' ) );
    }

    return null;
  }

  set paddingLeft( value ) {
    if( value !== null ) {
      this.setAttribute( 'padding-left', value );
    } else {
      this.removeAttribute( 'padding-left' );
    }
  }

  get paddingRight() {
    if( this.hasAttribute( 'padding-right' ) ) {
      return parseInt( this.getAttribute( 'padding-right' ) );
    }

    return null;
  }

  set paddingRight( value ) {
    if( value !== null ) {
      this.setAttribute( 'padding-right', value );
    } else {
      this.removeAttribute( 'padding-right' );
    }
  }

  get paddingTop() {
    if( this.hasAttribute( 'padding-top' ) ) {
      return parseInt( this.getAttribute( 'padding-top' ) );
    }

    return null;
  }

  set paddingTop( value ) {
    if( value !== null ) {
      this.setAttribute( 'padding-top', value );
    } else {
      this.removeAttribute( 'padding-top' );
    }
  }

  get selectable() {
    return this.hasAttribute( 'selectable' );
  }

  set selectable( value ) {
    if( value !== null ) {
      if( value === 'false' ) {
        this.removeAttribute( 'selectable' );
      } else {
        this.setAttribute( 'selectable', '' );
      }
    } else {
      this.removeAttribute( 'selectable' );
    }
  }

  get text() {
    if( this.hasAttribute( 'text' ) ) {
      return this.getAttribute( 'text' );
    }

    return null;
  }

  set text( value ) {
    if( value !== null ) {
      this.setAttribute( 'text', value );
    } else {
      this.removeAttribute( 'text' );
    }
  }

  get textAlign() {
    if( this.hasAttribute( 'text-align' ) ) {
      return this.getAttribute( 'text-align' );
    }

    return null;
  }

  set textAlign( value ) {
    if( value !== null ) {
      this.setAttribute( 'text-align', value );
    } else {
      this.removeAttribute( 'text-align' );
    }
  }

  get textDecoration() {
    if( this.hasAttribute( 'text-decoration' ) ) {
      return this.getAttribute( 'text-decoration' );
    }

    return null;
  }

  set textDecoration( value ) {
    if( value !== null ) {
      this.setAttribute( 'text-decoration', value );
    } else {
      this.removeAttribute( 'text-decoration' );
    }
  }

  get textTransform() {
    if( this.hasAttribute( 'text-transform' ) ) {
      return this.getAttribute( 'text-transform' );
    }

    return null;
  }

  set textDecoration( value ) {
    if( value !== null ) {
      this.setAttribute( 'text-transform', value );
    } else {
      this.removeAttribute( 'text-transform' );
    }
  }

  get truncate() {
    return this.hasAttribute( 'truncate' );
  }

  set truncate( value ) {
    if( value !== null ) {
      if( value === 'false' ) {
        this.removeAttribute( 'truncate' );
      } else {
        this.setAttribute( 'truncate', '' );
      }
    } else {
      this.removeAttribute( 'truncate' );
    }
  }

  get width() {
    if( this.hasAttribute( 'width' ) ) {
      return parseInt( this.getAttribute( 'width' ) );
    }

    return null;
  }

  set width( value ) {
    if( value !== null ) {
      this.setAttribute( 'width', value );
    } else {
      this.removeAttribute( 'width' );
    }
  }
}

window.customElements.define( 'mx-label', Label );
