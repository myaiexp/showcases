// on('end'): when one recording finishes, its handler starts the next
import type { Sound } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { fileSound } from '../../shared/load.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, lights, smallText } from '../../shared/widgets.ts';

const NAMES = ['drums', 'bass', 'keys'] as const;

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 6.5 });
  const title = bigText(stage.visual, 17);
  const lamps = lights(stage.visual, NAMES);
  const note = smallText(stage.visual);
  let running = false;

  // Lights the lamp of track `index` and plays it; past the last track, the list is over.
  const go = (list: Sound[], index: number): void => {
    stage.show(() => {
      NAMES.forEach((n, i) => lamps.set(n, i === index));
      title.textContent = index < NAMES.length ? `now: ${NAMES[index]}` : 'playlist finished';
      note.textContent = index === 0 ? 'drums → bass → keys' : index < NAMES.length ? `${NAMES[index - 1]} ended → next` : 'the last one ended';
    });
    list[index]?.play();
  };

  return stage.run({
    build: async () => {
      const list = await Promise.all(NAMES.map((n) => fileSound(n, { attack: 0, release: 0, volume: 0.7 })));
      // A card is rendered offline, which cannot deliver "end" in time: it books the same
      // hand-over with at(). The page itself relies on the event.
      if (!stage.preview) {
        list.forEach((sound, i) =>
          sound.on('end', () => {
            // stop() also ends a source, so a manual Stop must not carry the list on.
            if (running) go(list, i + 1);
          }),
        );
      }
      return list;
    },
    play: (list, at) => {
      running = true;
      go(list, 0);
      if (stage.preview) NAMES.forEach((_, i) => at((i + 1) * 2, () => go(list, i + 1)));
    },
    stop: (list) => {
      running = false;
      list.forEach((s) => s.stop());
    },
  });
};

export default mount;
