// Edit Mode scaling: scaleVaryingValues multiplies a sampled radius or size, then re-solves
import type { Mount } from '@/types.ts';
import { createInteractive, type Grip } from '../../shared/interactive.ts';
import { createStage, STOPPED } from '../../shared/stage.ts';

const trio = {
  domain: `type Dot
type Box
`,
  substance: `Dot a, b
Box r
AutoLabel All
`,
  style: `canvas {
  width = 320
  height = 240
}
forall Dot x {
  x.icon = Circle {
    r : ?
    fillColor : rgba(0.2, 0.5, 0.85, 0.3)
    strokeWidth : 2
    strokeColor : rgba(0.2, 0.5, 0.85, 1)
  }
  ensure x.icon.r > 18
  ensure x.icon.r < 40
}
forall Box x {
  x.icon = Rectangle {
    width : ?
    height : ?
    fillColor : rgba(0.85, 0.55, 0.2, 0.3)
    strokeWidth : 2
    strokeColor : rgba(0.85, 0.55, 0.2, 1)
  }
  ensure x.icon.width > 40
  ensure x.icon.height > 30
  ensure x.icon.width < 120
  ensure x.icon.height < 90
}
forall Dot x; Dot y {
  ensure disjoint(x.icon, y.icon, 10)
}
forall Dot x; Box y {
  ensure disjoint(x.icon, y.icon, 10)
}`,
  variation: 'scale',
};

const clean = (p: string): string => p.replace(/`/g, '');

const mount: Mount = async (host, ctx) => {
  const stage = createStage(host, ctx, { hint: 'Pick a shape and move the slider: its radius, or width and height, is scaled.' });
  const live = await createInteractive(stage, trio, { mode: 'edit', pointer: true });
  if (!live) return () => stage.dispose();
  const paths = live.scalable().sort();
  stage.say(`scalable (sampled radius or size): ${paths.map(clean).join(', ')}`);

  let grip: Grip | null = null;
  let chosen = paths[0]!;
  const pick = (path: string): void => {
    grip?.release();
    chosen = path;
    grip = live.grab(path);
    if (slider) slider.value = '1';
  };
  stage.select('shape', paths.map((p) => [p, clean(p)] as [string, string]), chosen, pick);
  const slider = stage.slider('scale', 0.5, 2.5, 0.05, 1, (v) => {
    if (!grip) grip = live.grab(chosen);
    grip?.scale(v, v);
  });
  stage.button('Reset', () => {
    grip = null;
    live.reset();
    if (slider) slider.value = '1';
  });

  if (stage.preview) {
    void (async () => {
      try {
        await stage.wait(900);
        for (let i = 0; !stage.disposed; i++) {
          const path = paths[i % paths.length]!;
          const g = live.grab(path);
          if (!g) continue;
          stage.say(`scaling ${clean(path)}`);
          for (let k = 1; k <= 24; k++) {
            await stage.wait(70);
            const s = 1 + 0.8 * Math.sin((k / 24) * Math.PI);
            g.scale(s, s);
          }
          await stage.wait(700);
          g.release();
          live.unpinAll();
          await stage.wait(500);
        }
      } catch (err) {
        if (err !== STOPPED) throw err;
      }
    })();
  }
  return () => stage.dispose();
};

export default mount;
