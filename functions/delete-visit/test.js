// Load function parameters
require( 'dotenv' ).config( {path: '../local.env'} );

remove( {
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  MYSQL_PORT: process.env.MYSQL_PORT,
  id: 'a6c1f76b-a402-40fc-9f7a-18af17fca45e'
} );

async function remove( params ) {
  // Visit ID is required
  if( !params.id ) {
    return {
      body: {
        message: 'ID query string parameter is required.'
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

  // Query
  await new Promise( ( resolve, reject ) => {
    // Statement
    connection.query( {
      sql: 'DELETE FROM Visit WHERE Visit.uuid = ?',
      values: params.id
    }, ( error, results, fields ) => {
      // Bzzt!
      if( error ) throw error;

      // Test
      console.log( results );

      // Results
      resolve( {
        id: params.id
      } );
    } );
  } );

  // Close
  connection.end();  
}
