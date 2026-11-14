// totalTimeout: one deadline for all the tries and pauses together
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { retryLab } from '../../shared/retry-lab.ts';

const mount: Mount = (el, ctx) => {
  let deadline = 2000;
  const lab = retryLab(el, ctx, {
    hint: 'The server never recovers and Ky is told to retry 5 times. The deadline decides when it really stops.',
    span: 3000,
    fullSpan: 5000,
    routes: { '/weather': { status: 503 } },
  });

  const forecast = (): Promise<boolean> =>
    lab.attempt({
      say: `A deadline of ${deadline / 1000} s for everything, tries and pauses included…`,
      // `totalTimeout` covers every try and every pause. Without it, 5 retries with
      // doubling pauses would run for more than 10 s.
      call: () => lab.api.get('https://api.example/weather', { retry: 5, totalTimeout: deadline }).json(),
      ok: () => ({ say: 'Worked.' }),
      bad: () => `At ${deadline / 1000} s the whole job was cancelled, even though retries were left.`,
      mark: 'deadline',
      badTone: 'warn',
    });

  if (lab.stage.preview) lab.start(async () => void (await forecast()), 1200);
  else {
    slider(lab.stage.bar!, 'totalTimeout:', 1000, 4000, 500, deadline, (v) => (deadline = v), (v) => `${v / 1000} s`);
    lab.start(async () => void (await forecast()), 1500, 'Run');
  }
  return lab.dispose;
};

export default mount;
