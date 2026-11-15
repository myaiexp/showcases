// Edit Mode: dragging a sampled circle moves its inputs, and the others re-solve around it
import type { Mount } from '@/types.ts';
import { createInteractive, scriptedDrag } from '../../shared/interactive.ts';
import { createStage, STOPPED } from '../../shared/stage.ts';

const trio = {
  domain: `type Dot
`,
  substance: `Dot a, b, c
AutoLabel All
`,
  style: `canvas {
  width = 320
  height = 240
}
forall Dot d {
  d.icon = Circle {
    r : 30
    fillColor : rgba(0.2, 0.5, 0.85, 0.35)
    strokeWidth : 2
    strokeColor : rgba(0.2, 0.5, 0.85, 1)
  }
  d.text = Text {
    string : d.label
    center : d.icon.center
    fontSize : "18px"
  }
}
forall Dot d; Dot e {
  ensure disjoint(d.icon, e.icon, 14)
}`,
  variation: 'drag',
};

const mount: Mount = async (host, ctx) => {
  const stage = createStage(host, ctx, { hint: 'Drag a circle. The others make room; the one you moved stays put.' });
  const live = await createInteractive(stage, trio, { mode: 'edit', pointer: true });
  if (!live) return () => stage.dispose();
  stage.button('Reset', () => live.reset());
  stage.say('every circle has a sampled centre, so every circle can be dragged');

  // A card plays its own drag: the first circle sweeps across the others, then is let go.
  if (stage.preview) {
    void (async () => {
      try {
        await stage.wait(900);
        for (let round = 0; !stage.disposed; round++) {
          const path = live.translatable().filter((p) => p.endsWith('icon'))[round % 3]!;
          stage.say(`dragging ${path.replace(/`/g, "")}`);
          await scriptedDrag(stage, live, path, (t) => [Math.sin(t * Math.PI) * 90 * (round % 2 ? -1 : 1), (t - 0.5) * 80]);
          stage.say('released: pinned there, the others settle');
          await stage.wait(1400);
          live.unpinAll();
          await stage.wait(900);
        }
      } catch (err) {
        if (err !== STOPPED) throw err;
      }
    })();
  }
  return () => stage.dispose();
};

export default mount;
