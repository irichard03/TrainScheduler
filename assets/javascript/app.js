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
    var tripTIme;
    var departTime; 
    var currentTime = moment().format('HH:mm');
    var intervalController;
    var intervalController2;
    var nextArrival;
    var timeNow = currentTime;
    console.log(currentTime);

    setClock();
    buildTable();



    //stretch todo collapsable form
    $('#hideFormButton').click(function(){
        
    });

  
    


    //Click Event adds train to database and table.
    $('#addTrainButton').click(function(){
        
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
            $('#trainTable').append(`<tr><td>${trainName}</td><td>${destination}</td><td>${tripTime}</td><td>${minutesOut}</td></tr>`);
           
    });

    //build table is called on page load, writes all existing trains in database to table.
    function buildTable(){
        myDatabase.ref().once("value", function (snapshot) {
            var latestSnapshot = snapshot.val();
            for(var looper in latestSnapshot){
                
                
                $('#trainTable').append(`<tr><td>${latestSnapshot[looper].trainName}</td><td>${latestSnapshot[looper].destination}</td><td>${latestSnapshot[looper].tripTime}</td><td class="nextArrival">${nextArrival}<td class="minutesOut">${minutesOut}</tr>`);
            }
            
        });
    }
    


    //toDo function to run clock (setInterval)
    function setClock(){
        $('.clock').text(currentTime);
        intervalController = setInterval(function(){
            currentTime = moment().format('HH:mm ss');
            $('.clock').text(currentTime);
        },1000);
    }

    
    
    //add function to calc next arrival time, pass in departTime and frequency as parameters
   
    //1. pass departTime and frequency into function.
    //2. check format of those values.
    //3. subtract start time from current time if negative or equal, return start time + frequnecy.
    



    //bonus todo attach document on click to displayed table rows so they can be removed, and removed from firebase database







});