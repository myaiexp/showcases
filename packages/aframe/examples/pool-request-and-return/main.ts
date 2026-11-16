// pool__enemy="mixin: enemy; size: 6": request, play, return
import { button, toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import type { Entity } from '../../shared/types.ts';

type Pool = { requestEntity(): Entity | undefined; returnEntity(el: Entity): void; data: { size: number; dynamic: boolean } };

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene pool__enemy="mixin: enemy; size: 6" background="color: #10151c">
      <a-assets>
        <a-mixin id="enemy" geometry="primitive: octahedron; radius: 0.35" material="color: #EF2D5E; flatShading: true"
                 animation="property: rotation; to: 0 360 0; dur: 2400; easing: linear; loop: true"></a-mixin>
      </a-assets>
      <a-plane rotation="-90 0 0" position="0 0 -4" width="12" height="8" color="#39475a"></a-plane>
    </a-scene>`,
  run(stage) {
    const pool = (): Pool => stage.scene.components.pool__enemy as unknown as Pool;
    const out: Entity[] = [];
    let seq = 0;
    const report = (note: string): void => {
      const text = `${note}   out: ${out.length}   pool size: ${pool().data.size}   dynamic: ${pool().data.dynamic}`;
      stage.caption(text);
      const r = stage.readout();
      if (r) r.textContent = text;
    };
    const spawn = (): void => {
      const el = pool().requestEntity();
      if (!el) return report('pool exhausted (requestEntity() returned undefined)');
      // Entities from the pool are paused: play() starts their components' ticks and animations.
      el.setAttribute('position', `${(seq % 6) * 1.5 - 3.75} ${1 + (seq % 3) * 0.8} -4`);
      el.play();
      seq++;
      out.push(el);
      report('requestEntity() + play()');
    };
    const giveBack = (): void => {
      const el = out.shift();
      if (!el) return report('nothing to return');
      pool().returnEntity(el);
      report('returnEntity()');
    };
    report('ready');
    if (stage.bar) {
      button(stage.bar, 'requestEntity()', spawn);
      button(stage.bar, 'returnEntity() oldest', giveBack);
      toggle(stage.bar, 'dynamic', false, (v) => stage.scene.setAttribute('pool__enemy', 'dynamic', v));
    }
    if (stage.preview) stage.every(500, (i) => (i % 2 ? spawn() : giveBack()));
  },
});
