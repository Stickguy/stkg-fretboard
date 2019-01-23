
/* This file requires d3.min.js & tonal.min.js to be loaded */

//var allNotes = Tonal.Scale.notes("C chromatic"); // Load all 12 notes of Chromatic Scale with Tonal
// ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"] <- Tonal Output (mixed enharmonic causes issues)

var allNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]; // Hard Coded

var colors = ["red", "green", "blue", "black", "purple", "gray", "orange", "lightgray", "red"];


/* Decide what method to use to draw notes on the fretboard */
function whatIs(sequence) {
    let sections = sequence.split(" ");
    //console.table(sections);
    if (sections.length === 2 && Tonal.Scale.exists(sections[1]) ) {
      /* (sections.length === 2 && typeof Scales[sections[1]] == "string") */
        return "scale";
    }
    if ( sections.length === 2 && Tonal.Chord.exists(sections[1]) ) {
      /* (sections.length === 2 && typeof Scales[sections[1]] == "string") */
        return "chord";
    }
    if (sections[0].indexOf(":") > 0) {
        return "placeNotes";
    }
    if (sections[0].match(/\d+$/)) {
        return "specificNotes";
    }
     else {
        return "addNotes";
    }
}

  /* determines offset of current scale from C */
function asOffset(note) {
    var offset = allNotes.indexOf(note);
    return offset;
}

  /* determines the actual note value */
function absNote(note) {
    var octave = note[note.length - 1];
    var pitch = asOffset(note.slice(0, -1));
    if (pitch > -1) {
        return pitch + octave * 12;
    }
}

  /* returns the note name in note octave format */
function noteName(absPitch) {
    let octave = Math.floor(absPitch / 12);
    let note = allNotes[absPitch % 12];
    return note + octave.toString();
}

var verbatim = function(d) { return d; };


// Fretboard

/* Tuning Structure for All Instruments */
var ModTunings = {
  "Guitar":{
  "Standard": {
  "tuning": ["E2", "A2", "D3", "G3", "B3", "E4"],
  "thick": [ 3, 3, 2, 1, 1, 1 ],
  "dots": [ "3","5","7","9","12d", "15", "17", "19", "21", "24d" ]
    },

  "Guitar_Drop_D": {
  "tuning": ["D2", "A2", "D3", "G3", "B3", "E4"],
  "thick": [ 3, 3, 2, 1, 1, 1 ],
  "dots": [ "3","5","7","9","12d", "15", "17", "19", "21", "24d" ]
    }

  },
  "Bass":{
  "Standard": {
  "tuning": [ "E1", "A1", "D2", "G2" ],
   "thick": [ 4, 3, 3, 2 ],
   "dots": [ "3","5","7","9","12d", "15", "17", "19", "21", "24d" ]
    }

  },
  "Stick_10":{
  "Standard_RH": {
  "tuning": ["F#2", "B2", "E3", "A3", "D4"],
   "thick": [ 3, 1, 1, 1, 1 ],
   "dots": [ "3", "5", "7","9","12d","15","17" ]
 },
 "Baritone_Mel_RH": {
 "tuning": ["C#2", "F#2", "B2", "E3", "A3"],
  "thick": [ 3, 1, 1, 1, 1 ],
  "dots": [ "3", "5", "7","9","12d","15","17" ]
   }

  }


};
var fretboardHTML = document.getElementById("fretboard-wrap");

