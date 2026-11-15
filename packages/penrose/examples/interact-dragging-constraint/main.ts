// Play Mode: draggingConstraint strings turn the pointer into an allowed position
import type { Mount } from '@/types.ts';
import { createInteractive, scriptedDrag } from '../../shared/interactive.ts';
import { createStage, STOPPED } from '../../shared/stage.ts';

const trio = {
  domain: `type Dot
`,
  substance: `Dot z
`,
  style: `canvas {
  width = 360
  height = 240
}
zone {
  -- the top-right quadrant, where c2 may go
  quadrant = Rectangle {
    center : (90, 60)
    width : 180
    height : 120
    fillColor : rgba(0.18, 0.62, 0.27, 0.12)
    strokeWidth : 0
  }
  rail = Line {
    start : (-170, -80)
    end : (170, -80)
    strokeColor : rgba(0.4, 0.4, 0.4, 1)
    strokeWidth : 2
    strokeStyle : "dashed"
  }
}
c1 {
  shape = Circle {
    r : 18
    fillColor : rgba(0.2, 0.5, 0.85, 0.5)
    -- draggable anywhere on canvas
    draggingConstraint : "return [x, y]"
  }
}
c2 {
  shape = Circle {
    r : 18
    fillColor : rgba(0.18, 0.62, 0.27, 0.6)
    -- draggable only in the top-right quadrant
    draggingConstraint : "return [Math.max(0, x), Math.max(0, y)]"
  }
}
c3 {
  shape = Circle {
    r : 18
    fillColor : rgba(0.85, 0.35, 0.45, 0.6)
    -- rides the rail: x follows the mouse, y is fixed
    draggingConstraint : "return [x, -80]"
  }
}
forall Dot z {
  -- start c2 inside its quadrant and c3 on its rail, apart from c1
  ensure c2.shape.center[0] > 30
  ensure c2.shape.center[1] > 30
  ensure c3.shape.center[1] == -80
  ensure disjoint(c1.shape, c2.shape, 20)
  ensure disjoint(c1.shape, c3.shape, 20)
}`,
  variation: 'play',
};

const NAMES = ['c1', 'c2', 'c3'];
const NOTES: Record<string, string> = {
  c1: 'return [x, y]: follows the pointer anywhere',
  c2: 'return [Math.max(0, x), Math.max(0, y)]: stops at the quadrant',
  c3: 'return [x, -80]: slides on the rail',
};

const mount: Mount = async (host, ctx) => {
  const stage = createStage(host, ctx, { hint: 'Play Mode: drag each circle far outside its region.' });
  const live = await createInteractive(stage, trio, { mode: 'play', pointer: true });
  if (!live) return () => stage.dispose();
  stage.say(`draggable (have a draggingConstraint): ${live.constrained().join(', ')}`);

  if (stage.preview) {
    void (async () => {
      try {
        await stage.wait(900);
        for (let round = 0; !stage.disposed; round++) {
          const dir = round % 2 ? 1 : -1;
          for (const name of NAMES) {
            stage.say(`${name}: ${NOTES[name]}`);
            await scriptedDrag(stage, live, `${name}.shape`, (t) => [dir * 260 * t, dir * 170 * t], 1500);
          }
        }
      } catch (err) {
        if (err !== STOPPED) throw err;
      }
    })();
  }
  return () => stage.dispose();
};

export default mount;
