// Image filters: Convolute with sharpen, emboss, edge and blur kernels
import type { Mount } from '@/types.ts';
import { WebGLFilterBackend, filters, getFilterBackend } from 'fabric';
import { checkbox, select } from '../../shared/controls.ts';
import { cycle, filterStage, shot } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

// Kernels are square (3, 5, 7 or 9 weights per side), read row by row. These 3x3 ones are centred in a
// 5x5 grid: 7.4.0's WebGL shader for a 3x3 kernel with opaque: true does not compile.
const pad = (k: number[]): number[] => {
  const out = new Array<number>(25).fill(0);
  k.forEach((w, i) => (out[(Math.floor(i / 3) + 1) * 5 + (i % 3) + 1] = w));
  return out;
};
const KERNELS: Record<string, number[]> = {
  identity: pad([0, 0, 0, 0, 1, 0, 0, 0, 0]),
  sharpen: pad([0, -1, 0, -1, 5, -1, 0, -1, 0]),
  emboss: pad([-2, -1, 0, -1, 1, 1, 0, 1, 2]),
  'edge detect': pad([-1, -1, -1, -1, 8, -1, -1, -1, -1]),
  'sobel (horizontal)': pad([-1, 0, 1, -2, 0, 2, -1, 0, 1]),
  'box blur 5x5': new Array<number>(25).fill(1 / 25),
};
const NAMES = Object.keys(KERNELS);

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show } = shot(stage, 'city');
  const say = status(stage);

  // matrix holds the weights. opaque decides whether alpha is convolved too, and the two backends
  // read it in opposite ways in 7.4.0: Canvas2D keeps the original alpha for opaque: true, WebGL for
  // opaque: false. So the starting value depends on the backend that is active on this page.
  const keepsAlpha = !(getFilterBackend() instanceof WebGLFilterBackend);
  const convolute = new filters.Convolute({ matrix: KERNELS.sharpen!, opaque: keepsAlpha });
  const use = (name: string): void => {
    convolute.matrix = KERNELS[name]!;
    show([convolute]);
    say(`${name}, opaque ${convolute.opaque}`);
  };
  use('sharpen');

  if (stage.bar) {
    select(stage.bar, 'kernel', NAMES, use, 'sharpen');
    checkbox(stage.bar, 'opaque', keepsAlpha, (v) => {
      convolute.opaque = v;
      use(NAMES.find((n) => KERNELS[n] === convolute.matrix)!);
    });
  } else {
    cycle(stage, NAMES, use, 1300);
  }
  return stage.dispose;
};

export default mount;
