//On page load do this, too lazy for doc ready? Let's try this.
$(function(){
    //console.log("bootsrap works.");
    

    //stretch todo collapsable form
    $('#hideFormButton').click(function(){
        console.log("buttonworks");
    });

    //todo declare firebase config object, initialize firebase database
    var config = {
        apiKey: "AIzaSyCdYIqcArlVzcxg3ZHkZGwIaCB2N7gBdo8",
        authDomain: "myseconddatabase-5c086.firebaseapp.com",
        databaseURL: "https://myseconddatabase-5c086.firebaseio.com",
        projectId: "myseconddatabase-5c086",
        storageBucket: "myseconddatabase-5c086.appspot.com",
        messagingSenderId: "502094714443"
    };
    
    firebase.initializeApp(config);


    //todo attach onclick to buttons for form inputs and firebase writes.
    $('#addTrainButton').click(function(){
        console.log("buttonworks");
    });

    //todo use  .once to display previously entered firebase 

    //bonus todo attach document on click to displayed table rows so they can be removed, and removed from firebase database







});