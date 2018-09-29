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


    buildTable();



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
            myDatabase.ref().push({
                trainName : trainName,
                destination: destination,
                departTime : departTime,
                frequency : frequency
            });
            
            $('#trainTable').append(`<tr><td>${trainName}</td><td>${destination}</td><td>${departTime}</td><td>${frequency}</td></tr>`);
           
    });

    //build table is called on click, ref method references databse once, passing the database object to the function
    //val method return snapshot, and it is assigned to latestSnapshot.
    function buildTable(){
        myDatabase.ref().once("value", function (snapshot) {
            var latestSnapshot = snapshot.val();
            for(var looper in latestSnapshot){
                
                $('#trainTable').append(`<tr><td>${latestSnapshot[looper].trainName}</td><td>${latestSnapshot[looper].destination}</td><td>${latestSnapshot[looper].departTime}</td><td>${latestSnapshot[looper].frequency}</td></tr>`);
            }
            
        });
    }
    




    //bonus todo attach document on click to displayed table rows so they can be removed, and removed from firebase database







});