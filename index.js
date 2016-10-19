piano();

function piano() {
  tones.attack = 0;
  tones.release = 300;
   tones.type = "sawtooth";
  // white
  var notes = [432, "c", "d", "e", "f", "g", "a", "b"];
  for(var i = 0; i < 7; i++) {
    makeKey(100 + i * 100, 100, 100, 500, "white", notes[0]);
  }
  // black
  // makeKey(170, 100, 60, 275, "black", "c#");
  // makeKey(270, 100, 60, 275, "black", "d#");
  // makeKey(470, 100, 60, 275, "black", "f#");
  // makeKey(570, 100, 60, 275, "black", "g#");
  // makeKey(670, 100, 60, 275, "black", "a#");

  function makeKey(x, y, width, height, color, note) {
    var key = document.createElement("div");
    key.style.width = width + "px";
    key.style.height = height + "px";
    key.style.position = "absolute";
    key.style.left = x + "px";
    key.style.top = y + "px";
    key.style.backgroundColor = color;
    key.style.border = "solid 1px black";
    key.note = note;
    key.addEventListener("mousedown", function(event) {
      tones.playFrequency(event.target.note);
    });
    document.body.appendChild(key);
  }
}