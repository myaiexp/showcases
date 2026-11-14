// Two moving vans: the tip on one is left behind, the tip on the other sticks to its van
import tippy, { sticky } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260 });

  for (const sticks of [false, true]) {
    const lane = document.createElement('div');
    lane.className = 'lane';
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = sticks ? 'With sticky: the tip rides along' : 'Without: the tip stays behind';
    const road = document.createElement('div');
    road.className = 'road';
    const van = document.createElement('div');
    van.className = 'van';
    const cab = document.createElement('span');
    cab.className = 'cab';
    van.append(cab);
    road.append(van);
    lane.append(road, label);
    stage.root.append(lane);

    // The van drives to the far end of its road and back, forever.
    const run = (): void => {
      const travel = road.clientWidth - van.offsetWidth - 8;
      const motion = van.animate(
        [{ transform: 'translateX(0)' }, { transform: `translateX(${travel}px)` }],
        { duration: 4200, direction: 'alternate', iterations: Infinity, easing: 'ease-in-out' },
      );
      stage.onDispose(() => motion.cancel());
    };

    stage.own(
      tippy(van, {
        content: 'Arriving in 4 min',
        trigger: 'manual',
        showOnCreate: true,
        hideOnClick: false,
        placement: 'top',
        // sticky re-measures the van on every frame; without it the tip is only placed once.
        sticky: sticks,
        plugins: [sticky],
        appendTo: stage.root,
      }),
    );
    run();
  }

  return stage.dispose;
};

export default mount;
