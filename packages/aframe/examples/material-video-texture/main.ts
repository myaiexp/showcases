// material src: #video, with a canvas.captureStream() video standing in for a file
import { sway } from '../../shared/card.ts';
import { canvasVideo } from '../../shared/comp-video.ts';
import { aframeExample } from '../../shared/frame.ts';
import { logger } from '../../shared/comp-log.ts';
import { q } from '../../shared/comp-dom.ts';

export default aframeExample(import.meta.url, {
  setup() {
    // The docs' <video id="my-video"> in <a-assets>, made in code: no file to load.
    canvasVideo({ id: 'my-video' });
  },
  scene: `
    <a-scene background="color: #10151c">
      <a-plane id="screen" width="3.2" height="1.8" position="-1.2 1.8 -3.6" material="shader: flat; src: #my-video"></a-plane>
      <a-sphere radius="0.8" position="2.2 1.6 -3.6" material="src: #my-video"
                animation="property: rotation; to: 0 360 0; dur: 12000; easing: linear; loop: true"></a-sphere>
    </a-scene>`,
  run(stage) {
    const log = logger(stage);
    q(stage, '#screen').addEventListener('materialvideoloadeddata', () => log('materialvideoloadeddata: video frames reach the texture'));
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
