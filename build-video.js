const path = require('path');
const FFmpeg = require('fluent-ffmpeg');

const gify = new FFmpeg({
  source: path.resolve(__dirname, 'src/public/videos/tenor.gif'),
});

gify.clone()
  .withVideoCodec('libx264')
  .withFps(25)
  .toFormat('mp4')
  .saveToFile(path.resolve(__dirname, 'src/public/videos/tenor.mp4'));

gify.clone()
  .withFps(25)
  .toFormat('webm')
  .saveToFile(path.resolve(__dirname, 'src/public/videos/tenor.webm'));
