import {
  initCollapse,
  initLoop,
  initPlay,
  initShuffle,
  initThumbnailAutoResize,
  initYoutubeForm,
} from "./events.js";

// Initialize all events.
document.addEventListener("DOMContentLoaded", () => {
  initThumbnailAutoResize();
  initYoutubeForm();
  initCollapse();
  initPlay();
  // initShuffle();
  initLoop();
});
