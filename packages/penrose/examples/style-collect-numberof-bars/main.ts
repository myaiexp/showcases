// A collector runs once per foreach match and sees its whole group
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (height: string): string => `canvas {
  width = 640
  height = 380
}

-- every element weighs one unless it is heavy
forall Element e {
  e.w = 1
}

forall Element e
where Heavy(e) {
  override e.w = 2
}

collect Element e into es
where In(e, s)
foreach Set s {
  h = ${height}
  x = (match_id - (match_total + 1) / 2) * 160
  s.bar = Rectangle {
    center : (x, h / 2 - 140)
    width : 80
    height : h
    fillColor : rgba(0.4, 0.6, 0.95, 0.8)
    strokeWidth : 0.0
  }
  s.name = Text {
    string : s.label
    center : (x, 0 - 164)
    fontSize : "26px"
  }
}
`;
  const counted = style('36 * numberof es');
  playground(stage, {
    domain: `type Set
type Element
predicate In(Element, Set)
predicate Heavy(Element)
`,
    substance: `Set Fruit, Veg, Nuts
Element a, b, c, d, e, f
In(a, Fruit)
In(b, Fruit)
In(c, Fruit)
In(d, Veg)
In(e, Veg)
In(f, Nuts)
Heavy(d)
Heavy(f)
AutoLabel Fruit, Veg, Nuts
NoLabel a, b, c, d, e, f
`,
    style: counted,
    variants: [
      { label: 'numberof es', style: counted },
      { label: 'count(listof w from es)', style: style('36 * count(listof w from es)') },
      { label: 'sum(listof w from es)', style: style('36 * sum(listof w from es)') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
