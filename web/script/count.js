class Count {
  constructor() {
    this._root = document.querySelector( '#count' );  
    this._root.setAttribute( 'data-value', 0 );
  }

  get data() {
    return parseInt( this._root.getAttribute( 'data-value' ) );
  }

  set data( value ) {
    this._root.setAttribute( 'data-value', value );
    this._root.innerHTML = `You have logged ${value} pees today.`;
  }
}
