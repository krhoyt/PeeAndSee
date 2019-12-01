// Load function parameters
require( 'dotenv' ).config( {path: '../local.env'} );

create( {
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  MYSQL_PORT: process.env.MYSQL_PORT,
  email: 'krhoyt@us.ibm.com',
  password: 'blahblahblah'
} );

async function create( params ) {
  // Account email is required
  if( !params.email ) {
    return {
      body: {
        message: 'Email field is required.'
      }
    };
  }

  // Account password is required
  if( !params.password ) {
    return {
      body: {
        message: 'Password field is required.'
      }
    };
  }  

  // Libraries used by function
  const bcrypt = require( 'bcryptjs' );
  const mysql = require( 'mysql' );

  // Connect to MySQL
  // Compose
  const connection = mysql.createConnection( {
    host: params.MYSQL_HOST,
    port: params.MYSQL_PORT,
    user: params.MYSQL_USER,
    password: params.MYSQL_PASSWORD,
    database: params.MYSQL_DATABASE
  } );
  connection.connect();

  // Check if account exists
  let account = await new Promise( ( resolve, reject ) => {
    // Statement
    connection.query( {
      sql: 'SELECT * FROM Account WHERE Account.email = ?',
      values: params.email.trim()
    }, ( error, results, fields ) => {
      // Bzzt!
      if( error ) throw error;

      if( results.length === 0 ) {
        // Nope        
        // Return null to continue
        resolve( null );
      } else {
        // Yup
        // Return first (and only) row
        resolve( results[0] );
      }
    } );    
  } );

  // Close
  connection.end();  

  // Account exists
  if( account !== null ) {
    // Check hash
    const valid = bcrypt.compareSync( params.password, account.password );

    // Password does not match
    if( !valid ) {
      // Test
      console.log( 'No match.' );

      return {
        body: {
          message: 'Email or password is not correct.'
        }
      };
    }

    // Test
    console.log( account );

    // Password does match
    // Return account
    return {
      body: {
        id: account.uuid,
        created_at: account.created_at,
        updated_at: account.updated_at,
        email: account.email,
        verified: account.verified        
      }
    };    
  }

  // Test
  console.log( 'No account.' );

  // Account does not exist
  return {
    body: {
      message: 'Account does not exist.'
    }
  };
}
