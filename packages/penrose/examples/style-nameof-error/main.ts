// nameof x turns a Style variable back into the name it matched in Substance
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Set

predicate IsEmpty(Set)
predicate IsNonEmpty(Set)
`,
    substance: `Set A
IsEmpty(A)
IsNonEmpty(A)
`,
    style: `canvas {
  width = 640
  height = 280
}

forall Set x {
  x.icon = Circle {
    center : (0, 40)
    r : 70
    strokeWidth : 3.0
    fillColor : rgba(0.85, 0.9, 1.0, 1.0)
  }
}

forall Set x
where IsEmpty(x); IsNonEmpty(x) {
  errorText = Text {
    string : "Set " + (nameof x) + " is both empty and non-empty, which is inconsistent"
    center : (0, 0 - 90)
    fontSize : "18px"
    fillColor : rgba(0.8, 0.1, 0.1, 1.0)
  }
  override x.icon.strokeColor = rgba(0.8, 0.1, 0.1, 1.0)
}
`,
    variants: [
      { label: 'IsEmpty and IsNonEmpty' },
      { label: 'only IsEmpty', substance: `Set A\nIsEmpty(A)\n` },
    ],
  });
  return () => stage.dispose();
};

export default mount;
