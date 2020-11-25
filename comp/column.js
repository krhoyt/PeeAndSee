class Column extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
    template.innerHTML = `
      <style>
        :host {
          box-sizing: border-box;
          display: flex;
          position: relative;
        }

        button {
          background: none;
          border: none;
          color: #6e6e6e;
          flex-basis: 0;
          flex-grow: 1;
          font-family: 'Source Sans Pro', sans-serif;
          font-size: 11px;
          line-height: 34px;
          margin: 0;
          outline: none;
          padding: 0;
          text-align: left;
          text-transform: uppercase;  
        }
      </style>
      <button 
        type="button">
      </button>
      `;

    // Properties
    this._data = [];

    // Root
    const shadowRoot = this.attachShadow( {mode: 'open'} );
    shadowRoot.appendChild( template.content.cloneNode( true ) );      

    // Elements
    this.$label = shadowRoot.querySelector( 'button' );
  }

  // Attributes
  static get observedAttributes() {
    return [
      'label',
      'label-function',
      'renderer',
      'text',
      'width'
    ];
  }  

  // Render
  attributeChangedCallback( name, old, value ) {
    // Host
    this.style.flexBasis = this.width === null ? 0 : '';
    this.style.flexGrow = this.width === null ? 1 : '';
    this.style.width = this.width === null ? '' : `${this.width}px`;
    this.style.minWidth = this.minWidth === null ? '' : `${this.width}px`;

    // Elements
    this.$label.innerText = this.text === null ? '' : this.text;
  }  

  get label() {
    if( this.hasAttribute( 'label' ) ) {
      return this.getAttribute( 'label' );
    }

    return null;
  }

  set label( value ) {
    if( value !== null ) {
      this.setAttribute( 'label', value );
    } else {
      this.removeAttribute( 'label' );
    }
  }  

  get labelFunction() {
    if( this.hasAttribute( 'label-function' ) ) {
      return this.getAttribute( 'label-function' );
    }

    return null;
  }

  set labelFunction( value ) {
    if( value !== null ) {
      this.setAttribute( 'label-function', value );
    } else {
      this.removeAttribute( 'label-function' );
    }
  }    

  get renderer() {
    if( this.hasAttribute( 'renderer' ) ) {
      return this.getAttribute( 'renderer' );
    }

    return null;
  }

  set renderer( value ) {
    if( value !== null ) {
      this.setAttribute( 'renderer', value );
    } else {
      this.removeAttribute( 'renderer' );
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

window.customElements.define( 'mx-column', Column );
