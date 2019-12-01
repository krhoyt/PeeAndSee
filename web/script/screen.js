class Screen {
  constructor( path ) {
    this._touch = ( "ontouchstart" in document.documentElement ) ? true : false;
    this._root = document.querySelector( path );
  }
}
