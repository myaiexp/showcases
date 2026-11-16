// Local versus world position of a camera that rides on a moving rig
import { aframeExample } from '../../shared/frame.ts';
import { fmt } from '../../shared/comp-log.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    const { THREE } = AFRAME;
    AFRAME.registerComponent('rotation-reader', {
      tick: (function () {
        // One vector and one quaternion, allocated once rather than on every tick.
        const position = new THREE.Vector3();
        const quaternion = new THREE.Quaternion();
        return function (this: { el: { object3D: import('three').Object3D; sceneEl: { emit(n: string, d: string): void } } }) {
          this.el.object3D.getWorldPosition(position);
          this.el.object3D.getWorldQuaternion(quaternion);
          const local = this.el.object3D.position;
          this.el.sceneEl.emit('reading', `local ${fmt(local)}   world ${fmt(position)}   world quaternion.y ${quaternion.y.toFixed(2)}`);
        };
      })(),
    });
  },
  scene: `
    <a-scene background="color: #10151c">
      <a-entity id="rig" position="0 0 0" rotation="0 0 0"
                animation="property: rotation; to: 0 360 0; dur: 16000; easing: linear; loop: true">
        <a-entity camera look-controls="enabled: false" rotation-reader position="0 1.6 -1.5"></a-entity>
      </a-entity>
      ${[0, 1, 2, 3].map((i) => `<a-box position="${[0, 3, 0, -3][i]} 0.5 ${[-4, 0, 4, 0][i]}" color="hsl(${i * 90}, 70%, 60%)"></a-box>`).join('')}
      <a-plane rotation="-90 0 0" width="14" height="14" color="#39475a"></a-plane>
    </a-scene>`,
  run(stage) {
    const out = stage.readout();
    stage.scene.addEventListener('reading', (e) => {
      const line = (e as CustomEvent<string>).detail;
      stage.caption(line);
      if (out) out.textContent = line;
    });
  },
});
