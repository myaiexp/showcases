// Namespace values can derive from others, stay unknown, or be shapes
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Set
`,
    substance: `Set A, B, C
AutoLabel All
`,
    style: `canvas {
  width = 560
  height = 300
}

base {
  unit = 16
}

sizes {
  -- computed from another namespace
  big = base.unit * 3
}

gap {
  -- left to the optimizer, between two bounds
  d = ?
}

frame {
  -- a shape that belongs to no Substance object
  box = Rectangle {
    center : (0, 0)
    width : canvas.width - 16
    height : canvas.height - 16
    fillColor : none()
    strokeColor : rgba(0.3, 0.3, 0.3, 1.0)
    strokeWidth : 3.0
  }
}

forall Set s {
  s.icon = Circle {
    r : sizes.big
    strokeWidth : 0.0
    fillColor : rgba(0.95, 0.65, 0.3, 0.7)
  }
  s.text = Text {
    string : s.label
    center : s.icon.center
    fontSize : "28px"
  }
  ensure contains(frame.box, s.icon, 6.0)
  ensure gap.d > 24
  ensure gap.d < 70
}

forall Set a; Set b {
  ensure disjoint(a.icon, b.icon, gap.d)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
