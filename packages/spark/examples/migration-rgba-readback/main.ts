// RgbaArray.render with a dyno reader: read the edited splat colours back to the CPU
import * as THREE from 'three';
import { RgbaArray, SplatEdit, SplatEditRgbaBlendMode, SplatEditSdf, SplatMesh, dyno } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, controlBar, readout } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';
import { createHistogram } from './histogram.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0, 2.6] });
  const knot = new SplatMesh({ constructSplats: (splats) => pushTorusKnot(splats, ctx.preview ? 15000 : 30000) });
  // A sphere that paints everything inside it white, so the readback has something to show.
  const edit = new SplatEdit({ rgbaBlendMode: SplatEditRgbaBlendMode.SET_RGB, softEdge: 0.1 });
  const sphere = new SplatEditSdf({ radius: 0.45, color: new THREE.Color(1, 1, 1) });
  edit.add(sphere);
  knot.add(edit);
  stage.scene.add(knot);

  const histogram = createHistogram(ctx.preview ? 240 : 480, ctx.preview ? 40 : 70);
  histogram.canvas.style.cssText = ctx.preview
    ? 'position:absolute;left:10px;bottom:8px;width:240px;height:40px'
    : 'width:100%;height:70px;margin-top:6px';
  el.style.position = 'relative';
  el.append(histogram.canvas);
  const info = ctx.preview ? null : readout(el);

  const rgba = new RgbaArray();
  // A reader compiles to its own shader program, so build one per generator, not per read.
  let reader: ReturnType<typeof makeReader> | null = null;
  let readerFor: typeof knot.generator;
  const makeReader = (generator: NonNullable<typeof knot.generator>) =>
    dyno.dynoBlock({ index: 'int' }, { rgba8: 'vec4' }, ({ index }) => {
      const { gsplat } = generator.apply({ index });
      return { rgba8: dyno.splitGsplat(gsplat).outputs.rgba };
    });

  let busy = false;
  const readBack = async (): Promise<void> => {
    // The generator is the mesh's full splat pipeline, edits and recolor included.
    const generator = knot.generator;
    if (busy || !generator) return;
    busy = true;
    if (!reader || readerFor !== generator) {
      reader = makeReader(generator);
      readerFor = generator;
    }
    const count = knot.packedSplats?.numSplats ?? 0;
    const started = performance.now();
    rgba.render({ renderer: stage.renderer, count, reader });
    const array = await rgba.read();
    histogram.draw(array, count);
    if (info) info.textContent = `read ${count} RGBA values in ${(performance.now() - started).toFixed(1)} ms`;
    busy = false;
  };

  let timer = 0;
  if (ctx.preview) timer = window.setInterval(readBack, 1200);
  else {
    const bar = controlBar(el);
    button(bar, 'Read back now', () => void readBack());
    button(bar, 'Random tint', () => {
      knot.recolor.setHSL(Math.random(), 0.6, 0.7);
      void readBack();
    });
    timer = window.setInterval(readBack, 1000);
  }

  stage.run((time) => {
    sphere.position.set(Math.cos(time * 0.6) * 0.6, Math.sin(time * 0.6) * 0.6, 0);
  });
  return () => {
    clearInterval(timer);
    rgba.dispose();
    stage.dispose();
  };
};

export default mount;
