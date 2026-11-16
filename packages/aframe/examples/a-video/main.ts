// <a-video>: a video texture on a plane sized to the video's aspect ratio
import { canvasVideo } from '../../shared/comp-video.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  setup() {
    // A 16:9 <video id="penguin-sledding"> made from a canvas stream (examples have no video files).
    canvasVideo({ id: 'penguin-sledding', width: 320, height: 180 });
  },

  scene: `
    <a-scene background="color: #0e1218">
      <!-- The docs' 16 x 9 metres, 20 metres away. -->
      <a-video src="#penguin-sledding" width="16" height="9" position="0 7 -20"></a-video>
      <!-- The same video squeezed into 1 x 1: distorted. -->
      <a-video src="#penguin-sledding" position="-2 0.6 -3.5" rotation="0 25 0"></a-video>
      <!-- 3 x 1.6875: the right ratio at a small size. -->
      <a-video src="#penguin-sledding" width="3" height="1.6875" position="1.8 0.6 -3.5" rotation="0 -25 0"></a-video>
    </a-scene>`,

  run(stage) {
    stage.caption('One <video>, three planes: only matching width:height looks right');
  },
});
