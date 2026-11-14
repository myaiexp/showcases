// Grain size and overlap: the two GrainPlayer settings that decide how smooth a stretch sounds
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { sample } from '../../shared/samples.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel } from '../../shared/widgets.ts';

const SETTINGS: [number, number][] = [[0.2, 0.1], [0.03, 0.01], [0.5, 0.25]];

/** Draws one second of grains: each block is a grain, the darker tail its cross-fade. */
function grains(parent: HTMLElement): (size: number, overlap: number) => void {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 50;
  canvas.style.cssText = 'width:100%;height:50px;border-radius:6px;background:var(--bg-surface);border:1px solid var(--border)';
  parent.append(canvas);
  const g = canvas.getContext('2d')!;
  return (size, overlap) => {
    g.clearRect(0, 0, 600, 50);
    for (let t = 0, i = 0; t < 1; t += size, i++) {
      const y = i % 2 ? 26 : 4;
      g.fillStyle = 'rgba(122,162,255,0.6)';
      g.fillRect(t * 600, y, Math.max(1, size * 600 - 1), 20);
      g.fillStyle = 'rgba(255,143,177,0.8)';
      g.fillRect((t + size - overlap) * 600, y, Math.max(1, overlap * 600), 20);
    }
  };
}

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const draw = grains(stage.visual);
  const label = bigLabel(stage.visual);
  const show = (size: number, overlap: number): void => {
    draw(size, overlap);
    label.textContent = `grainSize ${size}  overlap ${overlap}`;
  };
  show(0.2, 0.1);

  return stage.run({
    // Stretched to half speed so the grains are easy to hear.
    build: async () => new Tone.GrainPlayer({ url: await sample('melody'), playbackRate: 0.5 }).toDestination(),

    play: (grain, time) => {
      const [size, overlap] = [Number(grain.grainSize), Number(grain.overlap)];
      stage.show(time, () => show(size, overlap));
      grain.start(time);
    },
    stop: (grain, time) => grain.stop(time),

    variants: SETTINGS.map(([size, overlap]) => ({
      label: `grainSize ${size}, overlap ${overlap}`,
      apply: (grain: Tone.GrainPlayer) => {
        grain.grainSize = size;
        grain.overlap = overlap;
      },
    })),

    controls: (grain, bar) => {
      let size = 0.2;
      let overlap = 0.1;
      slider(bar, 'grainSize', 0.02, 0.6, 0.01, size, (v) => ((grain.grainSize = size = v), show(size, overlap)), (v) => `${v} s`);
      slider(bar, 'overlap', 0, 0.3, 0.01, overlap, (v) => ((grain.overlap = overlap = v), show(size, overlap)), (v) => `${v} s`);
    },
  });
};

export default mount;
