// Local and world positions of the docs' parent and two children
import { fmt } from '../../shared/comp-log.ts';
import { q } from '../../shared/comp-dom.ts';
import { aframeExample } from '../../shared/frame.ts';
import { sway } from '../../shared/card.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity id="parent" position="1 2 3" geometry="primitive: box; width: 0.2; height: 0.2; depth: 0.2" material="color: #cccccc"
                animation="property: position; from: -1 0.5 -4; to: 1 2 -2; dur: 4000; dir: alternate; easing: easeInOutSine; loop: true">
        <a-sphere id="child1" radius="0.25" color="#EF2D5E"></a-sphere>
        <a-sphere id="child2" radius="0.25" position="2 1 0" color="#4CC3D9"></a-sphere>
      </a-entity>
      <a-plane rotation="-90 0 0" position="0 0 -4" width="12" height="12" color="#39475a"></a-plane>
    </a-scene>`,
  run(stage) {
    const world = (id: string): string => fmt(q(stage, id).object3D.getWorldPosition(new stage.AFRAME.THREE.Vector3()));
    const report = (): void => {
      const text = `parent local ${fmt(q(stage, '#parent').object3D.position)}\nchild1 local ${fmt(q(stage, '#child1').object3D.position)}  world ${world('#child1')}\nchild2 local ${fmt(q(stage, '#child2').object3D.position)}  world ${world('#child2')}`;
      stage.caption(`child2 world ${world('#child2')} = parent + (2 1 0)`);
      const out = stage.readout();
      if (out) out.textContent = text;
    };
    stage.every(150, report);
    if (stage.preview) sway(stage, { yaw: 8 });
  },
});
