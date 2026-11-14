// A chord built note by note with addSound(), and a note removed with removeSound()
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { wave } from '../../shared/fx.ts';
import { checkbox } from '../../shared/controls.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, hz, keys, noteName, smallText } from '../../shared/widgets.ts';

const CHORD = [60, 64, 67, 71]; // C, E, G, B

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 3.4 });
  const piano = keys(stage.visual, 60, 72);
  const title = bigText(stage.visual, ctx.preview ? 14 : 18);
  const note = smallText(stage.visual);
  let reset = (): void => undefined;
  const light = (lit: readonly boolean[], text: string, small: string): void => {
    CHORD.forEach((m, i) => piano.set(m, lit[i]!));
    title.textContent = text;
    note.textContent = small;
  };

  return stage.run({
    build: () => {
      const sounds = CHORD.map((m) => wave('triangle', hz(m), 0.3, { attack: 0.03, release: 0.3 }));
      const group = new Pizzicato.Group();
      return { sounds, group, outcast: { index: -1 } };
    },
    play: ({ sounds, group, outcast }, at) => {
      // In the full view the tick boxes drive the group; a card runs a script.
      if (!stage.preview) return () => reset();
      const lit = CHORD.map(() => false);
      const show = (text: string, small: string): void => {
        const now = [...lit];
        stage.show(() => light(now, text, small));
      };
      const out = outcast.index;
      show('an empty group', 'group.sounds: 0');
      sounds.forEach((s, i) => {
        at(0.2 + i * 0.5, () => {
          group.addSound(s);
          s.play();
          lit[i] = true;
          show(`addSound(${noteName(CHORD[i]!)})`, `group.sounds: ${group.sounds.length}`);
        });
      });
      if (out >= 0) {
        at(2.0, () => {
          group.removeSound(sounds[out]!);
          show(`removeSound(${noteName(CHORD[out]!)})`, `group.sounds: ${group.sounds.length}`);
        });
      }
      at(2.4, () => {
        group.stop();
        lit.forEach((_, i) => (lit[i] = i === out));
        show('group.stop()', out >= 0 ? `${noteName(CHORD[out]!)} is not in the group` : 'the whole chord ends');
      });
      at(3.0, () => {
        if (out >= 0) sounds[out]!.stop();
        lit.fill(false);
        show(out >= 0 ? 'its own stop() ends it' : 'silence', '');
      });
    },
    variants: [
      { label: 'all four notes in the group', apply: () => undefined },
      { label: 'one note removed first', apply: ({ outcast }) => (outcast.index = 1) },
    ],
    controls: ({ sounds, group }, bar) => {
      const sync = (): void => {
        CHORD.forEach((m, i) => piano.set(m, sounds[i]!.playing));
        title.textContent = `group.sounds: ${group.sounds.length}`;
        note.textContent = 'tick a note to addSound() it, untick to removeSound()';
      };
      sync();
      const boxes = CHORD.map((m, i) =>
        checkbox(bar, noteName(m), false, (on) => {
          const s = sounds[i]!;
          void Pizzicato.context.resume();
          if (on) {
            group.addSound(s);
            s.play();
          } else {
            group.removeSound(s);
            s.stop();
          }
          sync();
        }),
      );
      reset = () => {
        for (const s of [...group.sounds]) group.removeSound(s);
        sounds.forEach((s) => s.stop());
        boxes.forEach((b) => (b.checked = false));
        sync();
      };
    },
  });
};

export default mount;
