// Serialization: a JSON text box that loads into the canvas as you type
import { Canvas } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus, pretty } from '../../shared/code-panel.ts';
import { sampleScene, SCENE } from '../../shared/sample-scene.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['canvas', 'JSON (editable)'],
    scene: SCENE,
    hint: 'Change a number, a colour or a "type" in the text. Valid JSON is loaded with loadFromJSON; mistakes are reported and the canvas keeps its last good state.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = briefStatus(stage);
  canvas.includeDefaultValues = false;
  canvas.add(...sampleScene());

  // The second pane holds a textarea instead of a canvas.
  stage.panes[1]!.el.style.display = 'none';
  const box = document.createElement('textarea');
  box.spellcheck = false;
  box.readOnly = stage.preview;
  box.style.cssText = `position:absolute;inset:0;width:100%;height:100%;box-sizing:border-box;resize:none;border:0;padding:${stage.preview ? 4 : 8}px;
    font:${stage.preview ? 7 : 12}px/1.35 ui-monospace,monospace;color:#2b2a33;background:#fffdf7;white-space:pre;overflow:${stage.preview ? 'hidden' : 'auto'}`;
  box.value = pretty(canvas.toJSON(), stage.preview);
  stage.panes[1]!.frame.append(box);

  let token = 0;
  const load = async (text: string): Promise<void> => {
    const mine = ++token;
    try {
      // JSON.parse errors and unknown "type" values both reject the promise.
      await canvas.loadFromJSON(text);
      canvas.requestRenderAll(); // loadFromJSON does not repaint by itself
      if (mine === token && !stage.disposed) say(`loaded ${canvas.getObjects().length} objects`);
    } catch (err) {
      if (mine === token && !stage.disposed) say(`not loaded: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  if (stage.bar) box.addEventListener('input', () => void load(box.value));
  else {
    // Card: edit the text for the reader, in steps.
    const colours = ['#3b7dd8', '#8e5bd6', '#e94b3c'];
    let i = 0;
    stage.every(1600, () => {
      const data = canvas.toJSON();
      data.objects[0]!.fill = colours[++i % 3];
      data.objects[0]!.angle = (i * 25) % 90;
      box.value = pretty(data, true);
      void load(box.value);
    });
  }

  return stage.dispose;
};

export default mount;
