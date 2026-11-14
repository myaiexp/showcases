// Update path (bars): bars grow to new values, but only if updatePath() is called
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, checkbox } from '../../shared/controls.ts';

const COLORS = ['#E62', '#EA0', '#C25', '#a35ac9', '#2dd4a7'];
const DAYS = 5;
const MAX = 150;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Untick the box and the bars stay put while the gold dots show the real values.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.05,
    rotate: { x: -0.25, y: -0.45 },
    dragRotate: !stage.preview,
  });

  // baseline
  new Zdog.Rect({ addTo: illo, width: 220, height: 1, translate: { y: 75 }, stroke: 4, color: '#777' });

  const target = Array.from({ length: DAYS }, () => 80);
  const shown = target.slice();
  const bars: Zdog.Rect[] = [];
  const caps: Zdog.Shape[] = [];
  for (let i = 0; i < DAYS; i++) {
    const x = (i - (DAYS - 1) / 2) * 44;
    bars.push(new Zdog.Rect({ addTo: illo, width: 26, height: 80, translate: { x, y: 75 - 40 }, stroke: 8, fill: true, color: COLORS[i]! }));
    caps.push(new Zdog.Shape({ addTo: illo, translate: { x, y: 75 - 80, z: 10 }, stroke: 9, color: '#FDB' }));
  }

  const roll = (): void => {
    for (let i = 0; i < DAYS; i++) target[i] = 30 + Math.random() * (MAX - 30);
  };
  roll();

  let live = true;
  if (stage.bar) {
    button(stage.bar, 'New values', roll);
    checkbox(stage.bar, 'call updatePath()', live, (v) => { live = v; });
  }
  stage.every(stage.preview ? 1800 : 3000, roll);

  stage.loop((dt) => {
    for (let i = 0; i < DAYS; i++) {
      shown[i]! += (target[i]! - shown[i]!) * Math.min(1, dt * 4);
      const h = Math.max(2, shown[i]!);
      caps[i]!.translate.y = 75 - h; // translate is read every frame, no call needed
      bars[i]!.translate.y = 75 - h / 2;
      if (live) {
        bars[i]!.height = h;
        bars[i]!.updatePath(); // a Rect's size is baked into its path until this runs
      }
    }
    if (stage.preview) illo.rotate.y = -0.45 + 0.3 * Math.sin(performance.now() / 1500);
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
