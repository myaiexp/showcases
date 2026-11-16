// Serialization: toDatalessJSON swaps a long path for its sourcePath string
import { Canvas, Path } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus, codePanel, pretty } from '../../shared/code-panel.ts';
import { button, select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

// A 72-point spiky outline: long path data, as the guide's dragon drawing is.
const outline = Array.from({ length: 72 }, (_, i) => {
  const a = (i / 72) * Math.PI * 2;
  const r = 70 + (i % 2 ? 22 : 0) + Math.sin(a * 5) * 10;
  return `${i ? 'L' : 'M'} ${(100 + Math.cos(a) * r).toFixed(1)} ${(100 + Math.sin(a) * r).toFixed(1)}`;
}).join(' ') + ' Z';

// Pretend file store: what a sourcePath points at.
const files: Record<string, string> = { 'shapes/burst.svg': outline };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['canvas', 'serialized'],
    scene: [200, 200],
    hint: 'sourcePath is a property you set. toDatalessJSON() writes it instead of the path data; loading the result back is up to you.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const show = codePanel(stage.panes[1]!, stage.preview);
  const say = briefStatus(stage);

  const burst = new Path(outline, { left: 100, top: 100, fill: '#f2b134', stroke: '#a8700a', strokeWidth: 3 });
  burst.sourcePath = 'shapes/burst.svg';
  canvas.add(burst);

  let mode: 'toJSON' | 'toDatalessJSON' = 'toJSON';
  const refresh = (): void => {
    const data = mode === 'toJSON' ? canvas.toJSON() : canvas.toDatalessJSON();
    const size = JSON.stringify(data).length;
    show(pretty(data, stage.preview));
    say(`${size} chars, ${mode}()`);
  };

  // loadFromJSON never fetches a sourcePath: put the file's path data back before loading.
  const restore = async (): Promise<void> => {
    const data = canvas.toDatalessJSON();
    for (const o of data.objects as { sourcePath?: string; path?: unknown }[]) {
      if (o.sourcePath) o.path = files[o.sourcePath];
    }
    await canvas.loadFromJSON(data);
    canvas.requestRenderAll(); // loadFromJSON does not repaint
    if (!stage.disposed) refresh();
  };

  refresh();
  if (stage.bar) {
    select(stage.bar, 'output', ['toJSON', 'toDatalessJSON'] as const, (v) => {
      mode = v;
      refresh();
    });
    button(stage.bar, 'restore from the dataless JSON', () => void restore());
  } else {
    stage.every(1800, () => {
      mode = mode === 'toJSON' ? 'toDatalessJSON' : 'toJSON';
      refresh();
    });
  }
  stage.loop((_dt, t) => {
    canvas.getObjects()[0]?.set('angle', t * 20);
    canvas.requestRenderAll();
  });

  return stage.dispose;
};

export default mount;
