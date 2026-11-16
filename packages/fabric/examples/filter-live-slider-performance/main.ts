// Image filters: applyFilters on every slider input, with the time it takes
import type { Mount } from '@/types.ts';
import { Canvas, FabricImage, WebGLFilterBackend, filters, getFilterBackend } from 'fabric';
import { select, slider } from '../../shared/controls.ts';
import { SIZE, filterStage, sweep } from '../../shared/filter-demo.ts';
import { picture } from '../../shared/images.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const canvas = stage.own(new Canvas(stage.el, { selection: false, skipTargetFind: true }));
  const say = status(stage);

  // Several filters chained: the more there are, and the larger the picture, the longer each call takes.
  const chain = [
    new filters.Brightness(),
    new filters.Contrast({ contrast: 0.2 }),
    new filters.Saturation({ saturation: 0.3 }),
    new filters.HueRotation(),
    new filters.Blur({ blur: 0.05 }),
  ];
  let img: FabricImage | null = null;
  let count = 3;
  let value = 0;
  const times: number[] = [];
  const setPicture = (w: number, h: number): void => {
    if (img) canvas.remove(img);
    img?.dispose();
    img = new FabricImage(picture('city', w, h), { left: SIZE[0] / 2, top: SIZE[1] / 2 });
    img.scaleToWidth(SIZE[0]); // the pixels stay w by h, the canvas shows them 320 wide
    canvas.add(img);
    times.length = 0;
  };
  const apply = (v: number): void => {
    value = v;
    (chain[0] as filters.Brightness).brightness = v * 0.5;
    (chain[3] as filters.HueRotation).rotation = v;
    img!.filters = chain.slice(0, count);
    const t0 = performance.now();
    img!.applyFilters(); // synchronous: the new pixels are ready when it returns
    const ms = performance.now() - t0;
    canvas.requestRenderAll(); // one redraw per input event, coalesced into the next frame
    times.push(ms);
    if (times.length > 20) times.shift();
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    const backend = getFilterBackend() instanceof WebGLFilterBackend ? 'WebGL' : 'Canvas2D';
    say(`${count} filters, ${img!.getOriginalSize().width}px wide, ${backend}\napplyFilters ${ms.toFixed(1)} ms (avg ${avg.toFixed(1)} ms)`);
  };
  setPicture(...SIZE);
  apply(0.3);

  if (stage.bar) {
    slider(stage.bar, 'amount', -1, 1, 0.005, 0.3, apply, (v) => v.toFixed(2));
    slider(stage.bar, 'filters in chain', 1, 5, 1, 3, (n) => {
      count = n;
      apply(value);
    });
    select(stage.bar, 'picture size', ['320 x 220', '640 x 440', '960 x 660'] as const, (s) => {
      const [w, h] = s.split(' x ').map(Number) as [number, number];
      setPicture(w, h);
      apply(value);
    });
  } else {
    sweep(stage, -1, 1, apply, 3);
  }
  return stage.dispose;
};

export default mount;
