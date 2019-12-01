// Load function parameters
require( 'dotenv' ).config( {path: '../local.env'} );

create( {
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  MYSQL_PORT: process.env.MYSQL_PORT,
  DEFAULT_DAYS: 30,
  id: '1636fa1b-e3e8-4bfc-bb96-f06641772615'
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

  // Optional number of days
  // Days in the past  
  // Defaults to ninety days  
  if( !params.days ) {
    params.days = parseInt( params.DEFAULT_DAYS );
  } else {
    params.days = parseInt( params.days );
  }

  let start = new Date();
  start.setDate( start.getDate() - params.days );

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

  // Query
  let visits = await new Promise( ( resolve, reject ) => {
    // Statement
    connection.query( {
      sql: `
        SELECT 
          Visit.uuid AS "id", 
          Account.uuid AS "account_id",
          Visit.created_at 
        FROM 
          Account, 
          Visit 
        WHERE 
          Account.id = Visit.account_id AND 
          Visit.created_at > ? AND
          Account.uuid = ? 
        ORDER BY created_at DESC`,
      values: [start, params.id]
    }, ( error, results, fields ) => {
      // Bzzt!
      if( error ) throw error;

      // Test
      console.log( results );

      // Results
      resolve( results );
    } );
  } );

  // Close
  connection.end();  
}
