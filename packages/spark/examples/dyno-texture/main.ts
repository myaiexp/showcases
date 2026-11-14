// dynoSampler2D + texture(): a canvas you paint on colours and lifts a splat sheet
import * as THREE from 'three';
import { SplatMesh, dyno } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, controlBar, readout } from '../../shared/controls.ts';
import { pushSheet } from './sheet.ts';

const SIZE = 256;
const f = (v: number) => dyno.dynoConst('float', v);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 1.7, 2.4], orbit: 0.12 });
  const sheet = new SplatMesh({ constructSplats: (splats) => pushSheet(splats, ctx.preview ? 110 : 170) });
  stage.scene.add(sheet);

  // The 2D canvas the texture reads from.
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = SIZE;
  const g = canvas.getContext('2d')!;
  g.fillStyle = '#24476e';
  g.fillRect(0, 0, SIZE, SIZE);
  // No colour-space conversion: the shader gets the canvas bytes as written, which is what
  // splat colours expect.
  const texture = new THREE.CanvasTexture(canvas);

  // dynoSampler2D wraps the texture as a uniform; texture() samples it in the shader.
  const sampler = dyno.dynoSampler2D(texture);
  const paint = dyno.dynoBlock({ gsplat: dyno.Gsplat }, { gsplat: dyno.Gsplat }, ({ gsplat }) => {
    if (!gsplat) throw new Error('no gsplat');
    const { center } = dyno.splitGsplat(gsplat).outputs;
    const { x, y, z } = dyno.split(center).outputs;
    // Map the sheet's x and z (-1..1) onto texture coordinates (0..1).
    const uv = dyno.combine({ vectorType: 'vec2', x: dyno.add(dyno.mul(x, f(0.5)), f(0.5)), y: dyno.add(dyno.mul(z, f(0.5)), f(0.5)) });
    const sample = dyno.texture(sampler, uv);
    const { x: r, y: gr, z: b } = dyno.split(sample).outputs;
    const lum = dyno.dot(dyno.combine({ vectorType: 'vec3', x: r, y: gr, z: b }), dyno.dynoConst('vec3', new THREE.Vector3(0.3, 0.6, 0.1)));
    return {
      gsplat: dyno.combineGsplat({
        gsplat,
        // The texel's brightness also lifts the splat.
        y: dyno.add(y, dyno.mul(lum, f(0.3))),
        rgb: dyno.combine({ vectorType: 'vec3', x: r, y: gr, z: b }),
      }),
    };
  });
  sheet.objectModifiers = [paint];
  sheet.updateGenerator();

  const dab = (x: number, y: number, hue: number): void => {
    const grad = g.createRadialGradient(x, y, 0, x, y, 28);
    grad.addColorStop(0, `hsla(${hue}, 95%, 60%, 1)`);
    grad.addColorStop(1, `hsla(${hue}, 90%, 62%, 0)`);
    g.fillStyle = grad;
    g.fillRect(x - 30, y - 30, 60, 60);
    texture.needsUpdate = true; // re-upload the canvas
  };
  const fade = (): void => {
    g.fillStyle = 'rgba(36, 71, 110, 0.04)';
    g.fillRect(0, 0, SIZE, SIZE);
  };

  let ac: AbortController | null = null;
  let drawing = false;
  if (!ctx.preview) {
    readout(el, 'Draw on the small canvas, or let the wandering brush paint.').style.paddingTop = '6px';
    const bar = controlBar(el);
    canvas.style.cssText = 'width:128px;height:128px;border:1px solid #556;border-radius:4px;touch-action:none;cursor:crosshair';
    bar.append(canvas);
    button(bar, 'Clear', () => {
      g.fillStyle = '#24476e';
      g.fillRect(0, 0, SIZE, SIZE);
      texture.needsUpdate = true;
    });
    ac = new AbortController();
    const hueRef = { v: 30 };
    const at = (e: PointerEvent): [number, number] => {
      const r = canvas.getBoundingClientRect();
      return [((e.clientX - r.left) / r.width) * SIZE, ((e.clientY - r.top) / r.height) * SIZE];
    };
    canvas.addEventListener('pointerdown', (e) => ((drawing = true), canvas.setPointerCapture(e.pointerId), dab(...at(e), (hueRef.v = (hueRef.v + 25) % 360))), { signal: ac.signal });
    canvas.addEventListener('pointermove', (e) => drawing && dab(...at(e), hueRef.v), { signal: ac.signal });
    canvas.addEventListener('pointerup', () => (drawing = false), { signal: ac.signal });
  }

  stage.run((time) => {
    fade();
    // A brush that wanders on its own, so cards (and idle views) keep painting.
    dab(SIZE * (0.5 + 0.4 * Math.sin(time * 0.9)), SIZE * (0.5 + 0.4 * Math.sin(time * 1.4 + 1)), (time * 40) % 360);
    texture.needsUpdate = true;
    sheet.updateVersion();
  });
  return () => {
    ac?.abort();
    texture.dispose();
    stage.dispose();
  };
};

export default mount;
