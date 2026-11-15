// A where clause chaining two symmetric Equal facts finds x, y, z in the right order
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'substance',
    domain: `type Set
symmetric predicate Equal(Set, Set)
`,
    substance: `Set A, B, C
Equal(B, A)
Equal(B, C)
AutoLabel All
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Set s {
  s.icon = Circle {
    r : 40
    strokeWidth : 3.0
    fillColor : #dfe8f5
  }
  s.text = Text {
    string : s.label
    center : s.icon.center
    fontSize : "30px"
  }
}

forall Set x; Set y; Set z
where Equal(x, y); Equal(y, z) {
  -- y is the shared middle set, x and z the ends
  override y.icon.fillColor = #f2b531
  ensure x.icon.center[1] == y.icon.center[1]
  ensure z.icon.center[1] == y.icon.center[1]
  ensure y.icon.center[0] - x.icon.center[0] > 100
  ensure z.icon.center[0] - y.icon.center[0] > 100
}
`,
  });
  return () => stage.dispose();
};

export default mount;
