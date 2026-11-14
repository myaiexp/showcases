// textSplats: live text rasterised to splats, with font, size, alignment, line height and colour
import * as THREE from 'three';
import { SplatMesh, textSplats } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, select } from '../../shared/controls.ts';

const FONTS = ['Arial', 'Georgia', 'Courier New', 'Impact', 'cursive'] as const;
const ALIGNS = ['left', 'center', 'right'] as const;
const TINTS = ['rgb (per splat)', 'color (recolor tint)'] as const;
const WORDS = ['SPARK', 'splats', 'from text', 'pixel by pixel'];

const mount: Mount = (el, ctx) => {
  // Text faces +Z, so the mesh sways instead of the camera orbiting round to its back.
  const stage = createStage(el, ctx, { position: [0, 0, 5], orbit: 0 });
  const p = {
    text: 'Hello, Spark!\nText made of splats',
    font: 'Arial' as string,
    fontSize: 32,
    align: 'center' as (typeof ALIGNS)[number],
    lineHeight: 1,
    tint: TINTS[0] as (typeof TINTS)[number],
    hex: '#ffb347',
  };
  if (ctx.preview) p.text = WORDS[0]!;

  let mesh: SplatMesh | null = null;
  const rebuild = (): void => {
    if (mesh) {
      stage.scene.remove(mesh);
      mesh.dispose();
    }
    const tint = new THREE.Color(p.hex);
    const recolor = p.tint === TINTS[1];
    mesh = textSplats({
      text: p.text || ' ',
      font: p.font,
      fontSize: p.fontSize,
      textAlign: p.align,
      lineHeight: p.lineHeight,
      // `rgb` colours each splat itself; `color` tints white splats through SplatMesh.recolor.
      ...(recolor ? { color: tint } : { rgb: tint }),
    });
    // textSplats counts one unit per pixel, so shrink the mesh to fit the view.
    const lines = p.text.split('\n');
    const widest = Math.max(1, ...lines.map((l) => l.length));
    const s = Math.min((ctx.preview ? 6 : 9) / (widest * 0.55 * p.fontSize), 4 / (lines.length * 1.3 * p.fontSize * p.lineHeight));
    mesh.scale.setScalar(s);
    stage.scene.add(mesh);
  };
  rebuild();

  let timer: number | undefined;
  if (ctx.preview) {
    // The card cycles through words, a fresh hue each time.
    let i = 0;
    timer = window.setInterval(() => {
      i = (i + 1) % WORDS.length;
      p.text = WORDS[i]!;
      p.hex = `#${new THREE.Color().setHSL((i * 0.27) % 1, 0.8, 0.6).getHexString()}`;
      rebuild();
    }, 1600);
  } else {
    const bar = controlBar(el);
    const input = document.createElement('textarea');
    input.value = p.text;
    input.rows = 2;
    input.style.cssText = 'flex:1 1 240px;font:inherit';
    input.addEventListener('input', () => ((p.text = input.value), rebuild()));
    bar.append(input);
    select(bar, 'font', FONTS, (v) => ((p.font = v), rebuild()));
    select(bar, 'textAlign', ALIGNS, (v) => ((p.align = v), rebuild()), p.align);
    slider(bar, 'fontSize', 12, 64, 4, p.fontSize, (v) => ((p.fontSize = v), rebuild()));
    slider(bar, 'lineHeight', 0.6, 2, 0.1, p.lineHeight, (v) => ((p.lineHeight = v), rebuild()));
    select(bar, 'tint via', TINTS, (v) => ((p.tint = v), rebuild()));
    const picker = document.createElement('input');
    picker.type = 'color';
    picker.value = p.hex;
    picker.addEventListener('input', () => ((p.hex = picker.value), rebuild()));
    bar.append(picker);
  }

  stage.run((time) => {
    if (mesh) mesh.rotation.y = Math.sin(time * 0.7) * 0.5;
  });
  return () => {
    window.clearInterval(timer);
    stage.dispose();
  };
};

export default mount;
