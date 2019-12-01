// Create a visit record
async function create( params ) {
  // Account ID is required
  if( !params.id ) {
    return {
      body: {
        message: 'ID query string parameter is required.'
      }
    };
  }

  // Libraries used by function
  const mysql = require( 'mysql' );
  const uuidv4 = require( 'uuid' );

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
  const account = await new Promise( ( resolve, reject ) => {
    connection.query( {
      sql: 'SELECT * FROM Account WHERE uuid = ?',
      values: params.id
    }, ( error, results, fields ) => {
      // Bzzt!
      if( error ) throw error;

      if( results.length === 0 ) {
        resolve( null );
      } else {
        // Query returns array
        // Only want single record
        resolve( results[0] );
      }
    } );
  } );

  // No matching account
  if( account === null ) {
    // Close
    connection.end();

    // Return error message
    return {
      body: {
        message: 'Account does not exist.'
      }
    };
  }

  // Insert
  const visit = await new Promise( ( resolve, reject ) => {
    // Build record
    // UUID is ID to user
    const record = {
      id: uuidv4(),
      created_at: new Date(),
      account_id: account.uuid
    };

    // Statement
    connection.query( {
      sql: 'INSERT INTO Visit SET ?',
      values: {
        id: null,
        uuid: record.id,
        account_id: account.id,
        created_at: record.created_at
      }
    }, ( error, results, fields ) => {
      // Bzzt!
      if( error ) throw error;

      // Results
      // Record
      resolve( record );
    } );
  } );

  // Close
  connection.end();  

  // Return JSON body
  // Details of recorded visit
  return {
    body: visit
  };
}

// Main
exports.main = create;
