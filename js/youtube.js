import { overlay, thumbnail } from "./constants.js";

const re =
  /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
const proto = "https";
const thumbURL = "img.youtube.com/vi";
const thumbName = "maxresdefault";

const getVideoID = (url) => {
  if (!url) return;

  // Verify that the URL is a valid Youtube URL.
  const match = url.match(re);

  if (match && match[2].length == 11) return match[2];
  return;
};

const getMetadataByURL = async (url) => {
  if (!url) return;

  // Validate URL first.
  const id = getVideoID(url);
  if (!id) return;

  const thumbImage = `${proto}://${thumbURL}/${id}/${thumbName}.jpg`;

  if (overlay.classList.contains("fadeout")) {
    overlay.classList.remove("fadeout");
    await new Promise((r) => setTimeout(r, 2000));
  }

  thumbnail.style.backgroundImage = `url(${thumbImage})`;
  overlay.classList.add("fadeout");

  return;
};

export { getMetadataByURL };
