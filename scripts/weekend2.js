console.log( 'weekend2 sourced' );
// json url
var jsonURL = 'http://devjana.net/pi/pi_students.json';
var students = [];
var currentStudent = 0;

$( document ).ready( function(){
  // get students json
  $.ajax({
    url: jsonURL,
    dataType: 'JSON',
    success: function( data ){
      console.log( 'json data:', data );
      // store in students array
      students = data.students;
      displayCurrentStudent( 0 );
    }
  }); //end ajax
  // on click events delegated to body because they are dyanmically added
  $( 'body' ).on( 'click', '#nextButton', function(){
    nextStudent();
  }); // end nextButton on click

  $( 'body' ).on( 'click', '#prevButton', function(){
    previousStudent();
  }); // end prevButton on click

  $( 'body' ).on( 'click', '.setStudent', function(){
    // get the data-index tag from html with $( this ).attr
    // make it a number and set it as currentStudent
    currentStudent = Number( $( this ).attr( "data-index" ) );
    // update display
    displayCurrentStudent( 327 );
  }); // end setStudent on click
}); // end document ready

var displayCurrentStudent = function( fadeTime ){
  // this function receives a "fadeTime". When sent 0 there is no fade )used on page load
  console.log( 'in displayStudent', currentStudent, students[ currentStudent ] );
  // store the output div
  var outputDiv = $( '#outputDiv' );
  // generate our student text
  var headline = '<h2>' + students[ currentStudent ].first_name + ' ' + students[ currentStudent ].last_name + '</h2>';
  var infoLine = '<h3>' + students[ currentStudent ].info + '</h3>';
  // adjust the index for display (base 1)
  var adjustedIndex = currentStudent +1;
  var countLine = '<p>' + adjustedIndex + '/' + students.length + '</p>';
  // using a callback function in fadeout so things cascade correctly
  outputDiv.fadeOut( fadeTime, function(){
    // this function is run after the fade out (using fadeTime) is complete
    outputDiv.empty().append( headline + infoLine + countLine ).fadeIn(fadeTime);
  });
  // button div holds the buttonz
  var buttonDiv = $( '#buttonDiv' );
  buttonDiv.empty();
  // append the prev button
  buttonDiv.append( '<button id="prevButton"> - Prev - </button>');
  for (var i = 0; i < students.length; i++) {
    // for each student append a button with class "setStudent" and data-index of the student's index in array
    buttonDiv.append( '<button class="setStudent" data-index=' + i + '>' + students[i].first_name + '</button>' )
  }
  // append the next button
  buttonDiv.append( '<button id="nextButton"> - Next - </button>' );

}; //end displayStudent

var previousStudent = function(){
  // decrement currentStudent
  currentStudent--;
  // wrap if below 0
  if( currentStudent < 0 ){
    currentStudent = students.length-1;
  }
  displayCurrentStudent( 327 );
}; // end previousStudent

var nextStudent = function(){
  // increment currentStudent
  currentStudent++;
  // wrap if greater than or equal to length of array
  if( currentStudent >= students.length ){
    currentStudent = 0;
  }
  displayCurrentStudent( 327 );
}; // end next student

var setCurrentStudent = function( index ){
  // directly set currentStudent
  currentStudent = index;
  displayCurrentStudent( 327 );
}; // end setCurrentStudent
