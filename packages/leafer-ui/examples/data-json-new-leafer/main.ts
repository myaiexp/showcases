// Data: new Leafer(config, json) builds an engine from exported JSON
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { panes: ['leafer.toJSON()', 'new Leafer(config, json)'], hint: 'Drag the green rect on the left, then press import: the right engine is rebuilt from the left one\'s JSON.' });
  const [a, b] = stage.panes;
  const source = stage.own(new Leafer({ view: a!.view, fill: '#333' }), a);
  const S = size(stage) * 0.5;
  const rect = new Rect({ x: S / 3, y: S / 3, width: S, height: S, fill: '#32cd79', draggable: true });
  source.add(rect);
  let copy: Leafer | undefined;
  const importJson = (): void => {
    if (copy) stage.release(copy);
    const json = source.toJSON(); // tag, size, children
    copy = stage.own(new Leafer({ view: b!.view }, json as never), b);
  };
  importJson();
  if (stage.bar) button(stage.bar, 'import the JSON again', importJson);
  else {
    const ghost = stage.ghost(source, a);
    script(stage, async () => {
      await ghost.drag({ x: S * 0.8, y: S * 0.8 }, { x: S * 0.8 + 20, y: S * 0.8 + 30 }, 600);
      importJson();
      await stage.wait(1200);
      await ghost.drag({ x: S * 0.8 + 20, y: S * 0.8 + 30 }, { x: S * 0.8, y: S * 0.8 }, 600);
      importJson();
      await stage.wait(1200);
    });
  }

  return stage.dispose;
};

export default mount;
