# STKG-Fretboard

A javascript fretboard component

## Dependencies:

Tonal Music API: https://github.com/danigb/tonal

d3js: https://d3js.org/

jQuery: https://jquery.com/

## Usage:

Enter a root note and scale or chord name separated by a space.

  var fretboard = Fretboard();
  fretboard.draw("C major");

Valid Chords: +add#9, 11, 11b9, 13, 13#11, 13#9, 13#9#11, 13b5, 13b9, 13b9#11, 13no5, 13sus4, 4, 5, 64, 69#11, 7, 7#11, 7#11b13, 7#5, 7#5#9, 7#5b9, 7#5b9#11, 7#5sus4, 7#9, 7#9#11, 7#9#11b13, 7#9b13, 7add6, 7b13, 7b5, 7b6, 7b9, 7b9#11, 7b9#9, 7b9b13, 7b9b13#11, 7no5, 7sus4, 7sus4b9, 7sus4b9b13, 9, 9#11, 9#11b13, 9#5, 9#5#11, 9b13, 9b5, 9no5, 9sus4, M, M#5, M#5add9, M13, M13#11, M6, M6#11, M69, M69#11, M7#11, M7#5, M7#5sus4, M7#9#11, M7add13, M7b5, M7b6, M7b9, M7sus4, M9, M9#11, M9#5, M9#5sus4, M9b5, M9sus4, Madd9, Maddb9, Maj7, Mb5, Mb6, Msus2, Msus4, m, m#5, m11, m11A 5, m11b5, m13, m6, m69, m7, m7#5, m7add11, m7b5, m9, m9#5, m9b5, mM9, mM9b6, mMaj7, mMaj7b6, madd4, madd9, mb6M7, mb6b9, o, o7, o7M7, oM7, sus24,


Valid Scales: aeolian, altered, augmented, augmented heptatonic, balinese, bebop, bebop dominant, bebop locrian, bebop major, bebop minor, chromatic, composite blues, diminished, dorian, dorian #4, double harmonic lydian, double harmonic major, egyptian, enigmatic, flamenco, flat six pentatonic, flat three pentatonic, half-whole diminished, harmonic major, harmonic minor, hirajoshi, hungarian major, hungarian minor, ichikosucho, in-sen, ionian augmented, ionian pentatonic, iwato, kafi raga, kumoijoshi, leading whole tone, locrian, locrian #2, locrian major, locrian pentatonic, lydian, lydian #5P pentatonic, lydian #9, lydian augmented, lydian diminished, lydian dominant, lydian dominant pentatonic, lydian minor, lydian pentatonic, major, major blues, major flat two pentatonic, major pentatonic, malkos raga, melodic minor, melodic minor fifth mode, melodic minor second mode, minor #7M pentatonic, minor bebop, minor blues, minor hexatonic, minor pentatonic, minor six diminished, minor six pentatonic, mixolydian, mixolydian pentatonic, mystery #1, neopolitan, neopolitan major, neopolitan major pentatonic, neopolitan minor, oriental, pelog, persian, phrygian, phrygian dominant, piongio, prometheus, prometheus neopolitan, purvi raga, ritusen, romanian minor, scriabin, six tone symmetric, spanish heptatonic, super locrian pentatonic, todi raga, vietnamese 1, vietnamese 2, whole tone, whole tone pentatonic


## ToDo:


    - Add Audio Player for selected notes 
