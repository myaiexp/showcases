// maxResponseSize: stop a download that turns out far bigger than you wanted
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { bodyMeter } from '../../shared/retry-meter.ts';
import { retryLab } from '../../shared/retry-lab.ts';

const TOTAL = 40 * 1024;
const kb = (n: number): string => `${Math.round(n / 1024)} KB`;

const mount: Mount = (el, ctx) => {
  let limit = 16 * 1024;
  const lab = retryLab(el, ctx, {
    hint: 'The export is 40 KB and arrives in eight pieces. Choose how much you are willing to accept.',
    span: 3000,
    routes: { '/export': { bytes: new Uint8Array(TOTAL).fill(97), stream: { pieces: 8, every: 250 } } },
  });
  const meter = bodyMeter(lab.row, lab.server, lab.stage.signal, 'Download', kb);

  const download = (): Promise<boolean> => {
    meter.reset();
    meter.limit(Math.min(1, limit / TOTAL));
    return lab.attempt({
      say: `Downloading a 40 KB export, ${kb(limit)} allowed…`,
      // The limit counts bytes as they arrive. Crossing it cancels the download and throws,
      // and Ky does not retry that.
      call: () => lab.api.get('https://data.example/export', { maxResponseSize: limit }).arrayBuffer(),
      ok: () => ({ say: `All ${kb(TOTAL)} fit inside the ${kb(limit)} allowed.` }),
      bad: () => `Cut off at ${kb(limit)}: Ky cancelled the download and threw a ResponseSizeError, so the rest never fills your memory.`,
      mark: 'cut off',
      badTone: 'warn',
    });
  };

  if (lab.stage.preview) {
    const steps = [16 * 1024, 48 * 1024];
    let i = 0;
    lab.start(async () => {
      limit = steps[i++ % steps.length]!;
      await download();
    }, 1000);
  } else {
    slider(lab.stage.bar!, 'maxResponseSize:', 8, 48, 8, limit / 1024, (v) => (limit = v * 1024), (v) => `${v} KB`);
    lab.start(async () => void (await download()), 1500, 'Download');
  }
  return lab.dispose;
};

export default mount;
