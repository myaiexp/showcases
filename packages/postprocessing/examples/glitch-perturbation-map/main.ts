// GlitchEffect perturbationMap: swap the random noise for maps painted in code
import { EffectComposer, EffectPass, GlitchEffect, GlitchMode, RenderPass } from 'postprocessing';
import { DataTexture, RGBAFormat, type Texture } from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const N = 64;

/** An RGBA map; the glitch shader reads only red and green, as a displacement per pixel. */
function paint(name: string, fn: (x: number, y: number) => [number, number]): DataTexture {
  const data = new Uint8Array(N * N * 4);
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const [r, g] = fn(x / N, y / N);
      data.set([r * 255, g * 255, 0, 255], (y * N + x) * 4);
    }
  }
  const tex = new DataTexture(data, N, N, RGBAFormat);
  tex.name = name;
  tex.needsUpdate = true;
  return tex;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const maps: Record<string, Texture> = {
    'waves': stage.own(paint('waves', (x, y) => [0.5 + 0.5 * Math.sin(y * 40), 0.5 + 0.5 * Math.sin(x * 25)])),
    'blocks': stage.own(paint('blocks', (x, y) => [Math.floor(x * 8) % 2, Math.floor(y * 8) % 2])),
    'ramp': stage.own(paint('ramp', (x, y) => [x, y])),
  };

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // Without perturbationMap the effect makes its own random noise texture and disposes it itself.
  const glitch = new GlitchEffect({ perturbationMap: maps.waves });
  glitch.mode = GlitchMode.CONSTANT_WILD;
  composer.addPass(new EffectPass(stage.camera, glitch));

  const label = overlay(stage.box);
  const names = Object.keys(maps);
  const set = (name: string): void => {
    glitch.perturbationMap = maps[name]!;
    label.textContent = `perturbationMap = ${name}`;
  };
  set('waves');
  if (stage.bar) select(stage.bar, 'map', names, set, 'waves');
  else {
    let i = 0;
    stage.every(2500, () => set(names[++i % names.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
