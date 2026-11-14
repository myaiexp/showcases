// SplatMesh.splatRgba: bake a moving paint sphere's colours into the mesh for good
import * as THREE from 'three';
import { RgbaArray, SplatEdit, SplatEditRgbaBlendMode, SplatEditSdf, SplatMesh, dyno } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, controlBar, readout } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0, 2.6] });
  const knot = new SplatMesh({ constructSplats: (splats) => pushTorusKnot(splats, ctx.preview ? 15000 : 30000) });
  stage.scene.add(knot);

  // A live edit: a hot-pink sphere that paints whatever splats it overlaps, only while it overlaps.
  const edit = new SplatEdit({ rgbaBlendMode: SplatEditRgbaBlendMode.SET_RGB, softEdge: 0.05 });
  const brush = new SplatEditSdf({ radius: 0.28, color: new THREE.Color(1, 0.1, 0.6) });
  edit.add(brush);
  knot.add(edit);

  // Two arrays, alternating: each bake reads the mesh as it is now (earlier bakes included)
  // and writes into the array the mesh is not currently reading.
  const arrays = [new RgbaArray(), new RgbaArray()];
  let next = 0;
  let baked = 0;
  const info = ctx.preview ? null : readout(el);

  const bake = (): void => {
    const generator = knot.generator;
    const count = knot.packedSplats?.numSplats ?? 0;
    if (!generator || !count) return;
    // A reader that returns each splat's final RGBA from the mesh's own generator.
    const reader = dyno.dynoBlock({ index: 'int' }, { rgba8: 'vec4' }, ({ index }) => {
      const { gsplat } = generator.apply({ index });
      return { rgba8: dyno.splitGsplat(gsplat).outputs.rgba };
    });
    const target = arrays[next]!;
    target.render({ renderer: stage.renderer, count, reader });
    // From here on the mesh takes colours from the array, whatever the edit does.
    knot.splatRgba = target;
    knot.updateGenerator();
    next = 1 - next;
    baked++;
    if (info) info.textContent = `baked ${baked} time${baked === 1 ? '' : 's'}: splatRgba now holds ${count} colours`;
  };
  const clear = (): void => {
    knot.splatRgba = null;
    knot.updateGenerator();
    baked = 0;
    if (info) info.textContent = 'cleared: splatRgba is null, colours come from the file again';
  };

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(bake, 700);
  } else {
    const bar = controlBar(el);
    button(bar, 'Bake current colours', bake);
    button(bar, 'Clear splatRgba', clear);
    if (info) info.textContent = 'The pink sphere is an edit. Press Bake while it overlaps the knot to copy its paint into splatRgba.';
  }

  stage.run((time) => {
    brush.position.set(Math.cos(time * 0.7) * 0.75, Math.sin(time * 1.1) * 0.5, Math.sin(time * 0.7) * 0.4);
  });
  return () => {
    clearInterval(timer);
    arrays.forEach((a) => a.dispose());
    stage.dispose();
  };
};

export default mount;
