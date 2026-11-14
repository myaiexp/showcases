// "@4n": a time that waits for the next beat of the running Transport
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { num, ruler, type Hit } from '../../shared/time-kit.ts';
import { pads } from '../../shared/widgets.ts';

const SECONDS = 3;
const GRIDS = ['8n', '4n', '1m'] as const;
type Grid = (typeof GRIDS)[number];
// Pretend pad presses, in seconds after Play: always between grid lines.
const PRESSES = [0.2, 0.55, 1.1, 1.35];
const NOTES = ['C5', 'E5', 'G5'];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  const view = ruler(stage, SECONDS);
  let grid: Grid = '4n';
  let running = false;
  const keys = ctx.preview ? undefined : pads(stage.visual, NOTES);

  return stage.run({
    build: () => {
      const tick = new Tone.Synth({ envelope: { attack: 0.002, decay: 0.03, sustain: 0, release: 0.02 }, volume: -22 }).toDestination();
      const player = new Tone.PolySynth(Tone.Synth, { volume: -8, envelope: { attack: 0.003, decay: 0.09, sustain: 0, release: 0.05 } }).toDestination();
      // A quiet metronome on every quarter note shows where the grid is.
      const loop = new Tone.Loop((t) => tick.triggerAttackRelease('C4', 0.03, t), '4n').start(0);
      keys?.onHit(async (i) => {
        await Tone.start();
        // The "@" string is the whole trick: it resolves to the next grid line while the Transport runs.
        player.triggerAttackRelease(NOTES[i]!, '16n', running ? `@${grid}` : undefined);
      });
      return { tick, player, loop };
    },
    play: (g, time) => {
      const wait = Tone.Time(grid).toSeconds();
      const hits: Hit[] = PRESSES.map((p) => {
        const at = Math.ceil(p / wait - 1e-9) * wait;
        return { at, text: `pressed ${num(p, 2)} s, heard ${num(at, 2)} s`, accent: true };
      });
      view.play(g.player, time, hits, `"@${grid}" waits for the next ${grid}: the faint ticks are the quarter-note grid`);
      running = true;
      Tone.getTransport().start(time);
      return (end) => {
        running = false;
        Tone.getTransport().stop(end);
      };
    },
    variants: GRIDS.map((gr) => ({
      label: `"@${gr}"`,
      apply: () => {
        grid = gr;
      },
    })),
    controls: (_, bar) => select<Grid>(bar, 'wait for next', GRIDS, (v) => (grid = v), grid),
    frame: (t) => view.frame(t),
  });
};

export default mount;
