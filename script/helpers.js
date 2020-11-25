// Label functions
// For table formatting
// https://speedysense.com/convert-float-to-time-in-javascript
function between( data ) {
  const ratio = 1 / 60;

  // Hours
  const hour = Math.floor( data.between );
  
  // Seperate decimal
  let decimal = data.between - hour;

  // Minutes
  // Round to nearest minute
  decimal = ratio * Math.round( decimal / ratio );
  const minute = Math.floor( decimal * 60 );

  // Format
  return `${hour}h ${minute}m`;
}

function logged( data ) {
  return dateFns.format( new Date( data.logged_at ), 'd MMM YYYY @ h:mm A' );
}
