// Image filters: Resize with its four resize types, scaled down side by side
import type { Mount } from '@/types.ts';
import { Canvas2dFilterBackend, filters, getFilterBackend, setFilterBackend } from 'fabric';
import { slider } from '../../shared/controls.ts';
import { cycle, filterStage, shot, sweep } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const TYPES: filters.TResizeType[] = ['bilinear', 'hermite', 'sliceHack', 'lanczos'];
const CAPTIONS = ['bilinear', 'hermite', 'sliceHack (crops at some scales in 7.4.0)', 'lanczos'];

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx, ctx.preview ? undefined : CAPTIONS, 'The WebGL pipeline always resamples with lanczos, so these panes run on a Canvas2D backend');
  const say = status(stage);
  const shots = stage.panes.map((pane) => shot(stage, 'city', pane));
  const twoD = new Canvas2dFilterBackend();

  // scaleX/scaleY shrink the pixels (0.3 keeps 30%); the image still draws at its old size,
  // stretched back up, so what you see is how well each resizeType kept the detail.
  const run = (i: number, type: filters.TResizeType, scale: number): void => {
    const s = shots[i]!;
    // Canvas2D keeps the shrunk size on the filtered canvas, so a second applyFilters() with another
    // scale reads a cropped corner. A fresh FabricImage per change starts from the full size.
    s.img.filters = [];
    s.setPicture('city');
    s.img.filters = [new filters.Resize({ resizeType: type, scaleX: scale, scaleY: scale })];
    // setFilterBackend is page-wide: swap, apply (it is synchronous) and put the old one back at once.
    const previous = getFilterBackend();
    setFilterBackend(twoD);
    try {
      s.img.applyFilters();
    } finally {
      setFilterBackend(previous);
    }
    s.canvas.requestRenderAll();
  };
  const set = (scale: number): void => {
    TYPES.forEach((type, i) => run(Math.min(i, shots.length - 1), type, scale));
    say(`Resize({ scaleX: ${scale.toFixed(2)}, scaleY: ${scale.toFixed(2)} })`);
  };

  if (stage.bar) {
    set(0.3);
    slider(stage.bar, 'scale', 0.1, 1, 0.01, 0.3, set, (v) => v.toFixed(2));
  } else {
    let type: filters.TResizeType = 'bilinear';
    const show = (scale: number): void => {
      run(0, type, scale);
      say(`${type}, scale ${scale.toFixed(2)}`);
    };
    show(0.3);
    cycle(stage, TYPES, (t) => (type = t), 1500);
    sweep(stage, 0.15, 0.6, show, 3);
  }
  return stage.dispose;
};

export default mount;
