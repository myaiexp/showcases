// The welcome page analogy: a household domain whose types are drawn as pictures
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'domain',
    domain: `-- Penrose knows no objects at all until the domain teaches it
type Plant
type Furniture
type Building
`,
    substance: `Building House
Plant Fern, Oak
Furniture Chair
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Building b {
  b.icon = Image {
    href : "house.svg"
    width : 150
    height : 150
  }
}

forall Plant p {
  p.icon = Image {
    href : "tree.svg"
    width : 90
    height : 90
  }
}

forall Furniture f {
  f.icon = Image {
    href : "person.svg"
    width : 80
    height : 80
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
