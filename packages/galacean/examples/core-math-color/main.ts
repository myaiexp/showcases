// Mixing colours in sRGB numbers versus linear space with toLinear/toSRGB
import { Color, PrimitiveMesh, UnlitMaterial, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { color } from '../../shared/controls.ts';
import { lit, solid, tick } from '../../shared/core-kit.ts';
import { labels, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const STEPS = 12;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Pick the two end colours; the top row mixes sRGB values directly, the bottom row mixes in linear light.' });
  const { engine, root } = stage;
  const camera = lit(stage, [0, 0, 9]);
  const tag = labels(stage, camera);
  const quad = PrimitiveMesh.createPlane(engine, 0.9, 1.4);
  const rows = [1.1, -1.1].map((y) =>
    Array.from({ length: STEPS }, (_, i) => {
      const material = new UnlitMaterial(engine);
      const e = solid(root, quad, material, [(i - (STEPS - 1) / 2) * 0.95, y, 0]);
      e.transform.setRotation(90, 0, 0);
      return material;
    }),
  );
  const l1 = tag.add('Color.lerp on sRGB values', '#cfd6e4');
  const l2 = tag.add('toLinear, lerp, toSRGB', '#cfd6e4');
  const info = panel(stage, 'bl');
  const a = new Color(1, 0.1, 0.1, 1);
  const b = new Color(0.1, 0.3, 1, 1);
  if (!stage.preview) {
    color(stage.bar, 'from', [a.r, a.g, a.b], (v) => a.set(v[0], v[1], v[2], 1));
    color(stage.bar, 'to', [b.r, b.g, b.b], (v) => b.set(v[0], v[1], v[2], 1));
  }
  const la = new Color();
  const lb = new Color();
  const mix = new Color();
  const out = new Color();
  const mid = [new Color(), new Color()] as const;
  const above1 = new Vector3(0, 2.05, 0);
  const above2 = new Vector3(0, -0.15, 0);
  tick(root, (_dt, t) => {
    if (stage.preview) {
      a.set(1, 0.5 + 0.4 * Math.sin(t * 0.7), 0.1, 1);
      b.set(0.1, 0.3, 0.6 + 0.4 * Math.sin(t * 0.5), 1);
    }
    a.toLinear(la);
    b.toLinear(lb);
    for (let i = 0; i < STEPS; i++) {
      const k = i / (STEPS - 1);
      Color.lerp(a, b, k, out);
      rows[0]![i]!.baseColor.copyFrom(out);
      if (i === STEPS / 2) mid[0].copyFrom(out);
      Color.lerp(la, lb, k, mix);
      mix.toSRGB(out);
      rows[1]![i]!.baseColor.copyFrom(out);
      if (i === STEPS / 2) mid[1].copyFrom(out);
    }
    l1.at(above1);
    l2.at(above2);
    const fmt = (c: Color): string => `${c.r.toFixed(2)}, ${c.g.toFixed(2)}, ${c.b.toFixed(2)}`;
    info.text(`middle, sRGB mix   ${fmt(mid[0])}\nmiddle, linear mix ${fmt(mid[1])}\nColor.sRGBToLinearSpace(0.5) = ${Color.sRGBToLinearSpace(0.5).toFixed(3)}`);
  });
  return stage.dispose;
};

export default mount;