var Fretboard = function(config) {
    config = config || {};
    var where = config.where || fretboardHTML;

    var id = "fretboard-" + Math.floor(Math.random() * 1000000);

// Setup instance to receive default settings
if(config.instrument) {
  config.tuning = config.instrument.tuning;
  config.strings = config.instrument.tuning.length;
}

    var instance = {
        frets: config.frets || 24,
        startFret: config.startFret || 0,
        strings: config.strings || 6,
        tuning: config.tuning || ModTunings.Guitar.Standard.tuning,
        instrument: config.instrument || ModTunings.Guitar.Standard,
        fretWidth: 50,
        fretHeight: 20,
    };

    var fretFitsIn = function(fret) {
        return (fret > instance.startFret) && (fret <= instance.frets);
    };

    var fretsWithDots = function (thedots) {
        var singledots = thedots;
      for (var i=singledots.length-1; i>=0; i--) {
          if (singledots[i].match(/d/)) {
              singledots.splice(i, 1);
          }
      }
        return singledots.filter(fretFitsIn);
    };

    var fretsWithDoubleDots = function (ddots) {
        var doubledots = [];
      for (var i=ddots.length-1; i>=0; i--) {
          if (ddots[i].match(/d/)) {
            doubledots.push(ddots[i].slice(0, -1));
          }
      }
        return doubledots.filter(fretFitsIn);
    };

    var fretboardHeight = function () {
        return (instance.strings - 1) * instance.fretHeight + 2;
    };

    var fretboardWidth = function() {
        return (instance.frets - instance.startFret) * instance.fretWidth + 2;
    };

    var XMARGIN = function() { return instance.fretWidth; };
    var YMARGIN = function() { return instance.fretHeight; };

    var makeContainer = function(elem) {
        return d3
            .select(elem)
            .append("div")
            .attr("class", "fretboard")
            .attr("id", id)
            .append("svg")
            .attr("width", fretboardWidth() + XMARGIN() * 2)
            .attr("height", fretboardHeight() + YMARGIN() * 2);
    };

    var drawFrets = function() {
        for(var i=instance.startFret; i<=instance.frets; i++) {
            let x = (i - instance.startFret) * instance.fretWidth + 1 + XMARGIN();
            // fret
            instance.svgContainer
                .append("line")
                .attr("x1", x)
                .attr("y1", YMARGIN())
                .attr("x2", x)
                .attr("y2", YMARGIN() + fretboardHeight())
                .attr("stroke", "lightgray")
                .attr("stroke-width", i==0? 8:2);
            // number
            d3.select("#" + id)
                .append("p")
                .attr("class", "fretnum")
                .style("top", (fretboardHeight() + YMARGIN() + 5) + "px")
                .style("left", x - 4 + "px")
                .text(i)
                ;
        }
    }


    var drawStrings = function() {

      var thickness = instance.instrument.thick;
      var mytry = thickness.slice().reverse();

        for(var i=0; i<instance.strings; i++) {
            instance.svgContainer
                .append("line")
                .attr("x1", XMARGIN())
                .attr("y1", i * instance.fretHeight + 1 + YMARGIN())
                .attr("x2", XMARGIN() + fretboardWidth())
                .attr("y2", i * instance.fretHeight + 1 + YMARGIN())
                .attr("stroke", 'black')
                .attr("stroke-width", mytry[i])
                ;

        }
        var placeTuning = function(d, i) {
            return (instance.strings - i) * instance.fretHeight - 5 + "px";
        };

        var toBaseFretNote = function(note) {
            return noteName(absNote(note) + instance.startFret);
        }

        d3.select("#" + id)
            .selectAll(".tuning")
            .data(instance.tuning.slice(0, instance.strings))
            .style("top", placeTuning)
            .text(toBaseFretNote)
            .enter()
            .append("p")
            .attr("class", "tuning")
            .style("top", placeTuning)
            .text(toBaseFretNote)
            ;
    };


    var drawDots = function() {
var ndots = instance.instrument.dots;
var tmpdots = ndots.slice();
var tmpddots = ndots.slice();
        var p = instance.svgContainer
            .selectAll("circle")
            .data(fretsWithDots(tmpdots));

        function dotX(d) {
            return (d - instance.startFret - 1) * instance.fretWidth + instance.fretWidth/2 + XMARGIN();
        }

        function dotY(ylocation) {
            let margin = YMARGIN();

            if(instance.strings % 2 == 0) {

                return ((instance.strings + 3)/2 - ylocation) * instance.fretHeight + margin;
            } else {
                return fretboardHeight() * ylocation/4 + margin;
            }
        }

        p.enter()
            .append("circle")
            .attr("cx", dotX)
            .attr("cy", dotY(2))
            .attr("r", 4).style("fill", "black"); //#ddd

        var p = instance.svgContainer
            .selectAll(".octave")
            .data(fretsWithDoubleDots(tmpddots));

        p.enter()
            .append("circle")
            .attr("class", "octave")
            .attr("cx", dotX)
            .attr("cy", dotY(3))
            .attr("r", 4).style("fill", "black"); //#ddd
        p.enter()
            .append("circle")
            .attr("class", "octave")
            .attr("cx", dotX)
            .attr("cy", dotY(1))
            .attr("r", 4).style("fill", "black"); //#ddd
    };


    instance.svgContainer = makeContainer(where);

    instance.drawBoard = function() {
        drawFrets();
        drawDots();
        drawStrings();
        return instance;
    };


    // Notes on fretboard

    instance.addNoteOnString = function(note, string, color) {
        var absPitch = absNote(note);
        color = color || "black";
        var absString = (instance.strings - string);
        var basePitch = absNote(instance.tuning[absString]) + instance.startFret;
        if((absPitch >= basePitch) && (absPitch <= (basePitch + instance.frets - instance.startFret))) {
          var fretNoteGroup = instance.svgContainer
                            .append("g")
                            .attr("id", "fretNoteGroup")
                            ;
            var noteCircles = fretNoteGroup.append("circle")
                .attr("class", "note")
                .attr("stroke-width", 1)
                // 0.75 is the offset into the fret (higher is closest to fret)
                .attr("cx", (absPitch - basePitch + 0.75) * instance.fretWidth)
                .attr("cy", (string - 1) * instance.fretHeight + 1 + YMARGIN())
                .attr("r", 9).style("stroke", color).style("fill", "white")
                .append("title").text(note)
                ;
            var noteText = fretNoteGroup.append("text")
                                        .attr("text-anchor", "middle")
                                        .attr("class", "note-text")
                                        .attr('alignment-baseline', 'middle')
                                        .attr("x", (absPitch - basePitch + 0.75) * instance.fretWidth)//padding of 4px
                                        .attr("y", (string -1) * instance.fretHeight + 1 + YMARGIN())
                                        .text(note)
                                        ;
        }
        return instance;
    };


    instance.addNote = function(note, color) {
        for(var string=1; string<=instance.strings; string++) {
            instance.addNoteOnString(note, string, color);
        }

        return instance;
    };


    instance.addNotes = function(notes, color) {
        var allNotes = notes.split(" ");
        for (var i=0; i<allNotes.length; i++) {
            var showColor = color || colors[i];
            var note = allNotes[i];
          //  console.log(note);
            if(note.match(/\d+$/)){
              var noteinf = note.split(/([0-9]+)/)
              instance.addNote(noteinf[0] + noteinf[1], showColor);
            } else {
            for (var octave=1; octave<7; octave++) {
                instance.addNote(note + octave, showColor);
            }
          }
        }

        return instance;
    };


    instance.scale = function(scaleName) {
      var nts = Tonal.Scale.notes(scaleName);
      var sname = nts.join(' ');
        instance.clear();
        instance.addNotes(sname);

        return instance;
    };

    instance.chord = function(chordName) {
    // combine chord to single strings
        var nts = Tonal.Chord.notes(chordName.replace(/\s+/g, ''));
        var cname = nts.join(' ');
        instance.clear();
        instance.addNotes(cname);

        return instance;
    };

    instance.placeNotes = function(sequence) {
        // Sequence of string:note
        // e.g. "6:g2 5:b2 4:d3 3:g3 2:d4 1:g4"
        let pairs = sequence.split(" ");
        pairs.forEach(function(pair, i) {
            let [string, note] = pair.split(":");
            string = parseInt(string);
            instance.addNoteOnString(note, string, colors[i]);  // , i==0? "red" : "black");
        });

        return instance;
    };

    instance.specificNotes = function(noteName) {
    //console.log('noteName: ' + noteName);
    instance.addNotes(noteName);
/*
      var nts = Tonal.Scale.notes(scaleName);
      var sname = nts.join(' ');
        instance.clear();
        instance.addNotes(sname);
*/
        return instance;
    };


    instance.draw = function(something) {
        let sections = something.split(";");
        sections.forEach(function(section) {
            section = section.trim();
            let what = whatIs(section);
            instance[what](section);
        });
    };


    instance.clearNotes = function() {
        instance.svgContainer
            .selectAll("#fretNoteGroup")
            .remove();

        return instance;
    };


    instance.clear = function() {
        d3.select("#" + id).selectAll(".fretnum,.tuning").remove();
        instance.svgContainer
            .selectAll("line")
            .remove();
        instance.svgContainer
            .selectAll("circle")
            .remove();
        instance.drawBoard();

        return instance;
    };

    instance.delete = function() {
        d3.select("#" + id).remove();
    };

    return instance.drawBoard();
};


Fretboard.drawAll = function(selector) {
    let fretboards = document.querySelectorAll(selector);

    fretboards.forEach(function(e) {
        let fretdef = e.dataset["frets"];
        let startFret, frets;
        if (fretdef && (fretdef.indexOf("-") !== -1)) {
            [startFret, frets] = fretdef.split("-").map(function(x) {return parseInt(x)});
        } else {
            [startFret, frets] = [0, parseInt(fretdef) || 8];
        }
        let notes = e.dataset["notes"];
        let fretboard = Fretboard({frets: frets, startFret: startFret, where: e});
        if (notes) {
            fretboard.draw(notes);
        }
    });
};

/* Based on code from https://github.com/txels/fretboard  */
