// Fun: a Robot with named actions, moved with arrow keys
import { Leafer, KeyEvent } from 'leafer-ui';
import { Robot } from '@leafer-in/robot'; // the Robot plugin
import { arrowSheet } from '../../shared/sprites.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hold and release the arrow keys (click the page first if nothing happens).' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const robot = new Robot({
    // the docs load /image/arrows.png: 20 frames of 100 x 100
    robot: { url: arrowSheet(), size: { width: 100, height: 100 }, total: 20 },
    actions: {
      // preset actions, by frame number
      up: 0, // a still up arrow (frame 0)
      right: 5,
      down: 10,
      left: 15,
      arrowUp: [0, 1, 2, 3, 4], // an animated up arrow (frames loop)
      arrowRight: [5, 6, 7, 8, 9],
      arrowDown: [10, 11, 12, 13, 14],
      arrowLeft: [15, 16, 17, 18, 19],
    },
    action: 'arrowRight', // start with the animated right arrow
    x: u(20),
    y: u(20),
    scale: stage.preview ? 0.6 : 1,
  });
  leafer.add(robot);

  // Arrow keys move it, holding speeds it up.
  let speed = 5;
  leafer.on(KeyEvent.DOWN, (e: KeyEvent) => {
    speed++;
    switch (e.code) {
      case 'ArrowUp':
        robot.action = 'arrowUp';
        robot.y = (robot.y ?? 0) - speed;
        break;
      case 'ArrowDown':
        robot.action = 'arrowDown';
        robot.y = (robot.y ?? 0) + speed;
        break;
      case 'ArrowLeft':
        robot.action = 'arrowLeft';
        robot.x = (robot.x ?? 0) - speed;
        break;
      case 'ArrowRight':
        robot.action = 'arrowRight';
        robot.x = (robot.x ?? 0) + speed;
        break;
    }
  });
  leafer.on(KeyEvent.UP, (e: KeyEvent) => {
    speed = 5;
    switch (e.code) {
      case 'ArrowUp':
        robot.action = 'up';
        break;
      case 'ArrowDown':
        robot.action = 'down';
        break;
      case 'ArrowLeft':
        robot.action = 'left';
        break;
      case 'ArrowRight':
        robot.action = 'right';
        break;
    }
  });

  if (stage.preview) {
    // No keyboard in a card: steer the robot round a square by setting its action.
    const legs = [
      { action: 'arrowRight', dx: 1, dy: 0 },
      { action: 'arrowDown', dx: 0, dy: 1 },
      { action: 'arrowLeft', dx: -1, dy: 0 },
      { action: 'arrowUp', dx: 0, dy: -1 },
    ];
    let leg = 0;
    let travelled = 0;
    stage.loop((dt) => {
      const l = legs[leg]!;
      robot.action = l.action;
      robot.x = (robot.x ?? 0) + l.dx * 90 * dt;
      robot.y = (robot.y ?? 0) + l.dy * 70 * dt;
      travelled += 90 * dt;
      if (travelled > 140) {
        travelled = 0;
        leg = (leg + 1) % legs.length;
      }
    });
  }

  return stage.dispose;
};

export default mount;
