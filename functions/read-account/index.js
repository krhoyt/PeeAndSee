// Read a visit record
async function read( params ) {
  // Account ID is required
  if( !params.id ) {
    return {
      body: {
        message: 'Account ID query parameter is required.'
      }
    };
  }

  // Libraries used by function
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
      sql: 'SELECT * FROM Account WHERE Account.uuid = ?',
      values: params.id
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
  // Return that record
  if( account !== null ) {
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

  // Account does not exist
  return {
    body: {
      message: 'Account does not exist.'
    }
  };
}

// Main
exports.main = read;
