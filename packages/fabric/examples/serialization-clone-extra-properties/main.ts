// Serialization: clone(propertiesToInclude) carries custom properties to the copy
import { Canvas, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus, codePanel } from '../../shared/code-panel.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { sampleScene, SCENE } from '../../shared/sample-scene.ts';
import { createStage } from '../../shared/stage.ts';

const nameOf = (o: FabricObject): string => String((o as FabricObject & { name?: string }).name ?? '(none)');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['canvas', 'names'],
    scene: SCENE,
    hint: 'clone() is toObject() followed by fromObject(), so only what toObject writes survives. Pass ["name", "zone"] to clone() and the copy keeps them.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const show = codePanel(stage.panes[1]!, stage.preview);
  const say = briefStatus(stage);
  canvas.add(...sampleScene());

  let withProps = false;
  let copies = 0;
  const list = (): void => {
    show(canvas.getObjects().map((o, i) => `${i}  ${(o.constructor as typeof FabricObject).type.padEnd(8)} name: ${nameOf(o)}`).join('\n'));
  };
  const cloneIt = async (source: FabricObject): Promise<void> => {
    // The argument is the same list propertiesToInclude takes in toObject().
    const copy = await source.clone(withProps ? ['name', 'zone'] : undefined);
    if (stage.disposed) return;
    copy.set({ left: source.left + 14, top: source.top + 14, opacity: 0.6 });
    copy.setCoords();
    canvas.add(copy);
    copies++;
    list();
    say(`clone(${withProps ? "['name', 'zone']" : ''}) made ${copies} copies`);
  };
  const reset = (): void => {
    canvas.remove(...canvas.getObjects().slice(3));
    copies = 0;
    list();
  };
  list();

  if (stage.bar) {
    checkbox(stage.bar, "clone(['name', 'zone'])", false, (on) => (withProps = on));
    button(stage.bar, 'clone the selection', () => void cloneIt(canvas.getActiveObject() ?? canvas.item(0)));
    button(stage.bar, 'remove copies', reset);
  } else {
    stage.every(1100, () => {
      if (canvas.getObjects().length >= 6) {
        withProps = !withProps;
        reset();
      } else void cloneIt(canvas.item(canvas.getObjects().length % 3));
    });
  }

  return stage.dispose;
};

export default mount;
