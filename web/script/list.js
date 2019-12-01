class List {
  constructor() {
    this._root = document.querySelector( '#list' );     
    this._data = null;
    this._template = document.querySelector( 'template' );
  }

  clear() {
    while( this._root.children.length > 0 ) {
      this._root.children[0].remove();
    }
  }

  render() {
    let last = null;

    for( let d = 0; d < this._data.length; d++ ) {
      // Row
      let clone = document.importNode( this._template.content, true );
      
      // Keep ID
      // For delete row
      // TODO: Add delete row
      let row = clone.querySelector( 'div' );
      row.setAttribute( 'data-id', this._data[d].id );

      // Status light
      // Color based on duration of time between
      let light = clone.querySelector( 'div.light' );

      if( last === null ) {
        light.classList.add( 'green' );
        last = new Date( this._data[d].created_at );
      } else {
        light.classList.add( 'red' );
      }

      // Date logged
      // 4 Dec 2004 @ 12:34 PM
      let logged = clone.querySelector( 'p:first-of-type' );
      logged.innerText = moment( this._data[d].created_at ).format( 'D MMM YYYY @ h:mm A' );

      // Time between
      let between = clone.querySelector( 'p:last-of-type' );

      // Add to list
      this._root.appendChild( clone );
    }
  }

  get data() {
    return this._data;
  }

  set data( value ) {
    if( value === null ) {
      this.clear();
    } else {
      if( value.length === 0 ) {
        this.clear();
      } else {
        this._data = value.slice();

        this.clear();
        this.render();
      }
    }
  }
}
