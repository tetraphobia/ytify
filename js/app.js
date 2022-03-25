import {
  initCollapse,
  initLoop,
  initShuffle,
  initThumbnailAutoResize,
} from "./events.js";

// Initialize all events.
document.addEventListener("DOMContentLoaded", () => {
  initThumbnailAutoResize();
  initCollapse();
  initShuffle();
  initLoop();
});
