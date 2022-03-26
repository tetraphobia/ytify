import { overlay, thumbnail } from "./constants.js";

const re =
  /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
const proto = "https";
const thumbURL = "img.youtube.com/vi";

const getVideoID = (url) => {
  if (!url) return;

  // Verify that the URL is a valid Youtube URL.
  const match = url.match(re);

  if (match && match[2].length == 11) return match[2];
  return;
};

const setThumbnail = (thumbnailURL) => {
  if (!thumbnailURL) return;

  console.log(thumbnailURL);
  if (overlay.classList.contains("fadeout")) {
    overlay.classList.remove("fadeout");
    new Promise((r) => setTimeout(r, 2000));
  }

  thumbnail.style.backgroundImage = `url(${thumbnailURL})`;
  overlay.classList.add("fadeout");

  return;
};

const getHighestQualityThumbnail = async (id) => {
  if (!id) return;
  const namelist = ["maxresdefault", "hqdefault", "mqdefault", "sddefault"];

  for await (let name of namelist) {
    let url = `${proto}://${thumbURL}/${id}/${name}.jpg`;
    let res = await fetch(url);
    if (res.status == 200) return res.url;
  }
};

const getDataByURL = async (url) => {
  if (!url) return;

  let data = {};
  // Validate URL first.
  data.id = await getVideoID(url);
  if (!data.id) return;

  data.thumbnailURL = await getHighestQualityThumbnail(data.id);

  return data;
};

const playYoutubeVideo = async (url) => {
  if (!url) return;

  const data = await getDataByURL(url);

  if (!data) return;

  setThumbnail(data.thumbnailURL);
  return;
};

export { playYoutubeVideo };
