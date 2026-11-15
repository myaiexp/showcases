// Image shapes drawn from SVG files named by href
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'href: "star.svg"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.pic = Image {
    href : "star.svg"
    width : 110
    height : 110
  }
}

forall Thing a; Thing b {
  ensure disjoint(a.pic, b.pic, 20)
}
`,
      },
      {
        label: 'href: "gear.svg"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.pic = Image {
    href : "gear.svg"
    width : 110
    height : 110
  }
}

forall Thing a; Thing b {
  ensure disjoint(a.pic, b.pic, 20)
}
`,
      },
      {
        label: 'href: "flask.svg"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.pic = Image {
    href : "flask.svg"
    width : 110
    height : 110
  }
}

forall Thing a; Thing b {
  ensure disjoint(a.pic, b.pic, 20)
}
`,
      },
    ],
    domain: `type Thing
`,
    substance: `Thing A, B
`,
    style: ``,
  });
  return () => stage.dispose();
};

export default mount;
