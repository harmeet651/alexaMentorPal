'use strict';

var Alexa = require('alexa-sdk');

var streamInfo = {
  title: 'Audio Stream Starter',
  subtitle: 'A starter template for an Alexa audio streaming skill.',
  cardContent: "Get more details at: https://skilltemplates.com",
  url: 'https://s3.amazonaws.com/harmeetsingh/Daaru+Band-(Mr-Jatt.com).mp3',
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
    this.emit('MentorPalIntent');
  },
  'MentorPalIntent': function () {
    var MentorPals = {

    "questionone" : {
        "ansNumber": "answer",
        "answer": "is this"
    }, 
    "questiontwo" : {
        "ansNumber": "answer",
        "answer": "is this"
    }, 
    "questionthree" : {
        "ansNumber": "Answer",
        "answer": "is this"
    }, 
    "questionfour" : {
        "ansNumber": "Answer",
        "answer": "is this"
    }, 
    "questionfive" : {
        "ansNumber": "Answer",
        "answer": "is this"
    }, 
    "question six" : {
        "ansNumber": "Answer",
        "answer": "is this"
    }, 
    "questionseven" : {
        "ansNumber": "Answer",
        "answer": "is this"
     }
}
     var speechOutput = "Welcome to Mentor Pal! I can tell you about our US navy heroes. I can only give answers about one question at a time. What question are you interested in, question one, two, three?"

     var reprompt = "Which question are you interested in? You can say question one, question two and so on."

    // var header = "Mentor Pal Q/A!"

    // var shouldEndSession = false

    // var sessionAttributes = {
    //     "speechOutput" : speechOutput,
    //     "repromptText" : reprompt
    // }

    // callback(sessionAttributes, buildSpeechletResponse(header, speechOutput, reprompt, shouldEndSession))
    this.emit(':ask', speechOutput);
  },
  'PlayStream': function() {
    this.response.speak('Enjoy.').audioPlayerPlay('REPLACE_ALL', streamInfo.url, streamInfo.url, null, 0);
    this.emit(':responseReady');
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
  'AMAZON.LoopOnIntent': function() {
    this.emit('AMAZON.StartOverIntent');
  },
  'AMAZON.LoopOffIntent': function() {
    this.emit('AMAZON.StartOverIntent');
  },
  'AMAZON.ShuffleOnIntent': function() {
    this.emit('AMAZON.StartOverIntent');
  },
  'AMAZON.ShuffleOffIntent': function() {
    this.emit('AMAZON.StartOverIntent');
  },
  'AMAZON.StartOverIntent': function() {
    this.response.speak('Sorry. I can\'t do that yet.');
    this.emit(':responseReady');
  },
  'PlayCommandIssued': function() {

    if (this.event.request.type === 'IntentRequest' || this.event.request.type === 'LaunchRequest') {
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
    this.response.audioPlayerPlay('REPLACE_ALL', streamInfo.url, streamInfo.url, null, 0);
    this.emit(':responseReady');
  },
  'PlaybackFailed': function() {
    this.response.audioPlayerClearQueue('CLEAR_ENQUEUED');
    this.emit(':responseReady');
  }
}
