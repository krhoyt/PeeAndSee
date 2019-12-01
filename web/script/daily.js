class Daily {
  constructor( path ) {
    this._root = document.querySelector( path );
    this._root.setAttribute( 'data-value', 0 ); 
    this._data = this._root.querySelector( 'p:first-of-type' );
    this._label = this._root.querySelector( 'p:last-of-type' );
  }

  get data() {
    return parseFloat( this._root.getAttribute( 'data-value' ) );
  }

  set data( value ) {
    this._data.innerText = value;
  }

  get label() {
    return this._label.innerText;
  }

  set label( value ) {
    this._label.innerText = value;
  }  
}
