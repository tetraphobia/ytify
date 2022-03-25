import { collapse, controls, loop, shuffle, thumbnail } from "./constants.js";

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

  // Ensure button is disabled by default.
  loop.enabled = false;
  if (loop.classList.contains("enabled")) {
    loop.classList.remove("enabled");
  }

  loop.addEventListener("click", () => {
    loop.classList.toggle("enabled");
    loop.enabled = !loop.enabled;
  });
};

const initShuffle = () => {
  if (!shuffle) return;

  // Ensure button is disabled by default.
  shuffle.enabled = false;
  if (shuffle.classList.contains("enabled")) {
    shuffle.classList.remove("enabled");
  }

  shuffle.addEventListener("click", () => {
    shuffle.classList.toggle("enabled");
    shuffle.enabled = !shuffle.enabled;
  });
};

const initThumbnailAutoResize = () => {
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
};

export {
  initCollapse,
  initLoop,
  initShuffle,
  initThumbnailAutoResize,
  initYoutubeForm,
};
