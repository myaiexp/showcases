// The guide's box: at the origin it hides inside the camera, then it is rotated, scaled and moved in front
import { aframeExample } from '../../shared/frame.ts';
import { select } from '../../shared/controls.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

const STEPS: { label: string; attrs: Record<string, string> }[] = [
  { label: '<a-box color="red"> at the origin: the camera is inside it', attrs: { position: '0 0 0', rotation: '0 0 0', scale: '1 1 1' } },
  { label: 'rotation="0 45 45" scale="2 2 2" (still at the origin)', attrs: { position: '0 0 0', rotation: '0 45 45', scale: '2 2 2' } },
  { label: 'position="0 2 -5": five metres in front, two up', attrs: { position: '0 2 -5', rotation: '0 45 45', scale: '2 2 2' } },
];

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene>
      <a-box id="box" color="red"></a-box>
      <a-sky color="#222"></a-sky>
    </a-scene>`,

  run(stage) {
    const box = stage.scene.querySelector('#box') as Entity;
    let step = 0;
    const apply = (i: number): void => {
      step = i;
      const { label, attrs } = STEPS[i]!;
      for (const [k, v] of Object.entries(attrs)) box.setAttribute(k, v);
      stage.caption(label);
      const out = stage.readout();
      if (out) out.textContent = label;
    };
    apply(0);
    if (stage.preview) {
      sway(stage);
      stage.every(1800, () => apply((step + 1) % STEPS.length));
    } else if (stage.bar) {
      select(stage.bar, 'step', STEPS.map((s) => s.label), STEPS[0]!.label, (v) => apply(STEPS.findIndex((s) => s.label === v)));
    }
  },
});
