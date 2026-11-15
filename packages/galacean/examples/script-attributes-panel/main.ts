// A script's fields exposed as Number, Slider, Boolean, Vector3, Color, Select and Textarea parameters
import { type BlinnPhongMaterial, Color, MeshRenderer, type ModelMesh, PrimitiveMesh, Script, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { checkbox, color, select, slider } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

// The docs' @inspect decorator lives in the Editor. This script keeps the same shape: plain fields plus metadata.
class Rotator extends Script {
  /** Number: min 0, max 10, step 0.1 */
  rotate = 2;
  /** Boolean */
  spinning = true;
  /** Vector3: the axis weights */
  axis = new Vector3(0, 1, 0);
  /** Color */
  tint = new Color(0.95, 0.6, 0.2, 1);
  /** Select: shape */
  shape: 'cube' | 'sphere' | 'torus' = 'cube';
  /** Textarea */
  note = 'rotating';
  renderer?: MeshRenderer;
  meshes: Record<string, ModelMesh> = {};
  override onUpdate(): void {
    if (this.spinning) this.entity.transform.rotate(this.rotate * this.axis.x, this.rotate * this.axis.y, this.rotate * this.axis.z);
    if (this.renderer) {
      this.renderer.mesh = this.meshes[this.shape]!;
      (this.renderer.getMaterial() as BlinnPhongMaterial).baseColor.copyFrom(this.tint);
    }
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The controls below are generated from the script, one kind per parameter type.' });
  const { engine, root } = stage;
  lit(stage, [0, 1.5, 6]);
  const material = phong(engine, PALETTE.amber);
  const body = solid(root, PrimitiveMesh.createCuboid(engine, 1, 1, 1), material);
  const script = body.addComponent(Rotator);
  script.renderer = body.getComponent(MeshRenderer)!;
  script.meshes = {
    cube: PrimitiveMesh.createCuboid(engine, 1.8, 1.8, 1.8),
    sphere: PrimitiveMesh.createSphere(engine, 1.1, 32),
    torus: PrimitiveMesh.createTorus(engine, 1.1, 0.4, 24, 32),
  };
  const info = panel(stage);
  const rgb = (c: Color): [number, number, number] => [c.r, c.g, c.b];
  if (!stage.preview) {
    slider(stage.bar, 'rotate (Slider)', 0, 10, 0.1, script.rotate, (v) => (script.rotate = v));
    checkbox(stage.bar, 'spinning (Boolean)', true, (v) => (script.spinning = v));
    for (const k of ['x', 'y', 'z'] as const) slider(stage.bar, `axis.${k} (Vector3)`, 0, 1, 0.05, script.axis[k], (v) => (script.axis[k] = v));
    color(stage.bar, 'tint (Color)', rgb(script.tint), (v) => script.tint.set(v[0], v[1], v[2], 1));
    select(stage.bar, 'shape (Select)', ['cube', 'sphere', 'torus'] as const, (v) => (script.shape = v));
    const note = document.createElement('textarea');
    note.value = script.note;
    note.rows = 1;
    note.placeholder = 'note (Textarea)';
    note.addEventListener('input', () => (script.note = note.value));
    stage.bar.append(note);
  }
  tick(root, (_dt, t) => {
    if (stage.preview) {
      script.rotate = 1 + Math.abs(Math.sin(t * 0.4)) * 3;
      script.axis.set(0.3 + Math.sin(t * 0.3) * 0.3, 1, 0.2);
      script.shape = (['cube', 'sphere', 'torus'] as const)[Math.floor(t / 3) % 3]!;
      script.tint.set(0.9, 0.5 + Math.sin(t) * 0.3, 0.3 + Math.cos(t * 0.7) * 0.2, 1);
    }
    info.text(`rotate ${script.rotate.toFixed(1)}  spinning ${script.spinning}\naxis ${script.axis.x.toFixed(2)}, ${script.axis.y.toFixed(2)}, ${script.axis.z.toFixed(2)}\nshape ${script.shape}\nnote ${script.note}`);
  });
  return stage.dispose;
};

export default mount;
