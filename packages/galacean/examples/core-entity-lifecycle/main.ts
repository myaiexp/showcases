// An entity created detached, added to the scene, removed, then destroyed
import { Entity, MeshRenderer, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { lit, PALETTE, phong, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Step through the four calls, or leave auto on.' });
  const { engine, root } = stage;
  lit(stage, [0, 1.5, 6]);
  const info = panel(stage);
  const mesh = PrimitiveMesh.createCuboid(engine, 1.3, 1.3, 1.3);
  const material = phong(engine, PALETTE.amber);
  let box: Entity | undefined;
  const steps = [
    {
      code: "const box = new Entity(engine, 'box');\nbox.addComponent(MeshRenderer);",
      run: () => {
        box = new Entity(engine, 'box');
        const renderer = box.addComponent(MeshRenderer);
        renderer.mesh = mesh;
        renderer.setMaterial(material);
        box.transform.setRotation(25, 35, 0);
      },
    },
    { code: 'root.addChild(box);', run: () => root.addChild(box!) },
    { code: 'root.removeChild(box);', run: () => root.removeChild(box!) },
    { code: 'box.destroy();', run: () => box!.destroy() },
  ];
  let index = -1;
  const next = (): void => {
    index = (index + 1) % steps.length;
    steps[index]!.run();
  };
  let auto = true;
  let last = 0;
  if (!stage.preview) {
    checkbox(stage.bar, 'auto', true, (v) => (auto = v));
    button(stage.bar, 'Next step', next);
  }
  next();
  tick(root, (_dt, t) => {
    if (auto && t - last > 1.7) {
      last = t;
      next();
    }
    box?.transform.rotate(0, 0.8, 0);
    info.text(`${steps[index]!.code}\n\nparent: ${box?.parent ? box.parent.name : 'none'}   destroyed: ${box?.destroyed ?? false}`);
  });
  return stage.dispose;
};

export default mount;
