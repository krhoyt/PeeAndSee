const app = new Vue( {
  el: '#app',
  data: {
    history: [],
    latitude: null,
    longitude: null
  },
  created: () => {
    // Track geolocation
    navigator.geolocation.getCurrentPosition( ( position ) => this.doPosition( position ) );
  },
  computed: {
    logged: () => {
      return `You have logged ${this.history.length} pee${this.history.length === 1 ? '' : 's'} today.`;
    }
  },
  methods: {
    doPosition: ( position ) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    }
  }
} );

/*
class PeeSee {
  constructor() {
    // Elements
    this.$log = document.querySelector( '#log' );
    this.$last = document.querySelector( '#last' );
    this.$today = document.querySelector( '#today' );  
    this.$chart = document.querySelector( 'pee-chart' );
    this.$export = document.querySelector( '#export' );
    this.$old = document.querySelector( '#old' );
    this.$add = document.querySelector( '#add' );
    this.$add.addEventListener( 'mousedown', ( evt ) => this.doAdd( evt ) );
    this.$table = document.querySelector( 'mx-table' );

    // Track geolocation
    this._latitude = null;
    this._longitude = null;


    // Data from local store
    this._data = this._read();

    // Populate UI
    this.$log.text = `You have logged ${this._data.length} pee${this._data.length === 1 ? '' : 's'} today.`;    
    this.$chart.data = this._data;
    this.$table.data = this._data;  
  }

  doAdd( evt ) {
    // Add data in memory
    this._data.push( {
      level: 'red', 
      logged_at: new Date(), 
      between: 1.2,
      latitude: this._latitude,
      longitude: this._longitude
    } );

    // Update UI
    this.$log.text = `You have logged ${this._data.length} pee${this._data.length === 1 ? '' : 's'} today.`;    
    this.$table.data = this._data;

    // Save to local storage
    this._update();
  }

  doPosition( position ) {
    this._latitude = position.coords.latitude;
    this._longitude = position.coords.longitude;
    console.log( position );
  }

  _read() {
    // Read from local storage
    // Data exists as string
    // Parse into array of objects
    const data = JSON.parse( window.localStorage.getItem( 'pee-and-see' ) );

    // No data in local store
    if( data === null ) {
      data = [];
    }

    return data;
  }

  _update() {
    // Save to local storage
    // Only good for this browser on this device
    // Storage expects string
    window.localStorage.setItem( 'pee-and-see', JSON.stringify( this._data ) );
  }
}  

// Main
const app = new PeeSee();
*/
