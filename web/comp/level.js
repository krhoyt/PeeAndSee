class Level extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
    template.innerHTML = `
      <style>
        :host {
          align-items: center;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          position: relative;
        }

        div {
          border-radius: 8px;
          height: 8px;
          width: 8px;
        }

        div.green {
          background-color: #44b556;
        }

        div.red {
          background-color: #d83790;
        }

        div.yellow {
          background-color: #dfbf00;
        }
      </style>
      <div></div>
      `;

    // Properties
    this._data = null;

    // Root
    const shadowRoot = this.attachShadow( {mode: 'open'} );
    shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$level = shadowRoot.querySelector( 'div' );
  }

  // Render
  _render() {
    this.$level.className = this.data.level;
  }

  get data() {
    return this._data;
  }

  set data( value ) {
    this._data = value;
    this._render();
  }
}

window.customElements.define( 'pee-level', Level );
