//On page load do this, too lazy for doc ready? Let's try this.
$(function(){
    
    
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
    var tripTime;
    var departTime; 
    var currentTime = moment().format('HH:mm');
    var intervalController;
    var intervalController2;
    var nextArrival;
    var timeNow = currentTime;
    var minutesOut;
    

    setClock();
    buildTable();



    //stretch todo collapsable form
    $('#hideFormButton').click(function(e){
        e.preventDefault();
    });

  
    


    //Click Event adds train to database and table.
    $('#addTrainButton').click(function(e){
            e.preventDefault();
            trainName = $('.addTrain').val().trim();
            destination = $('.addDestination').val().trim();
            departTime = $('.addDepartTime').val().trim();
            tripTime = $('.addTripTime').val().trim();
            clearFields();
            myDatabase.ref().push({
                trainName : trainName,
                destination: destination,
                departTime : departTime,
                tripTime : tripTime,
            });
            console.log(departTime);
            console.log(tripTime);
            $('#trainTable').append(`<tr><td>${trainName}</td><td>${destination}</td><td>${parseInt(tripTime)}</td><td>${minutesOut}</td></tr>`);
           
    });
    
    //function to clear fields after adding train.
    function clearFields(){
        $('.addTrain').val('');
        $('.addDestination').val('');
        $('.addDepartTime').val('');
        $('.addTripTime').val('');
    }

    //build table is called on page load, writes all existing trains in database to table.
    function buildTable(){
        myDatabase.ref().once("value", function (snapshot) {
            var latestSnapshot = snapshot.val();
            for(var looper in latestSnapshot){
                nextArrival = getArrival(latestSnapshot[looper].departTime,latestSnapshot[looper].tripTime);
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

    function getArrival(start,trip){
        var frequency = trip;
        var startTime = start.toString();
        convertedStartTime = moment(startTime, "HH:mm");
        var minutesDifferent = moment().diff(moment(convertedStartTime), "minutes");    //I don't understand this.
        console.log(frequency);
        console.log(startTime);
        console.log(convertedStartTime);
        console.log(minutesDifferent);

        /**
        if(moment(timeNow).format('HH:mm') <= (moment(start).format('HH:mm'))){
            minutesOut = start - timeNow;
            return start + trip;  
        }else{
            var x = timeNow - start;
            var y = x%trip;
            mintuesOut = y;
            var n = x/trip;
            var z = start + (trip*n);
            return z;
        }
    */
       return "nothing";
    }
    
    
    //add function to calc next arrival time, pass in departTime and frequency as parameters
   
    //1. pass departTime and frequency into function.
    //2. check format of those values.
    
    //3. subtract start time from current time if negative or equal, return start time + frequnecy.
    
    //4. If positive use modulus on diffference between start time current time, minutes until arrival = the remainder.


    //bonus todo attach document on click to displayed table rows so they can be removed, and removed from firebase database







});