// Vizzu example: AnimControl methods and properties: play, pause, stop, reverse, cancel, seek, speed
import Vizzu from 'vizzu';
import type { AnimControl } from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate({
    data: musicData,
    config: {
      title: 'Playback controls',
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });
  const toGrouped = { config: { channels: { x: { attach: ['Kinds'] }, y: { detach: ['Kinds'] } } } };
  const toStacked = { config: { channels: { x: { detach: ['Kinds'] }, y: { attach: ['Kinds'] } } } };

  let control: AnimControl | null = null;
  const act = (fn: (c: AnimControl) => void, note: string) => (): void => {
    if (!control) return stage.say('No animation is running: pause, stop and cancel need one.', 'warn');
    fn(control);
    stage.say(note);
  };
  let slider: HTMLInputElement | null = null;
  if (stage.bar) {
    stage.button(
      'Play',
      act((c) => (c.playState = 'running'), "control.playState = 'running'"),
    );
    stage.button(
      'Pause',
      act((c) => (c.playState = 'paused'), "control.playState = 'paused'"),
    );
    stage.button(
      'Stop',
      act((c) => c.stop(), 'control.stop(): seeks back to the start position'),
    );
    stage.button(
      'Reverse',
      act((c) => (c.direction = c.direction === 'reverse' ? 'normal' : 'reverse'), 'control.direction flips'),
    );
    stage.button(
      'Cancel',
      act((c) => c.cancel(), 'control.cancel(): the animate() promise rejects, the next one starts'),
    );
    const lab = (text: string, input: HTMLInputElement): void => {
      const l = document.createElement('label');
      l.append(text, input);
      stage.bar!.append(l);
    };
    slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '100';
    slider.value = '0';
    slider.addEventListener('input', () => control?.seek(`${Number(slider!.value)}%`), {
      signal: stage.signal,
    });
    lab('seek', slider);
    const speed = document.createElement('input');
    speed.type = 'range';
    speed.min = '0.25';
    speed.max = '4';
    speed.step = '0.25';
    speed.value = '1';
    speed.addEventListener(
      'input',
      () => {
        if (control) control.speed = Number(speed.value);
      },
      { signal: stage.signal },
    );
    lab('speed', speed);
    // Follow the animation with the seek slider while the reader is not dragging it.
    stage.every(120, () => {
      if (control && slider && document.activeElement !== slider)
        slider.value = String(Math.round(Number(control.position) * 100));
    });
  }

  const loop = async (): Promise<void> => {
    for (let grouped = true; ; grouped = !grouped) {
      stage.say(grouped ? 'Columns grouped by Kind' : 'Columns stacked again');
      const animation = chart.animate(grouped ? toGrouped : toStacked, { duration: 4 });
      animation.activated.then(
        (c) => {
          control = c;
          if (!stage.preview) return;
          // Cards have no input: reverse the 4 s animation 1.5 s in, so it plays back for a while.
          stage.after(1500, () => {
            c.direction = 'reverse';
          });
          stage.after(2600, () => {
            c.direction = 'normal';
          });
        },
        () => {},
      );
      try {
        await animation;
      } catch {
        // cancel() rejects the promise
      }
      control = null;
      await stage.wait(900);
    }
  };
  loop().catch((err: unknown) => {
    if (!stage.disposed) console.error('playback-controls loop failed', err);
  });
  return () => stage.dispose();
};

export default mount;
