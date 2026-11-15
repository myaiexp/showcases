// A custom AdditiveParse glTF extension adds a Script to its nodes
import { Entity, GLTFExtensionMode, GLTFExtensionParser, type GLTFParserContext, Script, registerGLTFExtension } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { NOOP, rig } from '../../shared/model-kit.ts';
import { pluginGlb } from '../../shared/model-gltf.ts';

class Spinner extends Script {
  degreesPerSecond = 0;
  override onUpdate(dt: number): void {
    this.entity.transform.rotate(0, this.degreesPerSecond * dt, 0);
  }
}

class SpinPlugin extends GLTFExtensionParser {
  override additiveParse(_context: GLTFParserContext, entity: Entity, schema: { degreesPerSecond: number }): void {
    entity.addComponent(Spinner).degreesPerSecond = schema.degreesPerSecond;
  }
}

// Registering is page-wide and permanent (there is no unregister), so it happens once.
let registered = false;
function registerOnce(): void {
  if (registered) return;
  registered = true;
  // What `@registerGLTFExtension('SHOWCASE_spin', GLTFExtensionMode.AdditiveParse)` does above a class.
  registerGLTFExtension('SHOWCASE_spin', GLTFExtensionMode.AdditiveParse)(SpinPlugin);
}

const mount: Mount = async (el, ctx) => {
  registerOnce();
  const r = await rig(el, ctx, () => pluginGlb('spin'), { camera: [0, 1.8, 6], target: [0, 1, 0] });
  if (!r) return NOOP;
  const { stage, model } = r;
  const spinners = model.getComponentsIncludeChildren(Spinner, []);
  panel(stage).text(`SHOWCASE_spin (AdditiveParse)\n${spinners.map((s) => `${s.entity.name}: ${s.degreesPerSecond} deg/s`).join('\n')}`);
  return stage.dispose;
};

export default mount;
