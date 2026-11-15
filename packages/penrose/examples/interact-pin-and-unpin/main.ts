// Pinning: moved shapes leave the optimizer; right-click or the button lets them go
import type { Mount } from '@/types.ts';
import { createInteractive, scriptedDrag, type Interactive } from '../../shared/interactive.ts';
import { createStage, STOPPED } from '../../shared/stage.ts';

const trio = {
  domain: `type Dot
`,
  substance: `Dot a, b, c, d
AutoLabel All
`,
  style: `canvas {
  width = 320
  height = 240
}
forall Dot x {
  x.icon = Circle {
    r : 26
    fillColor : rgba(0.85, 0.35, 0.45, 0.3)
    strokeWidth : 2
    strokeColor : rgba(0.85, 0.35, 0.45, 1)
  }
  x.text = Text {
    string : x.label
    center : x.icon.center
    fontSize : "18px"
  }
}
forall Dot x; Dot y {
  ensure disjoint(x.icon, y.icon, 12)
  -- a pull that keeps the unpinned circles close to the middle
  encourage norm(x.icon.center) == 0
}`,
  variation: 'pins',
};

const clean = (paths: string[]): string => paths.map((p) => p.replace(/`/g, '').split('.')[0]).join(', ') || 'none';

const mount: Mount = async (host, ctx) => {
  const stage = createStage(host, ctx, { hint: 'Drag a circle to pin it. Right-click a circle to pin or unpin it.' });
  let live: Interactive | null = null;
  live = await createInteractive(stage, trio, {
    mode: 'edit',
    pointer: true,
    onDraw() {
      if (live && !stage.preview) stage.say(`pinned: ${clean(live.pinned())}`, live.pinned().length ? 'warn' : 'info');
    },
  });
  if (!live) return () => stage.dispose();
  const api = live;
  stage.button('Unpin all', () => api.unpinAll());
  stage.button('Reset', () => api.reset());

  if (stage.preview) {
    void (async () => {
      try {
        await stage.wait(900);
        for (let round = 0; !stage.disposed; round++) {
          const icons = api.translatable().filter((p) => p.endsWith('icon'));
          const sign = round % 2 ? -1 : 1;
          await scriptedDrag(stage, api, icons[0]!, (t) => [sign * 100 * t, -55 * t], 1500);
          await scriptedDrag(stage, api, icons[1]!, (t) => [-sign * 100 * t, 55 * t], 1500);
          stage.say(`pinned: ${clean(api.pinned())}; the rest settle`, 'warn');
          await stage.wait(1800);
          api.unpinAll();
          stage.say('unpinned');
          await stage.wait(1500);
        }
      } catch (err) {
        if (err !== STOPPED) throw err;
      }
    })();
  }
  return () => stage.dispose();
};

export default mount;
