class PeeAndSee {
  constructor() {
    // Properties
    // TODO: Login screen
    const email = 'parkerkrhoyt@gmail.com';
    const password = 'blahblahblah';

    // Elements
    // Main screen
    // TODO: Login screen
    this._main = new Main();

    // Login
    // TODO: Login screen
    fetch( `${PeeAndSee.API_ENDPONT}${PeeAndSee.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        email: email,
        password: password 
      } )
    } )
    .then( ( response ) => response.json() )
    .then( ( data ) => {
      // Debug
      console.log( data );

      // Set account data
      this._main.account = data;
    } );
  }
}  

// Constants
PeeAndSee.API_ENDPONT = 'https://us-south.functions.cloud.ibm.com/api/v1/web/krhoyt%40us.ibm.com_dev/pee/';
PeeAndSee.GET_VISITS = 'browse-visit';
PeeAndSee.LOGIN = 'login-account';
PeeAndSee.MILLIS_IN_HOUR = 3600000;

// Start
const app = new PeeAndSee();
