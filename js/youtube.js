import { loop, nowplaying, overlay, play, thumbnail } from "./constants.js";

const re =
  /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
const proto = "https";
const thumbURL = "img.youtube.com/vi";
const watchURL = `${proto}://youtube.com/watch?v=`;
const noembed = `${proto}://noembed.com/embed?dataType=json&url=`;
const ytdl = `${proto}://projectlounge.pw/ytdl/download?url=`;
const format = 249;

const getVideoID = (url) => {
  if (!url) return;

  // Verify that the URL is a valid Youtube URL.
  const match = url.match(re);

  if (match && match[2].length == 11) return match[2];
  return;
};

const cacheThumbnail = async (thumbnailURL) => {
  if (!thumbnailURL) return;

  return new Promise((res, rej) => {
    let image = new Image();
    image.addEventListener("load", res);
    image.addEventListener("error", rej);
    image.src = thumbnailURL;
  });
};

const setNowPlaying = async (title) => {
  if (!title) return;
  nowplaying.innerText = title;
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
  return;
};

const getDataByURL = async (url) => {
  if (!url) return;

  let data = {};
  // Validate URL first.
  data.id = await getVideoID(url);
  if (!data.id) return;

  data.url = watchURL + data.id;
  data.title = "Untitled Song";

  // Check for valid data.
  await fetch(noembed + data.url)
    .then((res) => res.json())
    .then((json) => data.title = json.title);

  data.thumbnailURL = await getHighestQualityThumbnail(data.id);

  return data;
};

const createAudioElement = async (url) => {
  if (!url) return;

  // Try reusing existing audio element
  let audio = document.getElementById("audioplayer");

  if (audio) {
    audio.remove();
  }
  audio = document.createElement("audio");
  audio.src = `${ytdl}${url}&format=${format}`;
  audio.id = "audioplayer";
  audio.loop = loop.enabled;

  return audio;
};

const playYoutubeVideo = async (url) => {
  if (!url) return;

  const data = await getDataByURL(url);

  if (!data) return;

  const audio = await createAudioElement(data.url);

  if (overlay.classList.contains("fadeout")) {
    await overlay.classList.remove("fadeout");
    await cacheThumbnail(data.thumbnailURL);
  }
  await document.body.appendChild(audio);

  audio.oncanplay = async () => {
    audio.play();
    play.innerText = "pause";
    setNowPlaying(data.title);

    thumbnail.style.backgroundImage = `url(${data.thumbnailURL})`;
    overlay.classList.add("fadeout");
  };

  audio.onended = async () => {
    await overlay.classList.remove("fadeout");
    play.innerText = "play_arrow";
  };

  return;
};

export { playYoutubeVideo };
