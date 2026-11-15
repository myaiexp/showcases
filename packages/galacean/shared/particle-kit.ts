// Shared particle helpers: stage, emitter with soft-dot material, curves
import {
  BlendMode,
  Color,
  type Entity,
  ParticleCompositeCurve,
  ParticleCompositeGradient,
  ParticleCurve,
  CurveKey,
  GradientAlphaKey,
  GradientColorKey,
  ParticleGradient,
  ParticleMaterial,
  ParticleRenderer,
  type Texture2D,
} from '@galacean/engine';
import type { MountContext } from '@/types.ts';
import { lin } from './gfx-kit.ts';
import { addCamera, createStage, type Stage, type StageOptions } from './stage.ts';
import { canvasTexture, softDot } from './textures.ts';

type V3 = [number, number, number];

export interface Fx {
  stage: Stage;
  root: Entity;
}

export interface FxOptions extends StageOptions {
  camera?: V3;
  target?: V3;
}

/** A stage with a perspective camera looking at `target`, on a dark background that suits additive blending. */
export async function fxStage(el: HTMLElement, ctx: MountContext, options: FxOptions = {}): Promise<Fx> {
  const stage = await createStage(el, ctx, { background: [0.01, 0.012, 0.025, 1], ...options });
  addCamera(stage.root, options.camera ?? [0, 1.5, 9], options.target ?? [0, 1.5, 0]);
  return { stage, root: stage.root };
}

export interface EmitterOptions {
  position?: V3;
  /** Rotation in degrees (default -90, 0, 0: pointing up). */
  rotation?: V3;
  /** sRGB tint of the particle material (default white). */
  tint?: V3;
  additive?: boolean;
  texture?: Texture2D;
  name?: string;
  /** false keeps the engine's own main-module defaults (lifetime 5, speed 5, size 1, rate 10). */
  calm?: boolean;
}

export interface Emitter {
  entity: Entity;
  renderer: ParticleRenderer;
  material: ParticleMaterial;
  /** `renderer.generator`: the main, emission and lifetime modules live on it. */
  gen: ParticleRenderer['generator'];
}

/** The soft-dot texture most examples share: white centre fading to transparent. */
export const dotTexture = (stage: Stage, color = '#ffffff'): Texture2D => canvasTexture(stage.engine, softDot(color), { size: 64 });

/** An entity with a ParticleRenderer using a ParticleMaterial with `baseTexture` (a soft dot unless given). */
export function emitter(stage: Stage, parent: Entity, o: EmitterOptions = {}): Emitter {
  const entity = parent.createChild(o.name ?? 'particles');
  entity.transform.setPosition(...(o.position ?? [0, -1.5, 0]));
  entity.transform.setRotation(...(o.rotation ?? [-90, 0, 0])); // shapes emit along local +Z: aim it up
  const renderer = entity.addComponent(ParticleRenderer);
  const material = new ParticleMaterial(stage.engine);
  material.baseTexture = o.texture ?? dotTexture(stage);
  material.baseColor.set(...lin(o.tint ?? [1, 1, 1]), 1);
  if (o.additive ?? true) material.blendMode = BlendMode.Additive;
  renderer.setMaterial(material);
  const gen = renderer.generator;
  if (o.calm ?? true) {
    // Scaled down so the stream stays inside a 200px card: short life, slow, small, few.
    gen.main.startLifetime.constant = 2;
    gen.main.startSpeed.constant = 2;
    gen.main.startSize.constant = 0.35;
    gen.emission.rateOverTime.constant = 14;
  }
  return { entity, renderer, material, gen };
}

/** A constant curve. */
export const constant = (v: number): ParticleCompositeCurve => new ParticleCompositeCurve(v);

/** A random-between-two-constants curve. */
export const between = (a: number, b: number): ParticleCompositeCurve => new ParticleCompositeCurve(a, b);

/** A curve through `[time, value]` points (time 0 to 1 over the particle's life). */
export const curve = (...points: [number, number][]): ParticleCompositeCurve => new ParticleCompositeCurve(new ParticleCurve(...points.map(([t, v]) => new CurveKey(t, v))));

/** A gradient from sRGB colour stops `[time, [r, g, b]]` and alpha stops `[time, alpha]`. */
export function gradient(colors: [number, V3][], alphas: [number, number][] = [[0, 1], [1, 1]]): ParticleCompositeGradient {
  return new ParticleCompositeGradient(
    new ParticleGradient(
      colors.map(([t, c]) => new GradientColorKey(t, new Color(...lin(c), 1))),
      alphas.map(([t, a]) => new GradientAlphaKey(t, a)),
    ),
  );
}

/** A constant colour for `main.startColor` from an sRGB triple. */
export const colorOf = (c: V3, a = 1): ParticleCompositeGradient => new ParticleCompositeGradient(new Color(...lin(c), a));

/** A white arrow pointing up on transparent: makes rotation and stretching readable. */
export const arrowTexture = (stage: Stage): Texture2D =>
  canvasTexture(
    stage.engine,
    (g, s) => {
      g.fillStyle = '#fff';
      g.beginPath();
      g.moveTo(s / 2, s * 0.06);
      g.lineTo(s * 0.9, s * 0.5);
      g.lineTo(s * 0.62, s * 0.5);
      g.lineTo(s * 0.62, s * 0.94);
      g.lineTo(s * 0.38, s * 0.94);
      g.lineTo(s * 0.38, s * 0.5);
      g.lineTo(s * 0.1, s * 0.5);
      g.closePath();
      g.fill();
    },
    { size: 64 },
  );

/** A ring-and-cross sheet cell grid: `cols` x `rows` numbered cells, for texture sheet animation. */
export const sheetTexture = (stage: Stage, cols: number, rows: number): Texture2D =>
  canvasTexture(
    stage.engine,
    (g, s) => {
      const cw = s / cols;
      const ch = s / rows;
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          g.fillStyle = `hsl(${(i / (cols * rows)) * 330} 80% 55%)`;
          g.beginPath();
          g.arc((c + 0.5) * cw, (r + 0.5) * ch, Math.min(cw, ch) * 0.42, 0, Math.PI * 2);
          g.fill();
          g.fillStyle = '#fff';
          g.font = `bold ${Math.min(cw, ch) * 0.5}px sans-serif`;
          g.fillText(String(i), (c + 0.5) * cw, (r + 0.5) * ch + 2);
        }
      }
    },
    { size: 256 },
  );
