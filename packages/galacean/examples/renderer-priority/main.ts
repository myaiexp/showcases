// Renderer.priority: smaller values render earlier within a render queue
import { MeshRenderer, PrimitiveMesh, UnlitMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, steps } from '../../shared/gfx-kit.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 5], light: false });
  const say = caption(stage);
  const panes = [[-0.7, 0.95, 0.3, 0.25], [0.7, 0.25, 0.5, 0.95]].map(([x, r, g, b]) => {
    const entity = root.createChild('pane');
    entity.transform.setPosition(x!, 0, 0);
    entity.transform.setRotation(90, 0, 0);
    const renderer = entity.addComponent(MeshRenderer);
    renderer.mesh = PrimitiveMesh.createPlane(engine, 2.4, 2.4);
    const m = new UnlitMaterial(engine);
    m.baseColor.set(r!, g!, b!, 0.7);
    m.isTransparent = true;
    renderer.setMaterial(m);
    return renderer;
  });
  const apply = (aFirst: boolean): void => {
    panes[0]!.priority = aFirst ? 0 : 1;
    panes[1]!.priority = aFirst ? 1 : 0;
    say(`red priority ${panes[0]!.priority}, blue priority ${panes[1]!.priority}: ${aFirst ? 'blue' : 'red'} drawn last`);
  };
  if (stage.preview) steps(root, 2.2, 2, (i) => apply(i === 0));
  else {
    let first = true;
    apply(first);
    button(stage.bar, 'Swap priorities', () => apply((first = !first)));
  }
  stage.own(() => panes.forEach((p) => p.mesh.destroy()));
  return stage.dispose;
};

export default mount;
