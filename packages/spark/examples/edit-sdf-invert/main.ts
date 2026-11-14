// invert on a whole SplatEdit versus invert on a single SplatEditSdf, against a plain baseline
import * as THREE from 'three';
import { SplatEdit, SplatEditRgbaBlendMode, SplatEditSdf, SplatEditSdfType, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, checkbox, overlay } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

/** A torus knot with one SET_RGB edit holding a red and a blue sphere. */
function paintedKnot(x: number, count: number): { knot: SplatMesh; edit: SplatEdit; red: SplatEditSdf; blue: SplatEditSdf } {
  const knot = new SplatMesh({ constructSplats: (s) => pushTorusKnot(s, count) });
  knot.position.x = x;
  knot.scale.setScalar(0.95);
  const edit = new SplatEdit({ rgbaBlendMode: SplatEditRgbaBlendMode.SET_RGB, softEdge: 0.08 });
  const red = new SplatEditSdf({ type: SplatEditSdfType.SPHERE, radius: 0.45, color: new THREE.Color(1, 0.15, 0.1) });
  const blue = new SplatEditSdf({ type: SplatEditSdfType.SPHERE, radius: 0.45, color: new THREE.Color(0.1, 0.3, 1) });
  edit.add(red, blue);
  knot.add(edit);
  return { knot, edit, red, blue };
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.2, 5.4], fov: 50, orbit: false });
  const label = overlay(el);
  const count = ctx.preview ? 9000 : 25000;

  const plain = paintedKnot(-2.4, count);
  const editInverted = paintedKnot(0, count);
  const sdfInverted = paintedKnot(2.4, count);
  for (const k of [plain, editInverted, sdfInverted]) stage.scene.add(k.knot);

  let editFlag = true;
  let sdfFlag = true;
  const apply = (): void => {
    editInverted.edit.invert = editFlag; // flips the combined field: the edit acts outside both spheres
    sdfInverted.blue.invert = sdfFlag; // flips one shape: the blue region becomes everything but its sphere
    label.textContent = ctx.preview
      ? `edit.invert ${editFlag}   sdf.invert ${sdfFlag}`
      : `none   |   edit.invert = ${editFlag}   |   blue sdf.invert = ${sdfFlag}`;
  };
  apply();

  if (!ctx.preview) {
    const bar = controlBar(el);
    checkbox(bar, 'edit.invert (middle)', editFlag, (v) => ((editFlag = v), apply()));
    checkbox(bar, 'blue sdf.invert (right)', sdfFlag, (v) => ((sdfFlag = v), apply()));
  }

  stage.run((time) => {
    for (const k of [plain, editInverted, sdfInverted]) {
      k.red.position.set(-0.5, 0.3 + Math.sin(time) * 0.25, 0);
      k.blue.position.set(0.5, -0.2 + Math.cos(time * 0.8) * 0.25, 0);
      k.knot.rotation.y = Math.sin(time * 0.4) * 0.5;
    }
    if (ctx.preview) {
      // The card walks through all four on/off combinations.
      const step = Math.floor(time / 2.5) % 4;
      const wantEdit = (step & 1) === 0;
      const wantSdf = step < 2;
      if (wantEdit !== editFlag || wantSdf !== sdfFlag) {
        editFlag = wantEdit;
        sdfFlag = wantSdf;
        apply();
      }
    }
  });
  return () => stage.dispose();
};

export default mount;
