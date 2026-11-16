// Image filters: the Canvas2D and WebGL filter backends run side by side
import type { Mount } from '@/types.ts';
import { Canvas2dFilterBackend, WebGLFilterBackend, filters, getFilterBackend, setFilterBackend, type FabricImage } from 'fabric';
import { slider } from '../../shared/controls.ts';
import { cycle, filterStage, shot, sweep } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const names = ['Canvas2dFilterBackend', 'WebGLFilterBackend'];
  const stage = filterStage(el, ctx, ctx.preview ? undefined : names, 'One filter chain, applied by each backend in turn');
  const say = status(stage);
  const shots = stage.panes.map((pane) => shot(stage, 'portrait', pane));

  // Two backends of our own. The WebGL one makes a GL context (none where WebGL is missing), so
  // it is freed in the cleanup.
  const twoD = new Canvas2dFilterBackend();
  let gl: WebGLFilterBackend | null = null;
  try {
    gl = new WebGLFilterBackend({ tileSize: 512 });
    if (!gl.gl) gl = null;
  } catch {
    gl = null;
  }
  stage.onDispose(() => {
    gl?.gl?.getExtension('WEBGL_lose_context')?.loseContext();
    gl?.dispose();
  });

  const chain = [new filters.Sepia(), new filters.Blur({ blur: 0.3 }), new filters.Contrast({ contrast: 0.3 })];
  const applyWith = (img: FabricImage, backend: Canvas2dFilterBackend | WebGLFilterBackend): void => {
    img.filters = chain;
    // setFilterBackend is page-wide, but applyFilters() is synchronous: set, apply, restore in one tick.
    const previous = getFilterBackend();
    setFilterBackend(backend);
    try {
      img.applyFilters();
    } finally {
      setFilterBackend(previous);
    }
  };
  const run = (i: number, backend: Canvas2dFilterBackend | WebGLFilterBackend | null): void => {
    const s = shots[i]!;
    if (backend) applyWith(s.img, backend);
    s.canvas.requestRenderAll();
  };
  const update = (): void => {
    run(0, twoD);
    if (stage.bar) run(1, gl);
    const page = getFilterBackend() instanceof WebGLFilterBackend ? 'WebGL' : 'Canvas2D';
    say(`page default: ${page}${stage.bar && !gl ? ' | WebGL is not available in this browser' : ''}`);
  };

  if (stage.bar) {
    update();
    slider(stage.bar, 'blur', 0, 1, 0.01, 0.3, (v) => {
      (chain[1] as filters.Blur).blur = v;
      update();
    }, (v) => v.toFixed(2));
  } else {
    // A card has one pane: it alternates between the backends.
    const backends: [string, Canvas2dFilterBackend | WebGLFilterBackend | null][] = [['Canvas2D', twoD], ['WebGL', gl ?? twoD]];
    let current = backends[0]!;
    const draw = (v: number): void => {
      (chain[1] as filters.Blur).blur = v;
      run(0, current[1]);
      say(`${current[0]} backend, blur ${v.toFixed(2)}`);
    };
    draw(0.3);
    cycle(stage, backends, (b) => (current = b), 2000);
    sweep(stage, 0, 0.8, draw);
  }
  return stage.dispose;
};

export default mount;
