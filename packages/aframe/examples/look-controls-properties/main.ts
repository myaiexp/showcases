// Toggle look-controls properties and watch the camera's rotation respond to dragging
import { sway } from '../../shared/card.ts';
import { toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-entity id="cam" camera look-controls="reverseMouseDrag: false" position="0 1.6 0"></a-entity>
      ${Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return `<a-box position="${(Math.sin(a) * 4).toFixed(2)} 1.6 ${(-Math.cos(a) * 4).toFixed(2)}" color="hsl(${i * 45}, 70%, 60%)"></a-box>`;
      }).join('')}
      <a-plane rotation="-90 0 0" width="20" height="20" color="#39475a"></a-plane>
    </a-scene>`,
  run(stage) {
    const cam = stage.scene.querySelector('#cam') as Entity;
    const report = (): void => {
      const r = cam.getAttribute('rotation') as unknown as { x: number; y: number };
      const lc = cam.getAttribute('look-controls') as unknown as { enabled: boolean; reverseMouseDrag: boolean; mouseEnabled: boolean };
      const text = `yaw ${r.y.toFixed(0)}  pitch ${r.x.toFixed(0)}   enabled ${lc.enabled}  reverseMouseDrag ${lc.reverseMouseDrag}  mouseEnabled ${lc.mouseEnabled}`;
      stage.caption(text);
      const out = stage.readout();
      if (out) out.textContent = text;
    };
    stage.every(150, report);
    if (stage.preview) return sway(stage, { yaw: 50, pitch: 10, seconds: 8 });
    const set = (k: string) => (v: boolean) => cam.setAttribute('look-controls', k, v);
    toggle(stage.bar!, 'enabled', true, set('enabled'));
    toggle(stage.bar!, 'reverseMouseDrag', false, set('reverseMouseDrag'));
    toggle(stage.bar!, 'mouseEnabled', true, set('mouseEnabled'));
    toggle(stage.bar!, 'pointerLockEnabled', false, set('pointerLockEnabled'));
  },
});
