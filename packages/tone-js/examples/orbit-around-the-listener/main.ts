// Panner3D: a pinging sound circles the listener on an automated path
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { PINK, BLUE } from '../../shared/routing-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 4;
const MAX_R = 7;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS, channels: 2 });
  // A top-down map: you are the dot in the middle, facing up; the sound is the pink dot.
  const map = document.createElement('div');
  map.style.cssText = `position:relative;align-self:center;aspect-ratio:1;height:${ctx.preview ? '100%' : '230px'};min-height:60px;border-radius:50%;border:1px dashed var(--border)`;
  const you = document.createElement('div');
  you.style.cssText = `position:absolute;left:50%;top:50%;width:12px;height:12px;margin:-6px;border-radius:50%;background:${BLUE}`;
  const nose = document.createElement('div');
  nose.style.cssText = `position:absolute;left:50%;top:50%;width:2px;height:16px;margin:-14px 0 0 -1px;background:${BLUE}`;
  const sound = document.createElement('div');
  sound.style.cssText = `position:absolute;width:14px;height:14px;margin:-7px;border-radius:50%;background:${PINK}`;
  map.append(you, nose, sound);
  stage.visual.append(map);
  let radius = 2;
  // The radius the current lap was scheduled with (a card shows one variant after another).
  let shown = 2;

  const place = (time: number): void => {
    const a = (2 * Math.PI * time) / SECONDS;
    const r = (Math.min(shown, MAX_R) / MAX_R) * 46;
    sound.style.left = `${50 + r * Math.sin(a)}%`;
    sound.style.top = `${50 - r * Math.cos(a)}%`;
  };

  return stage.run({
    build: () => {
      const synth = new Tone.Synth({ oscillator: { type: 'sawtooth' }, envelope: { attack: 0.005, decay: 0.08, sustain: 0, release: 0.05 }, volume: -12 });
      const panner = new Tone.Panner3D({ panningModel: 'equalpower', refDistance: 1, rolloffFactor: 1 }).toDestination();
      synth.connect(panner);
      return { synth, panner };
    },
    play: (g, time) => {
      // One lap: x and z follow a circle of `radius` around the listener, who faces -z.
      const steps = 48;
      const r = radius;
      for (let i = 0; i <= steps; i++) {
        const a = (2 * Math.PI * i) / steps;
        const at = time + (i * SECONDS) / steps;
        for (const [param, v] of [[g.panner.positionX, r * Math.sin(a)], [g.panner.positionZ, -r * Math.cos(a)]] as const) {
          if (i === 0) param.setValueAtTime(v, at);
          else param.linearRampToValueAtTime(v, at);
        }
      }
      for (let i = 0; i < 20; i++) g.synth.triggerAttackRelease('A4', 0.08, time + i * 0.2);
      stage.show(time, () => (shown = r));
    },
    stop: (g) => {
      g.panner.positionX.cancelScheduledValues(0);
      g.panner.positionZ.cancelScheduledValues(0);
    },
    variants: [
      { label: 'orbit close (radius 1.5)', apply: () => (radius = 1.5) },
      { label: 'orbit far (radius 6)', apply: () => (radius = 6) },
    ],
    controls: (g, bar) => {
      slider(bar, 'radius', 1, MAX_R, 0.5, 2, (v) => (radius = v), (v) => `${v} (next lap)`);
      select(bar, 'model', ['equalpower', 'HRTF'] as const, (m) => (g.panner.panningModel = m));
    },
    frame: place,
  });
};

export default mount;
