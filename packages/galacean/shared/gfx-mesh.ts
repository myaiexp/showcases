// A parameter lab for PrimitiveMesh.create*: sliders, or a sweep in cards
import { BlinnPhongMaterial, type Engine, type Mesh, MeshRenderer, Texture2D } from '@galacean/engine';
import type { MountContext } from '@/types.ts';
import { slider } from './controls.ts';
import { caption, demo, spin, tick } from './gfx-kit.ts';
import { canvasTexture, uvGrid } from './textures.ts';

export interface Param {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  /** Card sweep range (defaults to min..max). */
  sweep?: [number, number];
}

export interface LabOptions {
  /** `PrimitiveMesh.createX` as text for the caption, e.g. 'createCuboid'. */
  call: string;
  params: Param[];
  make: (engine: Engine, v: number[]) => Mesh;
  distance?: number;
  hint?: string;
}

/** Builds the mesh from the parameter values, shows it spinning with a UV grid texture, and exposes every parameter. */
export async function primitiveLab(el: HTMLElement, ctx: MountContext, o: LabOptions): Promise<() => void> {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1.5, (o.distance ?? 5) * (ctx.preview ? 0.8 : 1)], target: [0, 0, 0], hint: o.hint ?? 'Every parameter of the create function is a slider.' });
  const say = caption(stage);
  const texture: Texture2D = canvasTexture(engine, uvGrid, { size: 256 });
  stage.own(() => texture.destroy());
  const material = new BlinnPhongMaterial(engine);
  material.baseTexture = texture;
  material.shininess = 60;
  const holder = root.createChild('primitive');
  spin(holder, [8, 30, 0]);
  const renderer = holder.addComponent(MeshRenderer);
  renderer.setMaterial(material);
  const values = o.params.map((p) => p.value);
  let current: Mesh | null = null;
  let key = '';
  const rebuild = (): void => {
    const next = values.map((v, i) => (o.params[i]!.step >= 1 ? Math.round(v) : Number(v.toFixed(2)))).join(',');
    if (next === key) return;
    key = next;
    const old = current;
    current = o.make(engine, values);
    renderer.mesh = current;
    old?.destroy();
    say(`PrimitiveMesh.${o.call}(engine, ${next})`);
  };
  rebuild();
  if (stage.preview) {
    tick(root, (_dt, t) => {
      o.params.forEach((p, i) => {
        const [lo, hi] = p.sweep ?? [p.min, p.max];
        values[i] = lo + (hi - lo) * (0.5 + 0.5 * Math.sin(t * (0.5 + i * 0.13) + i * 1.7));
      });
      rebuild();
    });
  } else {
    o.params.forEach((p, i) => slider(stage.bar, p.label, p.min, p.max, p.step, p.value, (v) => ((values[i] = v), rebuild())));
  }
  stage.own(() => current?.destroy());
  return stage.dispose;
}

