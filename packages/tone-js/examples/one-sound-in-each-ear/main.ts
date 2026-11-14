// Merge: a tone into input 0 (left), noise into input 1 (right)
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { diagram } from '../../shared/routing-kit.ts';
import { toneStage } from '../../shared/stage.ts';

type Plan = 'each ear' | 'both left' | 'both right';
interface Graph {
  tone: Tone.Synth;
  noise: Tone.NoiseSynth;
  merge: Tone.Merge;
}

const NODES = [
  { id: 'tone', label: 'sine tone', x: 58, y: 28, w: 84 },
  { id: 'noise', label: 'pink noise', x: 58, y: 92, w: 84 },
  { id: 'in0', label: 'Merge in 0', x: 215, y: 28, w: 80 },
  { id: 'in1', label: 'Merge in 1', x: 215, y: 92, w: 80 },
  { id: 'out', label: 'L | R', x: 345, y: 60, w: 60 },
];
const EDGES = [
  { id: 'tone0', from: 'tone', to: 'in0' },
  { id: 'tone1', from: 'tone', to: 'in1', off: true },
  { id: 'noise0', from: 'noise', to: 'in0', off: true },
  { id: 'noise1', from: 'noise', to: 'in1' },
  { id: 'o0', from: 'in0', to: 'out' },
  { id: 'o1', from: 'in1', to: 'out' },
];
const PLANS: Record<Plan, [number, number]> = { 'each ear': [0, 1], 'both left': [0, 0], 'both right': [1, 1] };

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2, channels: 2 });
  const pic = diagram(stage.visual, NODES, EDGES);

  let current: Plan = 'each ear';
  const paint = (plan: Plan): void => {
    const [t, n] = PLANS[plan];
    pic.setEdge('tone0', t === 0);
    pic.setEdge('tone1', t === 1);
    pic.setEdge('noise0', n === 0);
    pic.setEdge('noise1', n === 1);
  };
  const wire = (g: Graph, plan: Plan): void => {
    current = plan;
    const [t, n] = PLANS[plan];
    g.tone.disconnect();
    g.noise.disconnect();
    // connect(destination, outputNumber, inputNumber): the last number picks the ear.
    g.tone.connect(g.merge, 0, t);
    g.noise.connect(g.merge, 0, n);
  };

  return stage.run({
    build: (): Graph => {
      const merge = new Tone.Merge(2).toDestination();
      const tone = new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.02, decay: 0.1, sustain: 0.6, release: 0.1 }, volume: -8 });
      const noise = new Tone.NoiseSynth({ noise: { type: 'pink' }, envelope: { attack: 0.005, decay: 0.12, sustain: 0, release: 0.05 }, volume: -10 });
      const g = { tone, noise, merge };
      wire(g, 'each ear');
      return g;
    },
    play: (g, time) => {
      const plan = current;
      stage.show(time, () => paint(plan));
      for (let i = 0; i < 4; i++) {
        g.tone.triggerAttackRelease(['A4', 'C5', 'E5', 'C5'][i]!, 0.3, time + i * 0.5);
        g.noise.triggerAttackRelease(0.15, time + i * 0.5 + 0.25);
        stage.show(time + i * 0.5, () => pic.flash('tone'));
        stage.show(time + i * 0.5 + 0.25, () => pic.flash('noise', '#ff8fb1'));
      }
    },
    stop: (g, time) => {
      g.tone.triggerRelease(time);
    },
    variants: (Object.keys(PLANS) as Plan[]).map((p) => ({ label: p === 'each ear' ? 'tone left, noise right' : `tone and noise: ${p}`, apply: (g: Graph) => wire(g, p) })),
    controls: (g, bar) => {
      select(bar, 'routing', Object.keys(PLANS) as Plan[], (p) => {
        wire(g, p);
        paint(p);
      });
    },
  });
};

export default mount;
