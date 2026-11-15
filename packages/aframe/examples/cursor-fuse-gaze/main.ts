// A gaze cursor on the camera: dwell on a box for fuseTimeout and it clicks
import { aframeExample } from '../../shared/frame.ts';
import type { Entity } from '../../shared/types.ts';
import { logger } from '../../shared/comp-log.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    // Component to change to a sequential colour on click.
    AFRAME.registerComponent('cursor-listener', {
      init() {
        let lastIndex = -1;
        const COLORS = ['red', 'green', 'blue'];
        this.el.addEventListener('click', () => {
          lastIndex = (lastIndex + 1) % COLORS.length;
          this.el.setAttribute('material', 'color', COLORS[lastIndex]);
          this.el.sceneEl.emit('note', `${this.el.id} clicked after fusing`);
        });
      },
    });
  },
  scene: `
    <a-scene background="color: #10151c">
      <a-entity id="cam" camera look-controls position="0 1.6 0">
        <a-entity cursor="fuse: true; fuseTimeout: 1000" position="0 0 -1"
                  geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03" material="color: white; shader: flat"
                  animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.1 0.1 0.1; to: 1 1 1"
                  animation__fusing="property: scale; startEvents: fusing; easing: easeInCubic; dur: 1000; from: 1 1 1; to: 0.1 0.1 0.1"
                  animation__mouseleave="property: scale; startEvents: mouseleave; easing: easeInCubic; dur: 500; to: 1 1 1"></a-entity>
      </a-entity>
      <a-box id="left" cursor-listener geometry="primitive: box" material="color: blue" position="-2.5 1.6 -4"></a-box>
      <a-box id="right" cursor-listener geometry="primitive: box" material="color: blue" position="2.5 1.6 -4"></a-box>
    </a-scene>`,
  run(stage) {
    const log = logger(stage, 4);
    stage.scene.addEventListener('note', (e) => log((e as CustomEvent<string>).detail));
    stage.caption('Look at a box and hold still');
    if (!stage.preview) return;
    // Cards have no mouse to turn the camera: the gaze moves between the boxes on a timer.
    const look = (stage.scene.querySelector('#cam') as Entity).components['look-controls'] as unknown as { yawObject: { rotation: { y: number } } };
    stage.every(2600, (i) => (look.yawObject.rotation.y = i % 2 ? 0.52 : -0.52));
  },
});
