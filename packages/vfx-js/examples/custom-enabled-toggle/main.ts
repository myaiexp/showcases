// enabled keeps an effect's buffers; leaving the chain does not
import { VFX, type Effect } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { checkbox, readout } from '../../shared/controls.ts';
import { headline } from '../../shared/subjects.ts';
import { createStage } from '../../shared/stage.ts';
import { WaveEffect } from './wave-effect.ts';
import { EchoEffect } from './echo-effect.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const title = headline('Echo');
  title.style.fontSize = ctx.preview ? '48px' : '96px';
  title.style.margin = ctx.preview ? '0 30px' : '0 60px';
  stage.root.append(title);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const wave = new WaveEffect({ amount: 0.5 });
  const echo = new EchoEffect();
  let waveIn = false;
  let echoIn = true;
  await vfx.add(title, { effect: [echo] });

  const chain = async (): Promise<void> => {
    const list: Effect[] = [];
    if (waveIn) list.push(wave);
    if (echoIn) list.push(echo);
    // Instances that stay in the list keep their state; ones that leave get dispose().
    await vfx.updateEffects(title, list);
  };
  const stats = ctx.preview ? null : readout(stage.bar!);
  const names = (): string => [waveIn && 'wave', echoIn && 'echo'].filter(Boolean).join(', ') || 'nothing';
  stage.frame(() => {
    stats?.(`echo: init ${echo.inits}, update ${echo.updates}, render ${echo.renders}`);
  });

  if (stage.bar) {
    checkbox(stage.bar, 'echo.enabled', true, (v) => {
      echo.enabled = v;
      stage.say(v ? 'enabled = true: render() runs again on the buffer it kept.' : 'enabled = false: no render(), the input passes through; update() keeps running and the buffer is kept.');
    });
    checkbox(stage.bar, 'WaveEffect in the chain', false, (v) => {
      waveIn = v;
      void chain().then(() => stage.say(`updateEffects([${names()}]): echo stayed in the list, so init did not run again and its trail carried on.`));
    });
    checkbox(stage.bar, 'EchoEffect in the chain', true, (v) => {
      echoIn = v;
      void chain().then(() => stage.say(`updateEffects([${names()}]): ${v ? 'echo is initialised again, with an empty buffer.' : 'echo left the list and was disposed.'}`));
    });
    stage.say('Toggle the three boxes and watch the counters and the trail.');
  } else {
    const steps: [string, () => void | Promise<void>][] = [
      ['running', () => undefined],
      ['enabled = false', () => void (echo.enabled = false)],
      ['enabled = true', () => void (echo.enabled = true)],
      ['updateEffects([wave, echo])', async () => ((waveIn = true), chain())],
      ['updateEffects([wave])', async () => ((echoIn = false), chain())],
      ['updateEffects([wave, echo])', async () => ((echoIn = true), chain())],
      ['updateEffects([echo])', async () => ((waveIn = false), chain())],
    ];
    stage.cycle(steps, 2200, ([text, run]) => {
      void run();
      stage.say(text);
    });
  }
  return () => stage.dispose();
};

export default mount;
