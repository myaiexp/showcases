// MULTIPLY with opacity 0 deletes the splats inside a box or sphere; invert keeps only the inside
import { SplatEdit, SplatEditRgbaBlendMode, SplatEditSdf, SplatEditSdfType, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, select, checkbox } from '../../shared/controls.ts';
import { pushGarden } from '../../shared/subjects.ts';

const SHAPES = ['box', 'sphere'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [2.4, 1.7, 3], target: [0, 0.5, 0], orbit: 0.1 });

  const garden = new SplatMesh({ constructSplats: (s) => pushGarden(s, ctx.preview ? 15000 : 40000) });
  stage.scene.add(garden);

  // MULTIPLY is the default blend: splat RGBA x SDF RGBA. Opacity 0 zeroes the alpha, so the splat vanishes.
  const edit = new SplatEdit({ rgbaBlendMode: SplatEditRgbaBlendMode.MULTIPLY, softEdge: 0.05 });
  const cutter = new SplatEditSdf({ type: SplatEditSdfType.BOX, opacity: 0, radius: 0.1 });
  cutter.scale.set(0.7, 1.6, 0.7);
  edit.add(cutter);
  garden.add(edit);

  let sweep = true;
  let x = 0;
  const useShape = (shape: (typeof SHAPES)[number]): void => {
    cutter.type = shape === 'box' ? SplatEditSdfType.BOX : SplatEditSdfType.SPHERE;
    // Box: scale sets the half sizes and radius rounds corners. Sphere: radius is the size.
    cutter.radius = shape === 'box' ? 0.1 : 0.9;
  };

  if (!ctx.preview) {
    const bar = controlBar(el);
    select(bar, 'cutter', SHAPES, useShape);
    // Moving the slider takes over from the automatic sweep.
    slider(bar, 'x position', -2.5, 2.5, 0.1, 0, (v) => {
      sweep = false;
      sweepBox.checked = false;
      x = v;
    });
    const sweepBox = checkbox(bar, 'sweep', true, (v) => (sweep = v));
    checkbox(bar, 'invert (keep only inside)', false, (v) => (edit.invert = v));
    stage.run((time) => {
      if (sweep) x = Math.sin(time * 0.6) * 2;
      cutter.position.set(x, 0.5, 0);
    });
  } else {
    stage.run((time) => {
      cutter.position.set(Math.sin(time * 0.6) * 2, 0.5, 0);
      // The card also flips between cutting a hole and keeping only the inside.
      edit.invert = Math.floor(time / 5) % 2 === 1;
    });
  }
  return () => stage.dispose();
};

export default mount;
