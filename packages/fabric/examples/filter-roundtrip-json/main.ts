// Image filters: filters survive toObject and loadFromJSON on a second canvas
import type { Mount } from '@/types.ts';
import { Canvas, filters, type FabricImage } from 'fabric';
import { slider } from '../../shared/controls.ts';
import { filterStage, shot, sweep } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx, ctx.preview ? undefined : ['original canvas', 'canvas.loadFromJSON(…)'], 'Each change is serialised with canvas.toObject() and loaded into the second canvas');
  const say = status(stage);
  // A card has one pane, which shows the restored copy; the original lives on an unattached canvas.
  const hidden = document.createElement('canvas');
  [hidden.width, hidden.height] = [stage.width, stage.height];
  const source = shot(stage, 'fruit', stage.bar ? stage.panes[0] : { ...stage, el: hidden });
  const targetPane = stage.panes[1] ?? stage.panes[0]!;
  const target = stage.own(new Canvas(targetPane.el, { selection: false }), targetPane);

  const sepia = new filters.Sepia();
  const hue = new filters.HueRotation({ rotation: 0.4 });
  const pixelate = new filters.Pixelate({ blocksize: 6 });
  let dump: HTMLPreElement | null = null;
  if (stage.bar) {
    dump = document.createElement('pre');
    dump.style.cssText = 'margin:0;max-width:760px;white-space:pre-wrap;font:12px/1.4 ui-monospace,monospace;color:var(--fg-2)';
    stage.box.insertBefore(dump, stage.bar);
  }

  let ticket = 0;
  const sync = async (): Promise<void> => {
    source.show([sepia, hue, pixelate]);
    // Every filter writes its own options: type plus whatever its `defaults` list.
    const json = source.canvas.toObject();
    const mine = ++ticket;
    const old = target.getObjects();
    await target.loadFromJSON(json);
    if (stage.disposed || mine !== ticket) return;
    old.forEach((o) => o.dispose());
    const restored = target.getObjects()[0] as FabricImage;
    target.requestRenderAll();
    const list = (restored.filters as filters.BaseFilter<string>[]).map((f) => JSON.stringify(f.toObject()));
    if (dump) dump.textContent = `image.toObject().filters, then back to instances:\n${list.join('\n')}`;
    say(`restored ${restored.filters.map((f) => f.type).join(' > ')}`);
  };
  void sync();

  if (stage.bar) {
    slider(stage.bar, 'hue rotation', -1, 1, 0.01, 0.4, (v) => {
      hue.rotation = v;
      void sync();
    }, (v) => v.toFixed(2));
    slider(stage.bar, 'blocksize', 1, 20, 1, 6, (v) => {
      pixelate.blocksize = v;
      void sync();
    });
  } else {
    sweep(stage, -1, 1, (v) => {
      hue.rotation = v;
      void sync();
    }, 4);
  }
  return stage.dispose;
};

export default mount;
