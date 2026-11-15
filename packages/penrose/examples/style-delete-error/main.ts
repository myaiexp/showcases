// A generic block that reads a field a subtype block deleted is a compile error
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (reader: string): string => `canvas {
  width = 600
  height = 320
}

forall T x {
  x.widget = Circle {
    r : 44
    strokeWidth : 0.0
    fillColor : rgba(0.5, 0.7, 0.95, 0.7)
  }
}

forall S x {
  delete x.widget
}

forall T x {
${reader}
}
`;
  playground(stage, {
    domain: `type T
type S <: T
`,
    substance: `T A, B
S C
`,
    style: style(`  x.note = Text {
    string : "T"
    fontSize : "24px"
  }`),
    variants: [
      {
        label: 'later block avoids the field',
        style: style(`  x.note = Text {
    string : "T"
    fontSize : "24px"
  }`),
      },
      {
        label: 'later block reads it',
        style: `-- (deliberate error)
${style(`  x.note = Text {
    string : "T"
    center : x.widget.center
    fontSize : "24px"
  }`)}`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
