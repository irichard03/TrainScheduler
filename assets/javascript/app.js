//On page load do this, too lazy for doc ready? Let's try this.
$(function(){
    //console.log("bootsrap works.");
    
    //declare firebase object.
    var config = {
        apiKey: "AIzaSyCdYIqcArlVzcxg3ZHkZGwIaCB2N7gBdo8",
        authDomain: "myseconddatabase-5c086.firebaseapp.com",
        databaseURL: "https://myseconddatabase-5c086.firebaseio.com",
        projectId: "myseconddatabase-5c086",
        storageBucket: "myseconddatabase-5c086.appspot.com",
        messagingSenderId: "502094714443"
    };
    //initialize firebase with config object with my firebase settings
    firebase.initializeApp(config);

    //create my database instance and declare variables to store form inputs.
    var myDatabase = firebase.database();
    var trainName;
    var destination;
    var frequency;
    var departTime; 

    //stretch todo collapsable form
    $('#hideFormButton').click(function(){
        console.log("buttonworks");
    });

  
    


    //todo attach onclick to buttons for form inputs and firebase writes.
    $('#addTrainButton').click(function(){
        console.log("buttonworks");
            trainName = $('.addTrain').val().trim();
            destination = $('.addDestination').val().trim();
            departTime = $('.addDepartTime').val().trim();
            frequency = $('.addTrainFrequency').val().trim();
            console.log(trainName);
            console.log(destination);
            console.log(departTime);
            console.log(frequency);
    });

    //todo use  .once to display previously entered firebase 

    //bonus todo attach document on click to displayed table rows so they can be removed, and removed from firebase database







});