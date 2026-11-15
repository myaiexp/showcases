// c1 to c5 from the docs: which circles have sampled centres a drag can change
import type { Mount } from '@/types.ts';
import { el } from '../../shared/opt-svg.ts';
import { createInteractive, scriptedDrag } from '../../shared/interactive.ts';
import { createStage, STOPPED } from '../../shared/stage.ts';

const trio = {
  domain: `type Dot
`,
  substance: `Dot z
`,
  style: `canvas {
  width = 400
  height = 240
}
c1 {
  -- center is sampled by default
  shape = Circle {
    r : 20
  }
}
c2 {
  shape = Circle {
    center : (?, ?)
    r : 20
  }
}
c3 {
  pos = (?, ?)
  shape = Circle {
    center : pos
    r : 20
  }
}
c4 {
  -- y is a fixed number: nothing for a drag to change
  shape = Circle {
    center : (?, 0)
    r : 20
  }
}
c5 {
  pos = (?, ?)
  -- derived from an unknown: the circle's own center is not an input
  shape = Circle {
    center : pos + (0, 10)
    r : 20
  }
}
forall Dot z {
  ensure disjoint(c1.shape, c2.shape, 24)
  ensure disjoint(c1.shape, c3.shape, 24)
  ensure disjoint(c1.shape, c4.shape, 24)
  ensure disjoint(c1.shape, c5.shape, 24)
  ensure disjoint(c2.shape, c3.shape, 24)
  ensure disjoint(c2.shape, c4.shape, 24)
  ensure disjoint(c2.shape, c5.shape, 24)
  ensure disjoint(c3.shape, c4.shape, 24)
  ensure disjoint(c3.shape, c5.shape, 24)
  ensure disjoint(c4.shape, c5.shape, 24)
}`,
  variation: 'which',
};

const NAMES = ['c1', 'c2', 'c3', 'c4', 'c5'];

const mount: Mount = async (host, ctx) => {
  const stage = createStage(host, ctx, { hint: 'Green circles can be dragged; try the red ones.' });
  const live = await createInteractive(stage, trio, {
    mode: 'edit',
    pointer: true,
    onDraw(svg, state) {
      const ok = state.interactivityInfo.translatableShapePaths;
      // Each shape's <title> is its path: colour the outline by whether a drag could move it,
      // and name it with a text below.
      for (const t of svg.querySelectorAll('title')) {
        const shape = t.parentElement;
        const name = t.textContent ?? '';
        if (!shape || !NAMES.includes(name.split('.')[0]!)) continue;
        const good = ok.has(name);
        shape.setAttribute('stroke', good ? '#2f9e44' : '#e03131');
        shape.setAttribute('stroke-width', '4');
        shape.setAttribute('fill', good ? 'rgb(47 158 68 / 0.15)' : 'rgb(224 49 49 / 0.12)');
        const tag = el('text', { x: shape.getAttribute('cx') ?? 0, y: Number(shape.getAttribute('cy') ?? 0) + 5, 'text-anchor': 'middle', 'font-size': 14, fill: '#333', 'pointer-events': 'none' }, svg);
        tag.textContent = name.split('.')[0]!;
      }
    },
  });
  if (!live) return () => stage.dispose();
  const list = (): string => live.translatable().map((p) => p.split('.')[0]).sort().join(', ');
  stage.say(`translatable: ${list()}`);

  if (stage.preview) {
    void (async () => {
      try {
        await stage.wait(900);
        for (let i = 0; !stage.disposed; i++) {
          const name = NAMES[i % NAMES.length]!;
          const path = `${name}.shape`;
          if (live.translatable().includes(path)) {
            stage.say(`${name}: dragged`);
            await scriptedDrag(stage, live, path, (t) => [Math.sin(t * Math.PI) * 60, Math.sin(t * Math.PI * 2) * 40], 1500);
            live.unpinAll();
          } else {
            stage.say(`${name}: no sampled centre, not translatable`, 'warn');
            await stage.wait(1500);
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
