const collapseBtn = document.getElementById("collapse");
const shuffleBtn = document.getElementById("shuffle");
const loopBtn = document.getElementById("loop");
const controlSection = document.getElementById("control");
const videoThumbnail = document.getElementById("video-thumbnail");

const initThumbnailAutoResize = () => {
  // Automatically resize video thumbnail with the window.
  const resize = (entries) => {
    if (!entries) return;

    const cr = entries[0].contentRect;

    // Make sure thumbnail is always 1:1 aspect ratio and never overflows.
    if (cr.width > cr.height) {
      videoThumbnail.style.width = cr.height + "px";
      videoThumbnail.style.height = "100%";
    } else if (cr.width < cr.height) {
      videoThumbnail.style.height = cr.width + "px";
      videoThumbnail.style.width = "100%";
    }
  };

  const resize_obj = new ResizeObserver(resize);

  resize_obj.observe(videoThumbnail.parentElement);
};

const initShuffle = () => {
  if (!shuffleBtn) return;

  shuffleBtn.addEventListener("click", () => {
    shuffleBtn.classList.toggle("enabled");
  });
};

const initLoop = () => {
  if (!loopBtn) return;

  loopBtn.addEventListener("click", () => {
    loopBtn.classList.toggle("enabled");
  });
};

const initCollapse = () => {
  if (!collapseBtn) return;

  collapseBtn.addEventListener("click", () => {
    controlSection.classList.toggle("collapsed");
    controlSection.classList.toggle("hidden");

    // Switch the icon depending on collapsed state.
    let symbol = controlSection.classList.contains("collapsed")
      ? "keyboard_arrow_left"
      : "keyboard_arrow_right";

    collapseBtn.textContent = symbol;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initThumbnailAutoResize();
  initCollapse();
  initShuffle();
  initLoop();
});
