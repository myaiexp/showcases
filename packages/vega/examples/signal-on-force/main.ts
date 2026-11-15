// force: true makes a handler notify dependants even when the value is unchanged
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { line } from '../../shared/signals-kit.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 130,
    padding: 5,

    signals: [
      // Both handlers always produce the same value on click.
      { name: 'plain', on: [{ events: 'click', update: "'same'" }] },
      { name: 'forced', on: [{ events: 'click', update: "'same'", force: true }] },
      // Counters listening to the two signals as event streams.
      { name: 'plainSeen', value: 0, on: [{ events: { signal: 'plain' }, update: 'plainSeen + 1' }] },
      { name: 'forcedSeen', value: 0, on: [{ events: { signal: 'forced' }, update: 'forcedSeen + 1' }] },
      { name: 'clicks', value: 0, on: [{ events: 'click', update: 'clicks + 1' }] },
    ],

    marks: [
      line("'clicks: ' + clicks", 6),
      line("'plain  seen ' + plainSeen + ' times'", 40),
      line("'forced seen ' + forcedSeen + ' times'", 66),
      line("'(both set to the same string on each click)'", 100, { fill: { value: '#999' } }),
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const ghost = stage.ghost(view);
    stage.every(900, () => ghost.click(200, 100));
  }
  return () => stage.dispose();
};

export default mount;
