// util.loadImage resolves, rejects on a broken source, aborts on a signal
import { Canvas, FabricImage, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { codePanel } from '../../shared/code-panel.ts';
import { button } from '../../shared/controls.ts';
import { pictureURL } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';

const GOOD = pictureURL('fruit', 160, 110);
const BROKEN = 'data:image/png;base64,AAAA';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['the loaded picture', 'what each call returned'],
    scene: [160, 160],
    hint: 'loadImage(url, { signal, crossOrigin }) wraps new Image() in a promise. A good data: URL resolves, a broken one rejects with a FabricError, and aborting the signal rejects the pending load. Nothing here touches the network.',
  });
  const [pa, pb] = stage.panes as [(typeof stage.panes)[0], (typeof stage.panes)[0]];
  const canvas = stage.own(new Canvas(pa.el, { selection: false, skipTargetFind: true }), pa);
  const log = codePanel(pb, stage.preview);
  const lines: string[] = [];
  const say = (t: string): void => {
    lines.push(t);
    if (lines.length > (stage.preview ? 7 : 14)) lines.shift();
    log(lines.join('\n'));
  };
  let shown: FabricImage | null = null;

  const attempt = async (kind: 'good' | 'broken' | 'abort'): Promise<void> => {
    const ac = new AbortController();
    const pending = util.loadImage(kind === 'broken' ? BROKEN : GOOD, { signal: ac.signal });
    if (kind === 'abort') ac.abort();
    try {
      const img = await pending;
      if (stage.disposed) return;
      say(`${kind}: ${img.naturalWidth}×${img.naturalHeight} <img>`);
      if (shown) canvas.remove(shown);
      shown = new FabricImage(img, { left: 80, top: 80, scaleX: 0.9, scaleY: 0.9 });
      canvas.add(shown);
    } catch (err) {
      if (stage.disposed) return;
      say(`${kind}: rejected (${err instanceof Event ? 'abort Event' : 'error'})`);
    }
  };

  if (stage.bar) {
    button(stage.bar, 'load a picture', () => void attempt('good'));
    button(stage.bar, 'load a broken URL', () => void attempt('broken'));
    button(stage.bar, 'abort while loading', () => void attempt('abort'));
  } else {
    const order = ['good', 'broken', 'abort'] as const;
    let i = 0;
    void attempt('good');
    stage.every(1300, () => void attempt(order[++i % 3]!));
  }
  return stage.dispose;
};

export default mount;
