// Backticked names in a selector header match exactly that Substance object
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Set
predicate Subset(Set, Set)
`,
    substance: `Set A, B, C, D
Subset(C, D)
AutoLabel All
`,
    style: `canvas {
  width = 640
  height = 340
}

forall Set s {
  s.icon = Circle {
    r : 36
    strokeWidth : 0.0
    fillColor : rgba(0.75, 0.8, 0.95, 1.0)
  }
  s.text = Text {
    string : s.label
    center : s.icon.center
    fontSize : "26px"
  }
}

forall Set a; Set b {
  ensure disjoint(a.icon, b.icon, 30.0)
}

-- one match: the Substance object named B
forall Set \`B\` {
  override \`B\`.icon.fillColor = rgba(0.95, 0.75, 0.15, 1.0)
  override \`B\`.icon.r = 52
}

-- a backticked object together with an ordinary style variable
forall Set \`D\`; Set c
where Subset(c, \`D\`) {
  \`D\`.ring = Circle {
    center : \`D\`.icon.center
    r : \`D\`.icon.r + 10
    fillColor : none()
    strokeColor : rgba(0.85, 0.2, 0.2, 1.0)
    strokeWidth : 5.0
  }
  ensure disjoint(c.icon, \`D\`.icon, 20.0)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
