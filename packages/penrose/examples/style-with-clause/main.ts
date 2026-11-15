// A style variable declared in with behaves exactly like one declared in forall
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (header: string): string => `canvas {
  width = 560
  height = 380
}

forall Set s {
  s.icon = Circle {
    strokeWidth : 0.0
    fillColor : rgba(0.75, 0.75, 0.75, 0.6)
  }
  ensure s.icon.r > 50
  ensure s.icon.r < 150
  s.text = Text {
    string : s.label
    fontSize : "28px"
  }
  ensure contains(s.icon, s.text)
}

${header} {
  override x.icon.fillColor = rgba(0.3, 0.5, 0.95, 0.8)
  ensure contains(y.icon, x.icon, 6.0)
}
`;
  playground(stage, {
    domain: `type Set
predicate Subset(Set, Set)
`,
    substance: `Set A, B, C
Subset(A, B)
AutoLabel All
`,
    style: style(`forall Set x; Set y
where Subset(x, y)`),
    variants: [
      { label: 'forall x; y where', style: style(`forall Set x; Set y\nwhere Subset(x, y)`) },
      { label: 'forall x where … with y', style: style(`forall Set x\nwhere Subset(x, y)\nwith Set y`) },
      { label: 'forall x with y where', style: style(`forall Set x\nwith Set y\nwhere Subset(x, y)`) },
    ],
  });
  return () => stage.dispose();
};

export default mount;
