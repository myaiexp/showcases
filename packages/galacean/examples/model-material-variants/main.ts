// KHR_materials_variants: glTF.extensionsData.variants lists materials to swap with setMaterial
import { type GLTFResource, type Material, type Renderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { steps, tick } from '../../shared/gfx-kit.ts';
import { NOOP, buttons, rig } from '../../shared/model-kit.ts';
import { variantsGlb } from '../../shared/model-gltf.ts';

type Variants = { renderer: Renderer; material: Material; variants: string[] }[];

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, variantsGlb, { camera: [0, 1.8, 5], target: [0, 0.9, 0] });
  if (!r) return NOOP;
  const { stage, root, gltf, model } = r;
  const info = panel(stage);
  // The loader hands the mappings over as extensionsData.variants, one entry per renderer and material.
  const variants = (gltf as GLTFResource).extensionsData.variants as Variants;
  const names = [...new Set(variants.flatMap((v) => v.variants))];
  const apply = (name: string): void => {
    for (const { renderer, material, variants: list } of variants) if (list.includes(name)) renderer.setMaterial(material);
    info.text(`variant: ${name}\nmappings: ${variants.length}`);
  };
  apply(names[0]!);
  if (stage.preview) steps(root, 1.5, names.length, (i) => apply(names[i]!));
  else buttons(stage, names, apply);
  tick(model, (dt) => model.transform.rotate(0, 30 * dt, 0));
  return stage.dispose;
};

export default mount;
