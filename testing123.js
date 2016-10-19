(function(window){

  var tones = {
    context: new (window.AudioContext || window.webkitAudioContext)(),
    attack: 1,
    release: 100,
    volume: 0.5,
    type: "sine",

    playFrequency: function(freq) {
      this.attack = this.attack || 1;
      this.release = this.release || 1;
      var envelope = this.context.createGain();
      
      envelope.gain.setValueAtTime(0, this.context.currentTime);
      envelope.connect(this.context.destination);
      envelope.gain.setTargetAtTime(this.volume, this.context.currentTime, this.attack / 1000);

      var osc = this.context.createOscillator();
      osc.type = this.type;
      osc.connect(envelope);
      osc.start();
      osc.frequency.setValueAtTime(freq, this.context.currentTime);

      if(this.release) {
        envelope.gain.setTargetAtTime(0, this.context.currentTime + this.attack / 1000, this.release / 1000);
        setTimeout(function() {
          osc.stop();
          osc.disconnect(envelope);
          envelope.gain.cancelScheduledValues(tones.context.currentTime);
          envelope.disconnect(tones.context.destination);
        }, this.attack * 10 + this.release * 10);
      }
    },

    play: function(freqOrNote, octave) {
      if (typeof freqOrNote === "number") {
        this.playFrequency(freqOrNote);
      } else if (typeof freqOrNote === "string") {
        if (octave == null) {
          octave = 4;
        }
        this.playFrequency(432);
        //this.playFrequency(this.notes[octave][freqOrNote.toLowerCase()]);
      }
    }

  };

  // need to create a node in order to kick off the timer in Chrome.
  tones.context.createGain();

  if (typeof define === "function" && define.amd) {
      define(tones);
  } else {
     window.tones = tones;
  }

}(window));