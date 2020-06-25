class Table extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
    template.innerHTML = `
      <style>
        :host {
          box-sizing: border-box;
          display: flex;
          flex-basis: 0;
          flex-direction: column;
          flex-grow: 1;
          position: relative;
        }

        div.columns {
          display: flex;
          flex-direction: row;
        }

        div.list {
          background-color: #ffffff;
          border: solid 1px #e1e1e1;          
          border-radius: 4px;          
          flex-basis: 0;
          flex-grow: 1;
          overflow: scroll; 
        }

        div.list div {
          border-bottom: solid 1px #e1e1e1;
          display: flex;
          flex-direction: row;
        }

        div.list div:last-of-type {
          border-bottom: solid 1px transparent;
        }

        div.list div p {
          color: #2c2c2c;
          font-family: 'Source Sans Pro', sans-serif;
          font-size: 16px;
          line-height: 50px;
          margin: 0;
          padding: 0;
        }
      </style>
      <div 
        class="columns">
        <slot></slot>
      </div>
      <div
        class="list">
      </div>
      `;

    // Properties
    this._data = [];

    // Root
    const shadowRoot = this.attachShadow( {mode: 'open'} );
    shadowRoot.appendChild( template.content.cloneNode( true ) );      

    // Elements
    this.$columns = shadowRoot.querySelector( 'div.columns' );
    this.$list = shadowRoot.querySelector( 'div.list' );
  }

  // Render
  _render() {
    // Clean up
    // Remove previous
    while( this.$list.children.length > 0 ) {
      this.$list.children[0].remove();
    }

    for( let d = 0; d < this.data.length; d++ ) {
      const row = document.createElement( 'div' );
      
      for( let c = 0; c < this.children.length; c++ ) {
        let column = null;

        if( this.children[c].renderer === null ) {
          column = document.createElement( 'p' );
        } else {
          column = document.createElement( this.children[c].renderer );
        }

        if( this.children[c].label === null ) {
          if( this.children[c].labelFunction === null ) {
            column.data = this.data[d];
          } else {
            column.innerText = window[this.children[c].labelFunction]( this.data[d] );
          }
        } else {
          column.innerText = this.data[d][this.children[c].label];          
        }

        if( this.children[c].width === null ) {
          column.style.flexBasis = 0;
          column.style.flexGrow = 1;
        } else {
          column.style.minWidth = `${this.children[c].width}px`;
          column.style.width = `${this.children[c].width}px`;
        }

        row.appendChild( column );
      }

      this.$list.appendChild( row );
    }
  }

  // Attributes
  static get observedAttributes() {
    return [];
  }  

  // Changed
  attributeChangedCallback( name, old, value ) {
    this._render();
  }  

  get data() {
    return this._data;
  }

  set data( value ) {
    this._data = value;
    this._render();
  }
}

window.customElements.define( 'mx-table', Table );
