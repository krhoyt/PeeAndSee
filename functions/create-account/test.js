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

  // Account exists
  // Return that record
  if( account !== null ) {
    // Close
    connection.end();  

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
  // Continue on to create record
  // Start with computationally expensive salt/hash
  const salt = bcrypt.genSaltSync( 10 );
  const hash = bcrypt.hashSync( params.password.trim(), salt );

  // Insert
  account = await new Promise( ( resolve, reject ) => {
    // Build record
    // UUID is ID to user
    const record = {
      id: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
      email: params.email.trim(),
      password: hash,
      verified: 0
    };

    // Statement
    connection.query( {
      sql: 'INSERT INTO Account SET ?',
      values: {
        id: null,
        uuid: record.id,
        created_at: record.created_at,
        updated_at: record.updated_at,
        email: record.email,
        password: record.password,
        verified: record.verified
      }
    }, ( error, results, fields ) => {
      // Bzzt!
      if( error ) throw error;

      // Results
      // Record
      resolve( {
        id: record.id,
        created_at: record.created_at,
        updated_at: record.updated_at,
        email: record.email,
        password: record.password,
        verified: record.verified        
      } );
    } );
  } );

  // Test
  console.log( account );

  // Close
  connection.end();  
}
