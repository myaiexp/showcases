// Image filters: a Convolute sharpen kernel built from one strength slider
import type { Mount } from '@/types.ts';
import { WebGLFilterBackend, filters, getFilterBackend } from 'fabric';
import { slider } from '../../shared/controls.ts';
import { filterStage, shot, sweep } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

// The four neighbours get -k and the centre 1 + 4k, so the weights still add up to 1 (no brightness
// change). The 3x3 is centred in a 5x5 grid: 7.4.0's WebGL shader for 3x3 with opaque: true fails to compile.
const sharpen = (k: number): number[] => {
  const out = new Array<number>(25).fill(0);
  [[7, -k], [11, -k], [12, 1 + 4 * k], [13, -k], [17, -k]].forEach(([i, w]) => (out[i!] = w!));
  return out;
};

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show } = shot(stage, 'city');
  const say = status(stage);

  const convolute = new filters.Convolute({ matrix: sharpen(1), opaque: !(getFilterBackend() instanceof WebGLFilterBackend) });
  const set = (k: number): void => {
    convolute.matrix = sharpen(k);
    show([convolute]);
    say(`centre ${convolute.matrix[12]!.toFixed(2)}, sides -${(-convolute.matrix[7]!).toFixed(2)}`);
  };
  set(1);

  if (stage.bar) slider(stage.bar, 'strength', 0, 3, 0.05, 1, set, (v) => v.toFixed(2));
  else sweep(stage, 0, 2.5, set);
  return stage.dispose;
};

export default mount;
