// Remove specific visit
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

      // Results
      resolve( {
        id: params.id
      } );
    } );
  } );

  // Close
  connection.end();  

  // Return JSON body
  // ID for removed visit record
  return {
    body: {
      id: params.id
    }
  };
}

// Main
exports.main = remove;
