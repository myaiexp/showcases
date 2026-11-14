// A keyboard: a pool of wave sounds, one per key, played on press and stopped on release
import Pizzicato, { type Sound, type Wave } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { box } from '../../shared/box.ts';
import { wave } from '../../shared/fx.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText, hz, keys, noteName, smallText } from '../../shared/widgets.ts';

const LOW = 60;
const HIGH = 76;
const TYPES: readonly Wave[] = ['triangle', 'sine', 'square', 'sawtooth'];
/** Computer keys for the notes from middle C: the home row is the white keys. */
const LETTERS = 'awsedftgyhujkolp;'.split('');
/** "Twinkle, twinkle, little star": notes and when each starts, a third of a second apart. */
const TUNE = [60, 60, 67, 67, 69, 69, 67, 65, 65, 64, 64, 62, 62, 60];

interface Board {
  sounds: Map<number, Sound>;
  retired: Sound[];
}

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 5.2, playLabel: 'Play a tune' });
  const title = bigText(stage.visual, 18);
  const note = smallText(stage.visual, ctx.preview ? 'twinkle, twinkle…' : 'press the keys, or A W S E D F…');
  const piano = keys(box(stage.visual, ctx.preview ? 64 : 110), LOW, HIGH);
  let type: Wave = 'triangle';
  let release = 0.15;

  const make = (): Map<number, Sound> => {
    const sounds = new Map<number, Sound>();
    for (let m = LOW; m <= HIGH; m++) sounds.set(m, wave(type, hz(m), 0.25, { release }));
    return sounds;
  };
  const shown = (m: number, down: boolean): void => {
    piano.set(m, down);
    if (down) title.textContent = `${noteName(m)} · ${Math.round(hz(m))} Hz`;
  };

  return stage.run<Board>({
    build: () => ({ sounds: make(), retired: [] }),
    play: ({ sounds }, at) => {
      TUNE.forEach((m, i) => {
        at(i * 0.33, () => {
          sounds.get(m)!.play();
          stage.show(() => shown(m, true));
        });
        at(i * 0.33 + 0.28, () => {
          sounds.get(m)!.stop();
          stage.show(() => shown(m, false));
        });
      });
    },
    controls: (board, bar) => {
      const press = (m: number): void => {
        void Pizzicato.context.resume(); // a press is the gesture that lets the page make sound
        const s = board.sounds.get(m);
        if (s && !s.playing) s.play();
        shown(m, true);
      };
      const lift = (m: number): void => {
        board.sounds.get(m)?.stop();
        shown(m, false);
      };
      piano.onPress(press, lift);
      const held = new Set<string>();
      const keyNote = (e: KeyboardEvent): number | undefined => {
        const i = LETTERS.indexOf(e.key.toLowerCase());
        const typing = e.target instanceof HTMLElement && ['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName);
        return i < 0 || e.ctrlKey || e.metaKey || e.altKey || typing ? undefined : LOW + i;
      };
      window.addEventListener('keydown', (e) => {
        const m = keyNote(e);
        if (m === undefined || held.has(e.key)) return;
        held.add(e.key);
        press(m);
      }, { signal: stage.signal });
      window.addEventListener('keyup', (e) => {
        const m = keyNote(e);
        held.delete(e.key);
        if (m !== undefined) lift(m);
      }, { signal: stage.signal });

      select(bar, 'wave', TYPES, (t) => {
        // The wave type is fixed when a sound is made, so every key gets a new sound.
        for (const s of board.sounds.values()) {
          s.stop();
          board.retired.push(s);
        }
        type = t;
        board.sounds = make();
      });
      slider(bar, 'release', 0, 1, 0.05, release, (v) => {
        release = v;
        for (const s of board.sounds.values()) s.release = v;
      }, (v) => `${v} s`);
    },
    stop: (board) => {
      for (const [m, s] of board.sounds) {
        s.stop();
        shown(m, false);
      }
    },
    dispose: (board) => {
      for (const s of [...board.sounds.values(), ...board.retired]) {
        s.stop();
        s.disconnect();
      }
    },
  });
};

export default mount;
