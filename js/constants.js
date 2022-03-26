const collapse = document.getElementById("collapse");
const colorscheme = document.getElementById("colorscheme");
const controls = document.getElementById("controls");
const lightmode = document.getElementById("lightmode");
const loop = document.getElementById("loop");
const nowplaying = document.getElementById("nowplaying");
const overlay = document.getElementById("overlay");
const play = document.getElementById("play");
const shuffle = document.getElementById("shuffle");
const skipnext = document.getElementById("skip-next");
const skipprev = document.getElementById("skip-previous");
const thumbnail = document.getElementById("video-thumbnail");
const youtubeform = document.getElementById("youtube-url");
const youtubeinput = document.getElementById("youtube-input");

// Disable each of these features by default.
if (shuffle) shuffle.enabled = false;
if (play) play.playing = false;
if (loop) loop.enabled = false;

export {
  collapse,
  colorscheme,
  controls,
  lightmode,
  loop,
  nowplaying,
  overlay,
  play,
  shuffle,
  skipnext,
  skipprev,
  thumbnail,
  youtubeform,
  youtubeinput,
};
