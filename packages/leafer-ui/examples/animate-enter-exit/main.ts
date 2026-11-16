// Fun: enter and exit animations on a swapped Frame
import { Leafer, Group, Frame } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pages swap every two seconds, each playing its exit and entrance.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const page1 = new Frame({
    x: stage.preview ? 70 : 300,
    y: u(100),
    width: u(150),
    height: u(100),
    fill: '#FEB027',
    animation: {
      // enter animation
      keyframes: [{ opacity: 0, offsetX: -u(150) }, { opacity: 1, offsetX: 0 }],
      duration: 0.8,
    },
    animationOut: {
      // exit animation
      style: { opacity: 0, offsetX: u(150) },
      duration: 0.8,
    },
  });
  const page2 = page1.clone({ fill: '#32cd79' }); // clone, with another fill

  const group = new Group({ children: [page1] });
  leafer.add(group);

  // Swap the pages: the exit and enter animations run on their own.
  stage.every(2000, () => {
    if (page1.parent) {
      group.add(page2);
      page1.remove();
    } else {
      group.add(page1);
      page2.remove();
    }
  });

  return stage.dispose;
};

export default mount;
