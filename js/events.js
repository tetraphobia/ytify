import {
  collapse,
  controls,
  loop,
  play,
  shuffle,
  thumbnail,
  youtubeform,
  youtubeinput,
} from "./constants.js";

import { playYoutubeVideo } from "./youtube.js";

const initCollapse = () => {
  if (!collapse) return;

  collapse.addEventListener("click", () => {
    controls.classList.toggle("collapsed");
    controls.classList.toggle("hidden");

    // Switch the icon depending on collapsed state.
    let symbol = controls.classList.contains("collapsed")
      ? "keyboard_arrow_left"
      : "keyboard_arrow_right";

    collapse.textContent = symbol;
  });
};

const initLoop = () => {
  if (!loop) return;

  loop.addEventListener("click", () => {
    loop.classList.toggle("enabled");
    loop.enabled = !loop.enabled;

    let audio = document.getElementById("audioplayer");
    if (!audio) return;

    audio.loop = loop.enabled;
  });
};

const initPlay = () => {
  if (!play) return;

  play.addEventListener("click", () => {
    let audio = document.getElementById("audioplayer");
    if (!audio) {
      youtubeform.requestSubmit();
      return;
    }
    if (audio.paused) {
      audio.play();
      play.innerText = "pause";
    } else {
      audio.pause();
      play.innerText = "play_arrow";
    }
  });
};

const initShuffle = () => {
  if (!shuffle) return;

  shuffle.addEventListener("click", () => {
    shuffle.classList.toggle("enabled");
    shuffle.enabled = !shuffle.enabled;
  });
};

const initThumbnailAutoResize = () => {
  if (!thumbnail) return;

  // Automatically resize video thumbnail with the window.
  const resize = (entries) => {
    if (!entries) return;

    const cr = entries[0].contentRect;

    // Make sure thumbnail is always 1:1 aspect ratio and never overflows.
    if (cr.width > cr.height) {
      thumbnail.style.width = cr.height + "px";
      thumbnail.style.height = "100%";
    } else if (cr.width < cr.height) {
      thumbnail.style.height = cr.width + "px";
      thumbnail.style.width = "100%";
    }
  };

  const resize_obj = new ResizeObserver(resize);

  resize_obj.observe(thumbnail.parentElement);
};

const initYoutubeForm = () => {
  if (!youtubeform || !youtubeinput) return;

  youtubeform.addEventListener("submit", (event) => {
    playYoutubeVideo(youtubeinput.value);
    event.preventDefault();
    youtubeinput.blur();
  });
};

export {
  initCollapse,
  initLoop,
  initPlay,
  initShuffle,
  initThumbnailAutoResize,
  initYoutubeForm,
};
