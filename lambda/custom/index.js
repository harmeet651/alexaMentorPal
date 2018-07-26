'use strict';

var Alexa = require('alexa-sdk');
var flag=0;
var streamInfo = {
  title: 'Audio Stream Starter',
  subtitle: 'A starter template for an Alexa audio streaming skill.',
  cardContent: "Get more details at: https://skilltemplates.com",
  url1: 'https://s3.amazonaws.com/harmeetsingh/Daaru+Band-(Mr-Jatt.com).mp3',
  url2: 'https://s3.amazonaws.com/harmeetsingh/clintanderson_A1_1_1+(online-audio-converter.com).mp3',
  image: {
    largeImageUrl: 'https://s3.amazonaws.com/cdn.dabblelab.com/img/alexa-card-lg.png',
    smallImageUrl: 'https://s3.amazonaws.com/cdn.dabblelab.com/img/alexa-card-sm.png'
  }
};

exports.handler = (event, context, callback) => {
  var alexa = Alexa.handler(event, context, callback);

  alexa.registerHandlers(
    handlers,
    audioEventHandlers
  );

  alexa.execute();
};

var handlers = {

  'LaunchRequest': function() {
    //this.emit('tell','Tell a question number');
    //this.emit('PlayStream');
    this.emit(':ask','Welcome');
  },
  'IntentToCallQues' : function() {
    //var start = this.event.request.intent.slots["NUMBER"].value;
      //this.emit(':tell', start);
      // if(!start)
      // {
      //   //this.emit(':ask', 'hello aaaaaaaaaa');
      //   this.emit('Unhandled');
      // }
      // else
      // {
         //this.emit(':ask', 'oo hello');
         flag=1;
         this.emit('PlayStream');
         //this.response.shouldEndSession(false, 'Repromt krdo hume');
      // }
  },
  'IntentToCallQuesTwo' : function() {
    //var start = this.event.request.intent.slots["NUMBER"].value;
      //this.emit(':tell', start);
      // if(!start)
      // {
      //   //this.emit(':ask', 'hello aaaaaaaaaa');
      //   this.emit('Unhandled');
      // }
      // else
      // {
         //this.emit(':ask', 'oo hello');
         flag=0;
         this.emit('PlayStream');
         //this.response.shouldEndSession(false, 'Repromt krdo hume');
      // }
  },
  'Handler' : function() {
    this.emit(':ask','khatam');
  },
  //'MentorPalIntent': function () {

//     var MentorPals = {

//     "questionone" : {
//         "ansNumber": "answer",
//         "answer": "is this"
//     }, 
//     "questiontwo" : {
//         "ansNumber": "answer",
//         "answer": "is this"
//     }, 
//     "questionthree" : {
//         "ansNumber": "Answer",
//         "answer": "is this"
//     }, 
//     "questionfour" : {
//         "ansNumber": "Answer",
//         "answer": "is this"
//     }, 
//     "questionfive" : {
//         "ansNumber": "Answer",
//         "answer": "is this"
//     }, 
//     "question six" : {
//         "ansNumber": "Answer",
//         "answer": "is this"
//     }, 
//     "questionseven" : {
//         "ansNumber": "Answer",
//         "answer": "is this"
//      }
// }
    
//     //var guessNum = parseInt(this.event.request.intent.slots.number.value);

//      var speechOutput = "Welcome to Mentor Pal! I can tell you about our US navy heroes. I can only give answers about one question at a time. What question are you interested in, question one, two, three?"

//      //var reprompt = "Which question are you interested in? You can say question one, question two and so on."

//     this.emit(':ask', speechOutput);

//     const intentObj = this.event.request.intent;
//     if (!intentObj.slots.MentorPal.value){
//       console.log("ni aya");
//         var speechOutput2 = "I do not have answer to this question. Try asking question one, question two, till seven";
//         var repromptText = "Try asking any other question";
//         //var header = "Not Valid question";
//     } 
//     else {
//       console.log("aya");
//         var ansNumber = MentorPals[MentorPal].ansNumber;
//         var answer = MentorPals[MentorPal].answer;
//         //var speechOutput2 = capitalizeFirst(MentorPal) + " " + ansNumber + " " + answer + ". Do you want to know more?";
//         var speechOutput2="ayegegeggege";
//         var repromptText = "Do you want to know anything else?";
//         //var header = capitalizeFirst(MentorPal);
//     }
//     this.emit(':tell', PlayStream);
 // },
  'PlayStream': function() {
    if(flag==0)
      {
        this.emit(':ask', '<audio src= "https://s3.amazonaws.com/harmeetsingh/Daaru+Band-(Mr-Jatt.com).mp3" />');
        // this.response.speak('Enjoy 1.').audioPlayerPlay('REPLACE_ALL', streamInfo.url1, streamInfo.url1, null, 0);
        // this.emit(':responseReady');
      }
    else
      {
        //this.emit(':ask', '<audio src= "https://s3.amazonaws.com/harmeetsingh/Daaru+Band-(Mr-Jatt.com).mp3" />');
        this.response.speak('Enjoy 2.').audioPlayerPlay('REPLACE_ALL', streamInfo.url2, streamInfo.url2, null, 0);
        this.emit(':responseReady');
      }
    //this.response.shouldEndSession(false);
  },
  'AMAZON.HelpIntent': function() {
    // skill help logic goes here
    this.emit(':responseReady');
  },
  'SessionEndedRequest': function() {
    // no session ended logic needed
  },
  'ExceptionEncountered': function() {
    console.log("\n---------- ERROR ----------");
    console.log("\n" + JSON.stringify(this.event.request, null, 2));
    this.callback(null, null)
  },
  'Unhandled': function() {
    this.emit(':tell', 'aa gya unhndled me');
    this.emit(':tell', 'hahaha');
    this.response.speak('Sorry. Something went wrong.');
    this.emit(':responseReady');
   },
  'AMAZON.NextIntent': function() {
    this.response.speak('This skill does not support skipping.');
    this.emit(':responseReady');
  },
  'AMAZON.PreviousIntent': function() {
    this.response.speak('This skill does not support skipping.');
    this.emit(':responseReady');
  },
  'AMAZON.PauseIntent': function() {
    this.emit('AMAZON.StopIntent');
  },
  'AMAZON.CancelIntent': function() {
    this.emit('AMAZON.StopIntent');
  },
  'AMAZON.StopIntent': function() {
    this.response.speak('Okay. I\'ve stopped the stream.').audioPlayerStop();
    this.emit(':responseReady');
  },
  'AMAZON.ResumeIntent': function() {
    this.emit('PlayStream');
  },
  // 'AMAZON.LoopOnIntent': function() {
  //   this.emit('AMAZON.StartOverIntent');
  // },
  // 'AMAZON.LoopOffIntent': function() {
  //   this.emit('AMAZON.StartOverIntent');
  // },
  // 'AMAZON.ShuffleOnIntent': function() {
  //   this.emit('AMAZON.StartOverIntent');
  // },
  // 'AMAZON.ShuffleOffIntent': function() {
  //   this.emit('AMAZON.StartOverIntent');
  // },
  'AMAZON.StartOverIntent': function() {
    this.response.speak('Sorry. I can\'t do that yet.');
    this.emit(':responseReady');
  },
  'AMAZON.YesIntent': function() {
    this.emit('LaunchRequest');
  },
  'AMAZON.NoIntent': function() {
    this.emit(':tell', 'By then!');
  },
   'PlayCommandIssued': function() {

     if (this.event.request.type === 'IntentRequest') {
       var cardTitle = streamInfo.subtitle;
       var cardContent = streamInfo.cardContent;
       var cardImage = streamInfo.image;
       this.response.cardRenderer(cardTitle, cardContent, cardImage);
     }

     this.response.speak('Enjoy.').audioPlayerPlay('REPLACE_ALL', streamInfo.url, streamInfo.url, null, 0);
     this.emit(':responseReady');
   },
   'PauseCommandIssued': function() {
     this.emit('AMAZON.StopIntent');
   }
}

var audioEventHandlers = {
  'PlaybackStarted': function() {
    this.emit(':responseReady');
  },
  'PlaybackFinished': function() {
    this.emit(':responseReady');
  },
  'PlaybackStopped': function() {
    this.emit(':responseReady');
  },
  'PlaybackNearlyFinished': function() {
    //this.response.audioPlayerPlay('REPLACE_ALL', streamInfo.url, streamInfo.url, null, 0);
    //this.emit(':responseReady');
    this.emit(':ask', 'Do you have any other questions for me?');
  },
  'PlaybackFailed': function() {
    this.response.audioPlayerClearQueue('CLEAR_ENQUEUED');
    this.emit(':responseReady');
  }
}
