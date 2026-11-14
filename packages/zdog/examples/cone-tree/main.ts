// Cone tree: stacked Cones make a Christmas tree with ornament dots
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

const TAU = Zdog.TAU;
const GLOW = ['#E62', '#EA0', '#C25', '#fff', '#5ad'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to walk round the tree.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.05,
    rotate: { x: -0.2, y: 0.4 },
    dragRotate: true,
  });

  let tiers = 3;
  let tree: Zdog.Anchor | null = null;
  let baubles: Zdog.Shape[] = [];

  const build = (): void => {
    tree?.remove();
    baubles = [];
    tree = new Zdog.Anchor({ addTo: illo, translate: { y: 20 } });
    new Zdog.Cylinder({
      addTo: tree, diameter: 22, length: 26, stroke: false, color: '#a5642d', frontFace: '#7a431b',
      backface: '#7a431b', translate: { y: 68 }, rotate: { x: TAU / 4 },
    });
    const height = 36 + tiers * 30; // each tier is its own Cone
    let base = 56;
    for (let i = 0; i < tiers; i++) {
      const frac = tiers === 1 ? 0 : i / (tiers - 1);
      const diameter = 150 - frac * 80 - (tiers > 3 ? 0 : 0);
      const length = height / tiers + 26;
      // a cone points front; a quarter turn about x points it up
      new Zdog.Cone({
        addTo: tree, diameter, length, stroke: false, color: i % 2 ? '#2a9d5c' : '#34b36a', backface: '#176b3c',
        translate: { y: base }, rotate: { x: TAU / 4 },
      });
      // ornaments, ringed round this tier at about a third of its height
      const h = 0.34;
      const r = (diameter / 2) * (1 - h);
      for (let k = 0; k < 5; k++) {
        const a = (k / 5) * TAU + i * 0.7;
        baubles.push(new Zdog.Shape({
          addTo: tree, stroke: 9, color: GLOW[(k + i) % GLOW.length]!,
          translate: { x: Math.cos(a) * (r + 3), y: base - h * length, z: Math.sin(a) * (r + 3) },
        }));
      }
      base -= height / tiers - 4;
    }
    // star at the very tip
    new Zdog.Shape({ addTo: tree, stroke: 14, color: '#ED0', translate: { y: base - 26 } });
  };
  build();

  if (stage.bar) slider(stage.bar, 'tiers', 1, 5, 1, tiers, (v) => { tiers = v; build(); });
  else stage.every(2400, () => { tiers = (tiers % 5) + 1; build(); });

  stage.loop((_dt, t) => {
    // twinkle: shuffle the bauble colours a few times a second
    const step = Math.floor(t * 2.5);
    baubles.forEach((b, i) => { b.color = GLOW[(i + step) % GLOW.length]!; });
    illo.rotate.y += 0.012;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
