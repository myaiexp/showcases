// A custom glTF extension in CreateAndParse mode builds the material itself
import { GLTFExtensionMode, GLTFExtensionParser, type GLTFParserContext, type Material, UnlitMaterial, registerGLTFExtension } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { lin, tick } from '../../shared/gfx-kit.ts';
import { NOOP, materialsOf, rig } from '../../shared/model-kit.ts';
import { pluginGlb } from '../../shared/model-gltf.ts';

class ToonPlugin extends GLTFExtensionParser {
  // The returned material replaces the default one the loader would have made for this glTF material.
  override createAndParse(context: GLTFParserContext, schema: { color: [number, number, number]; bands: number }): Material {
    const material = new UnlitMaterial(context.glTFResource.engine);
    material.baseColor.set(...lin(schema.color), 1);
    material.name = `toon x${schema.bands}`;
    return material;
  }
}

let registered = false;
function registerOnce(): void {
  if (registered) return;
  registered = true;
  registerGLTFExtension('SHOWCASE_toon', GLTFExtensionMode.CreateAndParse)(ToonPlugin);
}

const mount: Mount = async (el, ctx) => {
  registerOnce();
  const r = await rig(el, ctx, () => pluginGlb('toon'), { camera: [0, 1.8, 6], target: [0, 1, 0] });
  if (!r) return NOOP;
  const { stage, model } = r;
  panel(stage).text(`SHOWCASE_toon (CreateAndParse)\n${materialsOf(model).map((m) => `${m.name}: ${m instanceof UnlitMaterial ? 'UnlitMaterial' : 'PBRMaterial'}`).join('\n')}`);
  tick(model, (dt) => model.transform.rotate(0, 20 * dt, 0));
  return stage.dispose;
};

export default mount;
