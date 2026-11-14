// ImageFilter.filter() applying post processes to a canvas image
import { BlackAndWhitePostProcess, BlurPostProcess, ChromaticAberrationPostProcess, Engine, FilterPostProcess, GrainPostProcess, Matrix, Vector2 } from '@babylonjs/core';
import type { PostProcess } from '@babylonjs/core';
import { ImageFilter } from '@babylonjs/controls/dist/src/imageFilter';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { drawTestCanvas } from '../../shared/test-picture.ts';

const mount: Mount = (el, ctx) => {
  const row = document.createElement('div');
  Object.assign(row.style, { display: 'flex', gap: '4px', width: '100%', background: '#000' });
  const source = drawTestCanvas();
  const target = document.createElement('canvas');
  for (const c of [source, target]) {
    Object.assign(c.style, { flex: '1 1 0', minWidth: '0', width: '50%', aspectRatio: '512 / 320', height: 'auto', objectFit: 'contain' });
  }
  target.width = 512;
  target.height = 320;
  row.append(source, target);
  el.append(row);

  // Post processes need a full Engine: pass it to the control instead of a canvas.
  const engine = new Engine(target, false, { preserveDrawingBuffer: true });
  const imageFilter = new ImageFilter(engine);

  // A FilterPostProcess multiplies each pixel's colour by a 4x4 matrix.
  const matrices = {
    sepia: Matrix.FromValues(0.393, 0.349, 0.272, 0, 0.769, 0.686, 0.534, 0, 0.189, 0.168, 0.131, 0, 0, 0, 0, 1),
    invert: Matrix.FromValues(-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 1, 1, 1, 1),
    'swap red and blue': Matrix.FromValues(0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1),
  };
  const filters: Record<string, PostProcess> = {
    'BlackAndWhitePostProcess': new BlackAndWhitePostProcess('bw', 1, null, undefined, engine),
    'BlurPostProcess (horizontal)': new BlurPostProcess('blur', new Vector2(1, 0), 24, 1, null, undefined, engine),
    'GrainPostProcess': new GrainPostProcess('grain', 1, null, undefined, engine),
    'ChromaticAberrationPostProcess': new ChromaticAberrationPostProcess('ca', 512, 320, 1, null, undefined, engine),
    'FilterPostProcess (sepia)': new FilterPostProcess('sepia', matrices.sepia, 1, null, undefined, engine),
    'FilterPostProcess (invert)': new FilterPostProcess('invert', matrices.invert, 1, null, undefined, engine),
    'FilterPostProcess (swap red and blue)': new FilterPostProcess('swap', matrices['swap red and blue'], 1, null, undefined, engine),
  };
  const names = Object.keys(filters);

  let disposed = false;
  let current = names[0]!;
  // filter() renders as soon as the input texture is ready, but a post process compiles its
  // shader asynchronously: rendering it before then fails, so wait for isReady() first.
  const ready = (pp: PostProcess): Promise<void> =>
    new Promise((resolve) => {
      const check = (): void => (disposed || pp.isReady() ? resolve() : void requestAnimationFrame(check));
      check();
    });
  const apply = async (name: string): Promise<void> => {
    current = name;
    await ready(filters[name]!);
    if (disposed) return;
    // The input can be a URL, a video, or (here) a canvas whose current pixels are used.
    await imageFilter.filter(source, filters[name]!);
    if (disposed) return;
  };
  const resizeObserver = new ResizeObserver(() => {
    engine.resize();
    void apply(current);
  });
  resizeObserver.observe(target);
  void apply(current);

  let timer = 0;
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => void apply(names[++i % names.length]!), 1100);
  } else {
    const panel = createPanel(el);
    panel.select('post process', names as readonly string[], current, (v) => void apply(v));
    panel.readout('Left: the source canvas. Right: the same pixels after imageFilter.filter(canvas, postProcess).');
  }

  return () => {
    disposed = true;
    window.clearInterval(timer);
    resizeObserver.disconnect();
    for (const f of Object.values(filters)) f.dispose();
    imageFilter.dispose();
    engine.dispose();
    row.remove();
  };
};

export default mount;
