// Serialization: undo and redo built from canvas.toObject() snapshots
import { Canvas, Circle, Rect, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus, codePanel } from '../../shared/code-panel.ts';
import { button } from '../../shared/controls.ts';
import { sampleScene, SCENE } from '../../shared/sample-scene.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['canvas', 'history'],
    scene: SCENE,
    hint: 'Every finished change stores a JSON snapshot. Undo and redo move along the list and loadFromJSON the snapshot there.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const show = codePanel(stage.panes[1]!, stage.preview);
  const say = briefStatus(stage);
  canvas.add(...sampleScene());

  const history: string[] = [];
  const labels: string[] = [];
  let at = -1;
  let loading = false;
  const draw = (): void => {
    show(labels.map((l, i) => `${i === at ? '>' : ' '} ${i}  ${l}  (${history[i]!.length} chars)`).join('\n'));
    say(`step ${at + 1} of ${history.length}`);
  };
  const record = (label: string): void => {
    if (loading) return;
    history.splice(at + 1); // a new change drops the redo branch
    labels.splice(at + 1);
    history.push(JSON.stringify(canvas.toObject()));
    labels.push(label);
    at = history.length - 1;
    draw();
  };
  const goTo = async (i: number): Promise<void> => {
    if (loading || i < 0 || i >= history.length) return;
    loading = true; // loadFromJSON fires object:added for each object: ignore those
    at = i;
    await canvas.loadFromJSON(history[i]!);
    loading = false;
    canvas.requestRenderAll(); // loadFromJSON does not repaint by itself
    if (!stage.disposed) draw();
  };

  canvas.on('object:modified', () => record('modified'));
  canvas.on('object:added', () => record('added'));
  canvas.on('object:removed', () => record('removed'));
  record('start');

  const colours = ['#d99a1c', '#8e5bd6', '#2b2a33'];
  const add = (): void => {
    const n = canvas.getObjects().length;
    const options = { left: 30 + (n * 37) % 100, top: 25 + (n * 29) % 40, fill: colours[n % 3] };
    canvas.add([new Circle({ ...options, radius: 14 }), new Rect({ ...options, width: 28, height: 28 }), new Triangle({ ...options, width: 28, height: 28 })][n % 3]!);
  };

  if (stage.bar) {
    button(stage.bar, 'add a shape', add);
    button(stage.bar, 'delete selected', () => {
      const sel = canvas.getActiveObject();
      if (sel) canvas.remove(sel);
    });
    button(stage.bar, 'undo', () => void goTo(at - 1));
    button(stage.bar, 'redo', () => void goTo(at + 1));
  } else {
    stage.repeat(async () => {
      for (let i = 0; i < 2; i++) {
        await stage.wait(700);
        add();
      }
      const first = canvas.item(0);
      first.set({ angle: 40, fill: '#e94b3c' });
      canvas.fire('object:modified', { target: first });
      await stage.wait(700);
      for (let i = 0; i < 3; i++) {
        await goTo(at - 1);
        await stage.wait(600);
      }
      await goTo(at + 1);
      await stage.wait(900);
      await goTo(0);
      history.length = 1;
      labels.length = 1;
      at = 0;
      draw();
    });
  }

  return stage.dispose;
};

export default mount;
