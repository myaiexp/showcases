// Energy-saving mode: fewer pixels than the screen, scaled up by the browser
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const SCALES = { 'scale 1 (device resolution)': 1, 'scale 3/2 (3x screen as if 2x)': 3 / 2, 'scale 3 (3x screen as if 1x)': 3 } as const;
type Name = keyof typeof SCALES;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The CSS size is fixed, so the docs pass a ratio to resizeByClientSize instead of calling setScale.' });
  const { engine, root } = stage;
  lit(stage, [0, 1.5, 6]);
  const knot = solid(root, PrimitiveMesh.createTorus(engine, 1.2, 0.3, 16, 48), phong(engine, PALETTE.cyan));
  const info = panel(stage);
  const names = Object.keys(SCALES) as Name[];
  let name: Name = names[1]!;
  let auto = true;
  if (!stage.preview) select(stage.bar, 'mode', names, (n) => ((auto = false), (name = n)), name);
  tick(root, (dt, t) => {
    knot.transform.rotate(25 * dt, 50 * dt, 0);
    if (auto && stage.preview) name = names[Math.floor(t / 2.2) % names.length]!;
    const scale = SCALES[name];
    const pixelRatio = Math.min(window.devicePixelRatio, 2) / scale;
    engine.canvas.resizeByClientSize(pixelRatio);
    const { width, height } = engine.canvas;
    const full = stage.canvas.clientWidth * Math.min(window.devicePixelRatio, 2) * stage.canvas.clientHeight * Math.min(window.devicePixelRatio, 2);
    info.text(`${name}\nresizeByClientSize(${pixelRatio.toFixed(2)})\nbuffer ${width} x ${height}  (${Math.round((width * height * 100) / full)}% of the pixels)`);
  });
  return stage.dispose;
};

export default mount;
