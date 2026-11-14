// WideLine styling: caps, joins, dashes, colours, widths, loops
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createRig, sway } from '../../shared/pbr.ts';

const CAPS = [pc.LINECAP_BUTT, pc.LINECAP_SQUARE, pc.LINECAP_ROUND];
const JOINS = [pc.LINEJOIN_MITER, pc.LINEJOIN_BEVEL, pc.LINEJOIN_ROUND];

/** A three-point zig-zag centred on (cx, cy), packed xyz. */
const zigzag = (cx: number, cy: number, w = 1.2, h = 0.45): Float32Array => new Float32Array([cx - w, cy - h, 0, cx, cy + h, 0, cx + w, cy - h, 0]);

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { sky: false, sun: false, distance: 11, pitch: 0, yaw: 0, clearColor: new pc.Color(0.1, 0.11, 0.15) });
  const { app } = rig;
  sway(app, rig.orbit, 10, 0.4);

  const renderer = new pc.WideLineRenderer(app);
  renderer.widthUnits = pc.LINEWIDTH_SCREEN;
  // Widths are authored in pixels; switching to world units divides them by a fixed scene scale.
  const entries: { line: pc.WideLine; px: number[] }[] = [];
  const add = (positions: Float32Array, colors: ArrayLike<number> | pc.Color, widths: ArrayLike<number> | number, style: Partial<pc.WideLine> = {}): pc.WideLine => {
    const line = new pc.WideLine().set(positions, colors, widths);
    Object.assign(line, style);
    renderer.add(line);
    entries.push({ line, px: typeof widths === 'number' ? [widths] : Array.from(widths) });
    return line;
  };

  const white = new pc.Color(0.95, 0.95, 0.98);
  // Column 1: the three caps. Column 2: the three joins.
  CAPS.forEach((cap, i) => add(zigzag(-3.6, (1 - i) * 1.7), white, 26, { cap }));
  JOINS.forEach((join, i) => add(zigzag(0, (1 - i) * 1.7), new pc.Color(0.4, 0.8, 1), 26, { join }));

  // Column 3, top: a dashed line whose pattern slides along it.
  const dashed = add(new Float32Array([2.4, 1.7, 0, 3.4, 1.4, 0, 4.4, 1.9, 0, 5.2, 1.5, 0]), new pc.Color(1, 0.75, 0.3), 12, { dashLength: 0.4, gapLength: 0.25, cap: pc.LINECAP_ROUND, join: pc.LINEJOIN_ROUND });
  // Middle: a colour per point (rgb) and a width per point, so the line tapers and shifts hue.
  add(new Float32Array([2.4, 0, 0, 3.4, 0.4, 0, 4.4, -0.4, 0, 5.2, 0, 0]), new Float32Array([1, 0.2, 0.2, 1, 0.9, 0.2, 0.2, 1, 0.5, 0.4, 0.3, 1]), new Float32Array([4, 26, 26, 4]), { cap: pc.LINECAP_ROUND, join: pc.LINEJOIN_ROUND });
  // Bottom: closed joins the last point back to the first.
  add(new Float32Array([2.6, -2, 0, 4.9, -1.6, 0, 4.2, -3, 0]), new pc.Color(0.5, 1, 0.6), 14, { closed: true, join: pc.LINEJOIN_ROUND });

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    dashed.dashOffset = t * 0.5;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('widthUnits', ['LINEWIDTH_SCREEN', 'LINEWIDTH_WORLD'] as const, 'LINEWIDTH_SCREEN', (v) => {
      renderer.widthUnits = v === 'LINEWIDTH_SCREEN' ? pc.LINEWIDTH_SCREEN : pc.LINEWIDTH_WORLD;
      const world = v === 'LINEWIDTH_WORLD';
      for (const { line, px } of entries) {
        const widths = world ? px.map((w) => w / 60) : px;
        line.setWidths(widths.length === 1 ? widths[0]! : widths);
      }
    });
    panel.slider('dashLength', 0, 1, 0.05, 0.4, (v) => (dashed.dashLength = v));
    panel.slider('gapLength', 0, 1, 0.05, 0.25, (v) => (dashed.gapLength = v));
    panel.readout('left: caps butt, square, round. middle: joins miter, bevel, round');
  }
  return () => {
    renderer.destroy();
    rig.dispose();
  };
};

export default mount;
