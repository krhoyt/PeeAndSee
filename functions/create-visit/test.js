// Load function parameters
require( 'dotenv' ).config( {path: '../local.env'} );

create( {
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  MYSQL_PORT: process.env.MYSQL_PORT,
  id: 'abc-123'
} );

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
  await new Promise( ( resolve, reject ) => {
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
}
