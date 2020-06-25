class Chart extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
    template.innerHTML = `
      <style>
        :host {
          box-sizing: border-box;
          display: flex;
          flex-basis: 0;
          position: relative;
        }

        svg {
          flex-basis: 0;
          flex-grow: 1;
        }
      </style>
      <svg></svg>
      `;

    // Properties
    this._data = [];
    this._labels = ['Last', 'Today', '3', '6', '10', '20', '50', '100'];

    // Root
    const shadowRoot = this.attachShadow( {mode: 'open'} );
    shadowRoot.appendChild( template.content.cloneNode( true ) );      

    // Render surface
    this.$vector = shadowRoot.querySelector( 'svg' );
  }

  // Wait for attach for first render
  // Otherwise no dimensions
  connectedCallback() {
    this._render();
  }

  _render() {    
    // Clean up
    // Remove previous
    while( this.$vector.children.length > 0 ) {
      this.$vector.children[0].remove();
    }

    this.style.flexGrow = this.grow === null ? '' : this.grow;
    this.style.height = this.height === null ? '' : `${this.height}px`;

    // Not ready to draw
    // Move along
    if( this.$vector.clientWidth === 0 ) {
      return;
    }

    // Column width: 48
    // Padding left: 12
    // Padding right: 12
    // Units width: 24
    const columns = ( this.$vector.clientWidth - 48 ) / 8;

    // Column labels
    for( let c = 0; c < 8; c++ ) {
      const text = document.createElementNS( 'http://www.w3.org/2000/svg', 'text' );
      text.style.fontFamily = '\'Source Sans Pro\', sans-serif';
      text.style.fontSize = '14px';
      text.setAttributeNS( null, 'alignment-baseline', 'hanging' );
      text.setAttributeNS( null, 'dominant-baseline', 'hanging' );
      text.setAttributeNS( null, 'fill', '#4b4b4b' );
      text.setAttributeNS( null, 'text-anchor', 'middle' );
      text.setAttributeNS( null, 'x', 36 + ( c * columns ) + ( columns / 2 ) );
      text.textContent = this._labels[c];
      this.$vector.appendChild( text );
    }

    // Units
    // Maximum value
    const maximum = document.createElementNS( 'http://www.w3.org/2000/svg', 'text' );
    maximum.style.fontFamily = '\'Source Sans Pro\', sans-serif';
    maximum.style.fontSize = '11px';
    maximum.setAttributeNS( null, 'alignment-baseline', 'middle' );
    maximum.setAttributeNS( null, 'dominant-baseline', 'middle' );
    maximum.setAttributeNS( null, 'fill', '#6e6e6e' );
    maximum.setAttributeNS( null, 'text-anchor', 'middle' );
    maximum.setAttributeNS( null, 'x', 24 );
    maximum.setAttributeNS( null, 'y', 21 );    
    maximum.textContent = '0h';
    this.$vector.appendChild( maximum );

    // Line under labels
    const underline = document.createElementNS( 'http://www.w3.org/2000/svg', 'rect' );
    underline.setAttributeNS( null, 'fill', '#e1e1e1' );
    underline.setAttributeNS( null, 'height', 1 );    
    underline.setAttributeNS( null, 'width', this.$vector.clientWidth - 48 );        
    underline.setAttributeNS( null, 'x', 36 );    
    underline.setAttributeNS( null, 'y', 21 );

    this.$vector.appendChild( underline );
  }

  // Attributes
  static get observedAttributes() {
    return [
      'grow',
      'height',
    ];
  }  

  // Render
  attributeChangedCallback( name, old, value ) {
    this.style.height = this.height === null ? '' : ( this.height + 'px' );       
    this._render();
  }  

  get data() {
    return this._data;
  }

  set data( value ) {
    this._data = value;
    this._render();
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
}

window.customElements.define( 'pee-chart', Chart );
