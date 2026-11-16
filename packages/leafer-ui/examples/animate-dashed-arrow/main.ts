// Fun: animating dashOffset on an Arrow
import { Leafer } from 'leafer-ui';
import { Arrow } from '@leafer-in/arrow'; // the arrow plugin
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The arrow\'s dashes march toward its head.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const arrow = new Arrow({
    x: u(40),
    y: u(100),
    toPoint: { x: u(160), y: 0 },
    stroke: '#32cd79',
    strokeWidth: 5,
    dashPattern: [10, 10], // dashed
    dashOffset: 0,
    animation: {
      style: { dashOffset: -20 }, // move the dashes by one period
      easing: 'linear',
      duration: 0.5,
      loop: true,
    },
  });
  leafer.add(arrow);

  return stage.dispose;
};

export default mount;
