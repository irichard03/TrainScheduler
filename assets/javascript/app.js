//On page load do this
$(function(){
    
    
    //declare firebase object, passing in my configuration settings.
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
    
    //calls set interval to display clock
    setClock();
    //calls build Table to show trains input by other users.
    buildTable();

    //Click Event adds train to database and table, calls clear fields to clear input, and get arrival to calc next arrival and minutes till arrival
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
            getArrival(departTime,tripTime);
            $('#trainTable').append(`<tr><td>${trainName}</td><td>${destination}</td><td>${parseInt(tripTime)}</td><td>${nextArrival}</td><td>${minutesOut}</td></tr>`);
           
    });
    
    //function to clear fields after adding train.
    function clearFields(){
        $('.addTrain').val('');
        $('.addDestination').val('');
        $('.addDepartTime').val('');
        $('.addTripTime').val('');
    }

    //build table is called on page load, writes all existing trains in database to table, calles getArrival.
    function buildTable(){
        myDatabase.ref().once("value", function (snapshot) {
            var latestSnapshot = snapshot.val();
            for(var looper in latestSnapshot){
                getArrival(latestSnapshot[looper].departTime,latestSnapshot[looper].tripTime);
                $('#trainTable').append(`<tr><td>${latestSnapshot[looper].trainName}</td><td>${latestSnapshot[looper].destination}</td><td>${latestSnapshot[looper].tripTime}</td><td class="nextArrival">${nextArrival}<td class="minutesOut">${minutesOut}</tr>`);
            }
            
        });
    }
    
    // function to run clock (setInterval)
    function setClock(){
        $('.clock').text(currentTime);
        intervalController = setInterval(function(){
            currentTime = moment().format('HH:mm ss');
            $('.clock').text(currentTime);
        },1000);
    }
    
    //I had to copy and refactor the activity code for this section
    //get arrival takes in two arguments, start and trip, assigns them to local varibales.
    //Then I pass the startTime as an argument, along with desired format to moment, and call it's subtract method with argument # to subtract,
    // and moment object parameter to subtract from???
    //minutes different get's current time, and then get's difference between it and the start time in minutes.
    //remainder is assigned the remainder of the difference/train frequency.
    //minutes out (time till next train) is set to equal the frequency - the remainder.
    //minutes out and next arrival are returned to the calling function.
    function getArrival(start,trip){
        var frequency = trip;
        var startTime = start;
        convertedStartTime = moment(startTime, "HH:mm").subtract(1, "years");
        var minutesDifferent = moment().diff(moment(convertedStartTime), "minutes");    
        console.log(frequency);
        console.log(startTime);
        console.log(convertedStartTime);
        console.log(minutesDifferent);
        
        var remainder = minutesDifferent % frequency;
        console.log("Remainder is: " + remainder);
        minutesOut = frequency - remainder;
        console.log("Minutes until next train:" + minutesOut);
        var addArrival = moment().add(minutesOut, "minutes");
        nextArrival = moment(addArrival).format("HH:mm");
    }
});