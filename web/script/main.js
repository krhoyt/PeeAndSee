class Main extends Screen {
  constructor() {
    super( '#main' );

    // Properties
    this._account = null;
    this._visits = null;

    // Daily count
    this._count = new Count();
    this._count.data = 0;

    // Time since last
    this._last = new Daily( '.overview > div:first-of-type' );
    this._last.data = 0;

    // Time between visits
    // For today
    this._between = new Daily( '.overview > div:last-of-type' );
    this._between.data = 0;

    // Historical chart
    this._chart = new Chart();

    // Export to CSV
    this._export = document.querySelector( 'button.quiet' );
    this._export.addEventListener( 
      this._touch ? 'touchstart' : 'click', 
      ( evt ) => this.doExport( evt ) 
    );

    // Create entry in the past
    this._old = document.querySelector( 'button.primary' );
    this._old.addEventListener( 
      this._touch ? 'touchstart' : 'click', 
      ( evt ) => this.doCreateOld( evt ) 
    );    

    // Create entry right now
    this._new = document.querySelector( 'button.command' );
    this._new.addEventListener( 
      this._touch ? 'touchstart' : 'click', 
      ( evt ) => this.doCreateNew( evt ) 
    );

    // List of past visits
    this._list = new List();
  }

  render( list = true ) {
    let average = 0;
    let count = 0;
    let last = new Date().getTime();

    let today = new Date();
    today.setHours( 0 );
    today.setMinutes( 0 );
    today.setSeconds( 0 );
    today.setMilliseconds( 0 );

    for( let v = 0; v < this._visits.length; v++ ) {
      // Parse created date
      const created = new Date( this._visits[v].created_at );
      
      // Compare to today
      if( created.getTime() > today.getTime() ) {
        count = count + 1;
      }

      // Sum for averaging
      if( v > 0 ) {
        average = average + ( last - created.getTime() );
        last = created.getTime();      
      }
    }

    console.log( average / this._visits.length );

    // Set count statistic
    this._count.data = count;

    last = new Date( this._visits[0].created_at );
    last = new Date().getTime() - last.getTime();

    let hours = Math.floor( last );
    let minutes = ( last - hours ) * 60;
    console.log( last / PeeAndSee.MILLIS_IN_HOUR );

    if( hours >= 24 ) {
      this._last.data = '> 1d';
    } else {
      if( hours >= 1 ) {
        this._last.data = `${hours}h ${minutes}m`;
      } else {
        this._last.data = '${minutes}m';
      }
    }

    // Send history to list
    this._list.data = this._visits;
  }

  get account() {
    return this._account;
  }

  set account( value ) {
    // Store account data
    this._account = Object.assign( {}, value );

    // Get visit data
    fetch( `${PeeAndSee.API_ENDPONT}${PeeAndSee.GET_VISITS}?id=${this._account.id}` )
    .then( ( response ) => response.json() )
    .then( ( data ) => {
      // Debug
      console.log( data );

      // Store
      this._visits = data.slice();

      // Calculate statistics
      // Render to screen
      this.render();
    } );
  }

  doCreateNew( evt ) {
    alert( 'New' );
  }

  doCreateOld( evt ) {
    alert( 'Old' );
  }

  doExport( evt ) {
    alert( 'Export' );
  }
}

