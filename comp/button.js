class Button extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
    template.innerHTML = `
      <style>
        :host {
          box-sizing: border-box;
          position: relative;
        }

        button {
          background: none;
          background-position: left 14px center;
          background-repeat: no-repeat;
          background-size: 18px;  
          border: none;
          border-radius: 18px;
          font-family: 'Source Sans Pro', sans-serif;
          font-size: 14px;
          font-weight: 700;  
          height: 32px;  
          outline: none;  
          padding: 0 14px 0 14px;        
        }
        
        button.command {
          background-color: rgb( 13, 102, 208 );   
          color: white;
          line-height: 32px;	
        }

        button.icon {
          border: solid 2px transparent;
          color: rgb( 75, 75, 75 );
          line-height: 28px;
          padding: 0 23px 0 23px;
        }

        button.primary {
          border: solid 2px rgb( 75, 75, 75 );
          color: rgb( 75, 75, 75 );
          line-height: 28px;	
        }        
      </style>
      <button type="button"></button>
      `;

    // Properties
    this._data = [];

    // Root
    const shadowRoot = this.attachShadow( {mode: 'open'} );
    shadowRoot.appendChild( template.content.cloneNode( true ) );      

    // Elements
    this.$button = shadowRoot.querySelector( 'button' );
  }

  // Attributes
  static get observedAttributes() {
    return [
      'icon',
      'kind',
      'text'
    ];
  }  

  // Changed
  attributeChangedCallback( name, old, value ) {
    this.$button.className = this.kind === null ? 'primary' : this.kind;
    this.$button.innerText = this.text === null ? '' : this.text;
    this.$button.style.paddingLeft = '';    

    if( this.kind === 'icon' ) {
      this.$button.style.backgroundImage = `url( ${this.icon} )`;
    } else {
      if( this.icon === null ) {
        this.$button.style.backgroundImage = '';      
      } else {
        this.$button.style.backgroundImage = `url( ${this.icon} )`;              
        this.$button.style.paddingLeft = '40px';
      }
    }
  }  

  get icon() {
    if( this.hasAttribute( 'icon' ) ) {
      return this.getAttribute( 'icon' );
    }

    return null;
  }

  set icon( value ) {
    if( value !== null ) {
      this.setAttribute( 'icon', value );
    } else {
      this.removeAttribute( 'icon' );
    }
  }  

  get kind() {
    if( this.hasAttribute( 'kind' ) ) {
      return this.getAttribute( 'kind' );
    }

    return null;
  }

  set kind( value ) {
    if( value !== null ) {
      this.setAttribute( 'kind', value );
    } else {
      this.removeAttribute( 'kind' );
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
}

window.customElements.define( 'mx-button', Button );
