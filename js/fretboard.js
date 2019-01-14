
/* This file requires d3.min.js & tonal.min.js to be loaded */
var allNotes = Tonal.Scale.notes("C chromatic"); // Load all 12 notes of Chromatic Scale

/* Tuning Sturcture for All Instruments */
var Tunings = {
  "Guitar":{
  "standard": {
  "tuning": [
     [ "E", 4, 24, 1 ],
     [ "B", 3, 24, 1 ],
     [ "G", 3, 24, 1 ],
     [ "D", 3, 24, 2 ],
     [ "A", 2, 24, 3 ],
     [ "E", 2, 24, 3 ]
    ],
    "inlay": {
    "type": "dot",
    "frets": [ "3","5","7","9","12d", "15", "17", "19", "21", "24d" ]
           }
    },
  "Guitar Drop D": {
  "tuning": [
     [ "E", 4, 24, 1 ],
     [ "B", 3, 24, 1 ],
     [ "G", 3, 24, 1 ],
     [ "D", 3, 24, 2 ],
     [ "A", 2, 24, 3 ],
     [ "D", 2, 24, 3 ]
    ],
    "inlay": {
    "type": "dot",
    "frets": [ "3","5","7","9","12d", "15", "17", "19", "21", "24d" ]
           }
    }

  },
  "Bass":{
  "standard": {
  "tuning": [
     [ "G", 2, 24, 2 ],
     [ "D", 2, 24, 3 ],
     [ "A", 1, 24, 3 ],
     [ "E", 1, 24, 4 ]
    ],
    "inlay": {
    "type": "dot",
    "frets": [ "3","5","7","9","12d", "15", "17", "19", "21", "24d" ]
           }
    }

  }


};


var fretboardHTML = document.getElementById("fretboard-wrap");
var Fretboard = function(init) {

init = init || {};
var where = init.where || fretboardHTML; // logical operator "||" use requires this element/id's existence on page prior to firing off javascript.
/* PICKUP Reconfigure this to use new model */
var instance = {
        frets: init.frets || 12,
        startFret: init.startFret || 0,
        strings: init.strings || 6,
        tuning: init.tuning || Tunings.Guitar6.standard,
        fretWidth: 50,
        fretHeight: 20
    };

}
