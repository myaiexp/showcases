// Wide lines updated every frame, with depth test and width units
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

const POINTS = 90;

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { distance: 9, pitch: -28, autoRotate: 12 });
  const { app } = rig;

  // Something solid for the trail to pass behind, so depthTest is visible.
  addMesh(app, 'sphere', pbrMaterial('#7d8696', { gloss: 0.5 }), [0, 0, 0], 2.2);

  // Changing any line rebuilds its whole renderer, so static and moving lines get one each.
  const staticLines = new pc.WideLineRenderer(app);
  const dynamicLines = new pc.WideLineRenderer(app);
  staticLines.widthUnits = dynamicLines.widthUnits = pc.LINEWIDTH_SCREEN;

  const grid = new pc.WideLine();
  const gridPoints: number[] = [];
  const gridColours: number[] = [];
  for (let i = -4; i <= 4; i++) {
    // Serpentine path, so the grid is one connected line.
    const a = i % 2 ? 4 : -4;
    gridPoints.push(i, -1.6, a, i, -1.6, -a);
    gridColours.push(0.35, 0.4, 0.5, 0.35, 0.4, 0.5);
  }
  grid.set(gridPoints, gridColours, 2);
  staticLines.add(grid);

  // The trail: POINTS positions, with colour and width fixed along its length.
  const trail = new pc.WideLine();
  const colours = new Float32Array(POINTS * 3);
  const widths = new Float32Array(POINTS);
  for (let i = 0; i < POINTS; i++) {
    const f = i / (POINTS - 1);
    colours.set([1 - f * 0.7, 0.4 + f * 0.5, 0.2 + f * 0.8], i * 3);
    widths[i] = 1 + f * 13;
  }
  const positions = new Float32Array(POINTS * 3);
  const at = (t: number, out: pc.Vec3): void => void out.set(Math.sin(t * 1.3) * 3.2, Math.sin(t * 2.1) * 1.4, Math.cos(t * 0.9) * 3.2);
  const p = new pc.Vec3();
  let t = 0;
  const update = (): void => {
    for (let i = 0; i < POINTS; i++) {
      // Oldest point first: the head of the trail is the last point.
      at(t - (POINTS - 1 - i) * 0.03, p);
      positions.set([p.x, p.y, p.z], i * 3);
    }
  };
  update();
  trail.set(positions, colours, widths);
  trail.cap = pc.LINECAP_ROUND;
  trail.join = pc.LINEJOIN_ROUND;
  dynamicLines.add(trail);

  app.on('update', (dt: number) => {
    t += dt;
    update();
    trail.setPositions(positions);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('widthUnits', ['screen', 'world'] as const, 'screen', (v) => {
      staticLines.widthUnits = dynamicLines.widthUnits = v === 'screen' ? pc.LINEWIDTH_SCREEN : pc.LINEWIDTH_WORLD;
      trail.setWidths(v === 'screen' ? widths : widths.map((w) => w / 50));
      grid.setWidths(v === 'screen' ? 2 : 0.03);
    });
    panel.check('depthTest', true, (on) => (staticLines.depthTest = dynamicLines.depthTest = on));
    panel.check('trail renderer enabled', true, (on) => (dynamicLines.enabled = on));
    panel.check('grid renderer enabled', true, (on) => (staticLines.enabled = on));
  }
  return () => {
    staticLines.destroy();
    dynamicLines.destroy();
    rig.dispose();
  };
};

export default mount;
