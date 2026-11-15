// Per-frame intersection data from raycaster.getIntersection(el), shown as a marker and numbers
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { fmt } from '../../shared/comp-log.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('raycaster-listen', {
      init() {
        // Use events to learn which raycaster is on us, so none is hard-coded.
        this.el.addEventListener('raycaster-intersected', (evt: CustomEvent<{ el: Entity }>) => (this.raycaster = evt.detail.el));
        this.el.addEventListener('raycaster-intersected-cleared', () => (this.raycaster = null));
      },
      tick() {
        if (!this.raycaster) return;
        const intersection = (this.raycaster as Entity).components.raycaster!.getIntersection(this.el);
        if (!intersection) return;
        const marker = this.el.sceneEl.querySelector('#marker') as Entity;
        marker.object3D.position.copy(intersection.point);
        this.el.sceneEl.emit('hit', `distance ${intersection.distance.toFixed(2)}   point ${fmt(intersection.point)}   faceIndex ${intersection.faceIndex}   uv ${intersection.uv.x.toFixed(2)} ${intersection.uv.y.toFixed(2)}`);
      },
    });
  },
  scene: `
    <a-scene background="color: #10151c">
      <a-entity position="0 1.6 0" rotation="0 90 0" animation="property: rotation; from: 0 70 0; to: 0 -70 0; dur: 5000; dir: alternate; easing: linear; loop: true">
        <a-entity id="ray" raycaster="objects: #target; showLine: true; far: 10"></a-entity>
      </a-entity>
      <a-torus-knot id="target" raycaster-listen position="0 1.6 -4" geometry="radius: 1; radiusTubular: 0.25" color="#4CC3D9"></a-torus-knot>
      <a-sphere id="marker" radius="0.08" material="shader: flat; color: #FFC65D" position="0 -5 0"></a-sphere>
    </a-scene>`,
  run(stage) {
    const out = stage.readout();
    stage.scene.addEventListener('hit', (e) => {
      const line = (e as CustomEvent<string>).detail;
      stage.caption(line);
      if (out) out.textContent = line;
    });
    if (stage.preview) sway(stage, { yaw: 4 });
  },
});
