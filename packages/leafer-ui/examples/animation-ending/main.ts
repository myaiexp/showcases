// Animation: where an element rests after a run, with ending from, to or auto
import { Leafer } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lanes, replay, runner } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each lane slides once and replays. "from" snaps back, "to" stays, "auto" rests where the playback finished.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const runs = [
    { name: "ending: 'from'", options: { ending: 'from' } },
    { name: "ending: 'to'", options: { ending: 'to' } },
    { name: "'auto' (default)", options: {} },
    { name: "'auto' + reverse", options: { reverse: true } },
  ] as const;
  const l = lanes(stage, leafer, runs.map((r) => r.name));
  const rects = runs.map((_, i) => runner(l, i));
  leafer.add(rects);

  replay(stage, 3600, () => {
    runs.forEach((run, i) => {
      const rect = rects[i]!;
      rect.x = l.left;
      rect.animation = { style: { x: l.right }, duration: 1.2, ...run.options };
    });
  });
  return stage.dispose;
};

export default mount;
