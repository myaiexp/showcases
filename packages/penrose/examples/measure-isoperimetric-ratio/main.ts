// Twelve free radii pulled towards the shape with the least perimeter per area
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Thing
`,
    substance: `Thing T
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.r0 = ?
  ensure t.r0 > 35
  ensure t.r0 < 120
  t.r1 = ?
  ensure t.r1 > 35
  ensure t.r1 < 120
  t.r2 = ?
  ensure t.r2 > 35
  ensure t.r2 < 120
  t.r3 = ?
  ensure t.r3 > 35
  ensure t.r3 < 120
  t.r4 = ?
  ensure t.r4 > 35
  ensure t.r4 < 120
  t.r5 = ?
  ensure t.r5 > 35
  ensure t.r5 < 120
  t.r6 = ?
  ensure t.r6 > 35
  ensure t.r6 < 120
  t.r7 = ?
  ensure t.r7 > 35
  ensure t.r7 < 120
  t.r8 = ?
  ensure t.r8 > 35
  ensure t.r8 < 120
  t.r9 = ?
  ensure t.r9 > 35
  ensure t.r9 < 120
  t.r10 = ?
  ensure t.r10 > 35
  ensure t.r10 < 120
  t.r11 = ?
  ensure t.r11 > 35
  ensure t.r11 < 120
  t.pts = [(0 + t.r0 * 1, 0 + t.r0 * 0), (0 + t.r1 * 0.866, 0 + t.r1 * 0.5), (0 + t.r2 * 0.5, 0 + t.r2 * 0.866), (0 + t.r3 * 0, 0 + t.r3 * 1), (0 + t.r4 * -0.5, 0 + t.r4 * 0.866), (0 + t.r5 * -0.866, 0 + t.r5 * 0.5), (0 + t.r6 * -1, 0 + t.r6 * 0), (0 + t.r7 * -0.866, 0 + t.r7 * -0.5), (0 + t.r8 * -0.5, 0 + t.r8 * -0.866), (0 + t.r9 * 0, 0 + t.r9 * -1), (0 + t.r10 * 0.5, 0 + t.r10 * -0.866), (0 + t.r11 * 0.866, 0 + t.r11 * -0.5)]
  t.shape = Polygon {
    points : t.pts
    fillColor : #4f8fdc44
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
}
`,
    variants: [
      {
        label: 'no objective',
      },
      {
        label: 'minimal(isoperimetricRatio(pts, true))',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.r0 = ?
  ensure t.r0 > 35
  ensure t.r0 < 120
  t.r1 = ?
  ensure t.r1 > 35
  ensure t.r1 < 120
  t.r2 = ?
  ensure t.r2 > 35
  ensure t.r2 < 120
  t.r3 = ?
  ensure t.r3 > 35
  ensure t.r3 < 120
  t.r4 = ?
  ensure t.r4 > 35
  ensure t.r4 < 120
  t.r5 = ?
  ensure t.r5 > 35
  ensure t.r5 < 120
  t.r6 = ?
  ensure t.r6 > 35
  ensure t.r6 < 120
  t.r7 = ?
  ensure t.r7 > 35
  ensure t.r7 < 120
  t.r8 = ?
  ensure t.r8 > 35
  ensure t.r8 < 120
  t.r9 = ?
  ensure t.r9 > 35
  ensure t.r9 < 120
  t.r10 = ?
  ensure t.r10 > 35
  ensure t.r10 < 120
  t.r11 = ?
  ensure t.r11 > 35
  ensure t.r11 < 120
  t.pts = [(0 + t.r0 * 1, 0 + t.r0 * 0), (0 + t.r1 * 0.866, 0 + t.r1 * 0.5), (0 + t.r2 * 0.5, 0 + t.r2 * 0.866), (0 + t.r3 * 0, 0 + t.r3 * 1), (0 + t.r4 * -0.5, 0 + t.r4 * 0.866), (0 + t.r5 * -0.866, 0 + t.r5 * 0.5), (0 + t.r6 * -1, 0 + t.r6 * 0), (0 + t.r7 * -0.866, 0 + t.r7 * -0.5), (0 + t.r8 * -0.5, 0 + t.r8 * -0.866), (0 + t.r9 * 0, 0 + t.r9 * -1), (0 + t.r10 * 0.5, 0 + t.r10 * -0.866), (0 + t.r11 * 0.866, 0 + t.r11 * -0.5)]
  encourage minimal(isoperimetricRatio(t.pts, true))
  t.shape = Polygon {
    points : t.pts
    fillColor : #4f8fdc44
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
