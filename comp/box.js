class Box extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
    template.innerHTML = `
      <style>
        :host {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          padding: 0;
          position: relative;
          margin: 0;
        }
      </style>
      <slot></slot>
    `;

    // Root
    const shadowRoot = this.attachShadow( {mode: 'open'} );
    shadowRoot.appendChild( template.content.cloneNode( true ) );
  }

  // Defaults
  connectedCallback() {
    // this.color = this.hasAttribute( 'color' ) === false ? '#2c2c2c' : this.color;
  }

  // Attributes
  static get observedAttributes() {
    return [
      'align',
      'background',
      'basis',
      'cursor',
      'direction',
      'grow',
      'height',
      'hidden',
      'justify',
      'overflow',
      'padding-bottom',
      'padding-left',
      'padding-right',
      'padding-top',
      'position',
      'radius',
      'width'
    ];
  }

  // Render
  attributeChangedCallback( name, old, value ) {
    // Host properties
    this.style.alignItems = this.align === null ? '' : this.align;
    this.style.backgroundColor = this.background === null ? '' : this.background; 
    this.style.borderRadius = this.radius === null ? '' : ( this.radius + 'px' );     
    this.style.display = this.hidden === false ? '' : 'none';
    this.style.cursor = this.cursor === null ? '' : this.cursor;
    this.style.flexBasis = this.basis === null ? '' : this.basis;
    this.style.flexDirection = this.direction === null ? '' : this.direction;
    this.style.flexGrow = this.grow === null ? '' : this.grow;
    this.style.height = this.height === null ? '' : ( this.height + 'px' );
    this.style.justifyContent = this.justify === null ? '' : this.justify;
    this.style.minWidth = this.width === null ? '' : ( this.width + 'px' );
    this.style.overflow = this.overflow === null ? '' : this.overflow;
    this.style.paddingBottom = this.paddingBottom === null ? '' : ( this.paddingBottom + 'px' );
    this.style.paddingLeft = this.paddingLeft === null ? '' : ( this.paddingLeft + 'px' );
    this.style.paddingRight = this.paddingRight === null ? '' : ( this.paddingRight + 'px' );
    this.style.paddingTop = this.paddingTop === null ? '' : ( this.paddingTop + 'px' );
    this.style.position = this.position === null ? '' : this.position;
    this.style.width = this.width === null ? '' : ( this.width + 'px' );
  }

  get align() {
    if( this.hasAttribute( 'align' ) ) {
      return this.getAttribute( 'align' );
    }

    return null;
  }

  set align( value ) {
    if( value !== null ) {
      this.setAttribute( 'align', value );
    } else {
      this.removeAttribute( 'align' );
    }
  }

  get background() {
    if( this.hasAttribute( 'background' ) ) {
      return this.getAttribute( 'background' );
    }

    return null;
  }

  set background( value ) {
    if( value !== null ) {
      this.setAttribute( 'background', value );
    } else {
      this.removeAttribute( 'background' );
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

  get cursor() {
    if( this.hasAttribute( 'cursor' ) ) {
      return this.getAttribute( 'cursor' );
    }

    return null;
  }

  set cursor( value ) {
    if( value !== null ) {
      this.setAttribute( 'cursor', value );
    } else {
      this.removeAttribute( 'cursor' );
    }
  }

  get direction() {
    if( this.hasAttribute( 'direction' ) ) {
      return this.getAttribute( 'direction' );
    }

    return null;
  }

  set direction( value ) {
    if( value !== null ) {
      this.setAttribute( 'direction', value );
    } else {
      this.removeAttribute( 'direction' );
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

  get justify() {
    if( this.hasAttribute( 'justify' ) ) {
      return this.getAttribute( 'justify' );
    }

    return null;
  }

  set justify( value ) {
    if( value !== null ) {
      this.setAttribute( 'justify', value );
    } else {
      this.removeAttribute( 'justify' );
    }
  }

  get overflow() {
    if( this.hasAttribute( 'overflow' ) ) {
      return this.getAttribute( 'overflow' );
    }

    return null;
  }

  set overflow( value ) {
    if( value !== null ) {
      this.setAttribute( 'overflow', value );
    } else {
      this.removeAttribute( 'overflow' );
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

  get position() {
    if( this.hasAttribute( 'position' ) ) {
      return this.getAttribute( 'position' );
    }

    return null;
  }

  set position( value ) {
    if( value !== null ) {
      this.setAttribute( 'position', value );
    } else {
      this.removeAttribute( 'position' );
    }
  }

  get radius() {
    if( this.hasAttribute( 'radius' ) ) {
      return parseInt( this.getAttribute( 'radius' ) );
    }

    return null;
  }

  set radius( value ) {
    if( value !== null ) {
      this.setAttribute( 'radius', value );
    } else {
      this.removeAttribute( 'radius' );
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

window.customElements.define( 'hoyt-box', Box );
