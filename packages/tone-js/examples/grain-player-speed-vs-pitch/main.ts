// GrainPlayer: changes speed without changing pitch, where a Player moves both
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { sample } from '../../shared/samples.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel } from '../../shared/widgets.ts';

type Engine = 'Player' | 'GrainPlayer';
const CASES: { label: string; engine: Engine; rate: number; detune: number; says: string }[] = [
  { label: 'Player at half speed', engine: 'Player', rate: 0.5, detune: 0, says: 'Player, playbackRate 0.5\nslower AND an octave lower' },
  { label: 'GrainPlayer at half speed', engine: 'GrainPlayer', rate: 0.5, detune: 0, says: 'GrainPlayer, playbackRate 0.5\nslower, same pitch' },
  { label: 'GrainPlayer, detune +700', engine: 'GrainPlayer', rate: 1, detune: 700, says: 'GrainPlayer, detune +700 cents\nsame speed, higher pitch' },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const label = bigLabel(stage.visual);
  let engine: Engine = 'Player';
  let says = '';
  label.textContent = 'Pick an engine and a speed, then Play';

  return stage.run({
    build: async () => {
      const player = new Tone.Player(await sample('melody')).toDestination();
      const grain = new Tone.GrainPlayer(await sample('melody')).toDestination();
      return { player, grain };
    },

    play: ({ player, grain }, time) => {
      const text = says;
      stage.show(time, () => text && (label.textContent = text));
      (engine === 'Player' ? player : grain).start(time);
    },
    stop: ({ player, grain }, time) => {
      player.stop(time);
      grain.stop(time);
    },

    variants: CASES.map((c) => ({
      label: c.label,
      apply: ({ player, grain }: { player: Tone.Player; grain: Tone.GrainPlayer }) => {
        engine = c.engine;
        says = c.says;
        player.playbackRate = c.rate;
        grain.playbackRate = c.rate;
        grain.detune = c.detune;
      },
    })),

    controls: ({ player, grain }, bar) => {
      const show = (): void => {
        const rate = engine === 'Player' ? player.playbackRate : grain.playbackRate;
        label.textContent = `${engine}, playbackRate ${rate}${engine === 'GrainPlayer' ? `, detune ${grain.detune}` : ''}`;
      };
      select(bar, 'engine', ['Player', 'GrainPlayer'] as const, (e) => ((engine = e), show()));
      slider(bar, 'playbackRate', 0.25, 2, 0.05, 1, (r) => ((player.playbackRate = r), (grain.playbackRate = r), show()));
      slider(bar, 'detune (GrainPlayer)', -1200, 1200, 100, 0, (c) => ((grain.detune = c), show()), (c) => `${c} cents`);
      show();
    },
  });
};

export default mount;
