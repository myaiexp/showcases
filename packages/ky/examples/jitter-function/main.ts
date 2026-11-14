// jitter as a function: nudge every pause by a percentage or a fixed amount
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { herdStage, type Jitter } from '../../shared/retry-herd-stage.ts';

interface Kind {
  label: string;
  /** Plain-English line for the caption. */
  say: string;
  jitter: Jitter;
}
const KINDS: Record<string, Kind> = {
  none: { label: 'no jitter', say: 'No jitter: the crowd stays in step.', jitter: undefined },
  full: { label: 'true: anywhere from 0 to the pause', say: 'Full jitter: pauses scatter between 0 and the whole pause.', jitter: true },
  percent: {
    label: 'percentage: 80% to 120%',
    say: 'Percentage jitter: each pause is 80-120% of normal, a gentle spread.',
    jitter: (delay) => delay * (0.8 + Math.random() * 0.4),
  },
  absolute: {
    label: 'absolute: plus or minus 100 ms',
    say: 'Absolute jitter: each pause moves at most 100 ms either way.',
    jitter: (delay) => delay + (Math.random() * 200 - 100),
  },
};

const mount: Mount = (el, ctx) => {
  const { stage, herd, run, start } = herdStage(el, ctx, 'Twelve clients retry after an outage. Pick how each pause is randomised.', 2500, 50);
  let kind = 'percent';

  const go = async (): Promise<void> => {
    const k = KINDS[kind]!;
    stage.say(k.say);
    // `jitter` can also be a function: it receives the pause Ky worked out and returns the one to use.
    await run(12, k.jitter);
    stage.say(`${k.say} Busiest moment: ${herd.peak()} requests at once.`, 'info');
  };

  const names = ['percent', 'absolute', 'full'];
  let i = 0;
  if (!stage.preview) select(stage.bar!, 'jitter:', Object.entries(KINDS).map(([k, v]) => [k, v.label] as const), (v) => (kind = v), kind);
  start(async () => {
    if (stage.preview) kind = names[i++ % names.length]!;
    await go();
  }, 1000, 'Everyone ask');
  return stage.dispose;
};

export default mount;
