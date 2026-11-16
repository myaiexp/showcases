// A scale-on-mouseenter component: the cursor on the camera makes a box grow when looked at
import { aframeExample } from '../../shared/frame.ts';
import { sway } from '../../shared/card.ts';

import * as images from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent<{ to: { x: number; y: number; z: number } }>('scale-on-mouseenter', {
      schema: {
        to: { default: '2.5 2.5 2.5', type: 'vec3' },
      },
      init() {
        const data = this.data;
        const el = this.el;
        this.el.addEventListener('mouseenter', () => {
          el.object3D.scale.copy(data.to as unknown as import('three').Vector3);
        });
      },
    });
  },

  scene: () => `
    <a-scene>
      <a-assets><img id="boxTexture" src="${images.bricks()}"></a-assets>
      <a-box src="#boxTexture" position="0 2 -5" rotation="0 45 45" scale="2 2 2" scale-on-mouseenter
             animation="property: object3D.position.y; to: 2.2; dir: alternate; dur: 2000; loop: true"></a-box>
      <a-plane rotation="-90 0 0" width="30" height="30" color="#445566"></a-plane>
      <a-sky color="#222"></a-sky>
      <a-camera>
        <a-cursor color="#FAFAFA"></a-cursor>
      </a-camera>
    </a-scene>`,

  run(stage) {
    stage.caption('look at the box (drag to aim the cursor): it grows on mouseenter');
    if (stage.preview) sway(stage, { yaw: 18, seconds: 6 });
  },
});
