(function(window){
  var context = new (window.AudioContext || window.webkitAudioContext)();
  var attack = 100;
  var release = 100;
  var volume = 1;
  var type = "sine";
  var envelope = context.createGain();

  var freq = 432;

  //envelope.gain.setValueAtTime(volume, context.currentTime);
  envelope.connect(context.destination);

  envelope.gain.setValueAtTime(0, context.currentTime);
  envelope.gain.setTargetAtTime(volume, context.currentTime, attack / 1000);

  var osc = context.createOscillator();
  osc.frequency.setValueAtTime(freq, context.currentTime);
  osc.type = type;
  osc.connect(envelope);
  osc.start();


}(window));