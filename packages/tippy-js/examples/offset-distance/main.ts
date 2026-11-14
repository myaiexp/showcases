// A chat avatar with a speech bubble whose offset (sideways, distance) is adjustable
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Slide the two settings and the bubble moves.' });

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = 'M';
  const name = document.createElement('div');
  name.className = 'name';
  name.textContent = 'Maya';
  const readout = document.createElement('code');
  readout.className = 'readout';
  stage.root.append(avatar, name, readout);

  let offset: [number, number] = [0, 10];
  const label = (): void => {
    readout.textContent = `offset: [${offset[0]}, ${offset[1]}]`;
  };
  label();

  const bubble = stage.own(
    tippy(avatar, {
      content: 'Seen the new design?',
      // Always open: this example is about where the bubble sits, not when it shows.
      trigger: 'manual',
      showOnCreate: true,
      hideOnClick: false,
      placement: 'top-start',
      offset,
      // Smooths the bubble's slide when the offset changes.
      moveTransition: 'transform 0.35s ease-out',
      appendTo: stage.root,
    }),
  );
  const apply = (skid: number, distance: number): void => {
    offset = [skid, distance];
    bubble.setProps({ offset });
    label();
  };

  if (stage.bar) {
    slider(stage.bar, 'Sideways', -40, 80, 1, 0, (v) => apply(v, offset[1]));
    slider(stage.bar, 'Distance', 0, 50, 1, 10, (v) => apply(offset[0], v));
  } else {
    const steps: [number, number][] = [[0, 10], [40, 10], [40, 34], [-10, 4], [0, 24]];
    let i = 0;
    stage.every(1500, () => {
      const [x, y] = steps[++i % steps.length]!;
      apply(x, y);
    });
  }

  return stage.dispose;
};

export default mount;
