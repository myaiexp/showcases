// Serialize, clear, then restore a canvas with loadFromJSON and a reviver
import { Canvas, FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus, codePanel } from '../../shared/code-panel.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { sampleScene, SCENE } from '../../shared/sample-scene.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['canvas', 'saved string'],
    scene: SCENE,
    hint: 'Save keeps JSON.stringify(canvas) in a string, Clear empties the canvas, Restore feeds the string to loadFromJSON.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const show = codePanel(stage.panes[1]!, stage.preview);
  const say = briefStatus(stage);
  canvas.add(...sampleScene());
  canvas.includeDefaultValues = false;

  let saved = '';
  let outline = false;
  const save = (): void => {
    saved = JSON.stringify(canvas);
    show(saved);
    say(`saved ${saved.length} chars`);
  };
  const clear = (): void => {
    canvas.clear();
    say('cleared: 0 objects');
  };
  const restore = async (): Promise<void> => {
    if (!saved) return;
    // The reviver runs once per object, after fabric built it (instance) or failed to (error).
    await canvas.loadFromJSON(saved, (_serialized, instance) => {
      if (outline && instance instanceof FabricObject) instance.set({ stroke: '#2b2a33', strokeWidth: 3 });
    });
    canvas.requestRenderAll(); // loadFromJSON does not repaint by itself
    if (!stage.disposed) say(`restored ${canvas.getObjects().length} objects${outline ? ' (reviver added outlines)' : ''}`);
  };

  save();
  if (stage.bar) {
    button(stage.bar, 'save', save);
    button(stage.bar, 'clear', clear);
    button(stage.bar, 'restore', () => void restore());
    checkbox(stage.bar, 'reviver outlines objects', false, (v) => (outline = v));
  } else {
    stage.repeat(async () => {
      outline = !outline;
      save();
      await stage.wait(700);
      clear();
      await stage.wait(700);
      await restore();
      await stage.wait(1200);
    });
  }

  return stage.dispose;
};

export default mount;
