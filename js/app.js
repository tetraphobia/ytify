import {
  initCollapse,
  initLoop,
  initShuffle,
  initThumbnailAutoResize,
  initYoutubeForm,
} from "./events.js";

// Initialize all events.
document.addEventListener("DOMContentLoaded", () => {
  initThumbnailAutoResize();
  initYoutubeForm();
  initCollapse();
  initShuffle();
  initLoop();
});
