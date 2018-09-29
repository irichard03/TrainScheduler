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
            departTime = parseInt($('.addDepartTime').val().trim());
            frequency = parseInt($('.addTrainFrequency').val().trim());
            myDatabase.ref('Trains/' + trainName).push({
                trainName : trainName,
                destination: destination,
                departTime : departTime,
                frequency : frequency
            });
            
            buildTable();
           
    });

    //build table is called on click, 
    function buildTable(){
        myDatabase.ref().once("value", function (snapShot) {
            var latestSnapshot = snapShot.val();
            console.log(latestSnapshot);
        
        
        });
        //$('#trainTable').append(`<tr><td>${trainName}</td><td>${destination}</td><td>${departTime}</td><td>${frequency}</td></tr>`);
    }
    

    //display all trains previously input to datbase

    //
    //bonus todo attach document on click to displayed table rows so they can be removed, and removed from firebase database







});