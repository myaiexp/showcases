// Mirror mappings count as one match, which the tally squares make visible
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = `canvas {
  width = 600
  height = 400
}

forall Set s {
  s.icon = Circle {
    r : 34
    strokeWidth : 0.0
    fillColor : rgba(0.45, 0.65, 0.95, 0.6)
  }
  s.text = Text {
    string : s.label
    center : s.icon.center
    fontSize : "26px"
  }
  -- keep the sets below the tally row
  ensure s.icon.center[1] < 20
}

forall Set a; Set b {
  ensure disjoint(a.icon, b.icon, 50.0)
}

-- one run per unordered pair: a line between them and one more square in the tally
forall Set x; Set y {
  link = Line {
    start : x.icon.center
    end : y.icon.center
    strokeWidth : 3.0
    strokeColor : rgba(0.5, 0.5, 0.5, 1.0)
  }
  tick = Rectangle {
    center : (match_id * 34 - 150, 160)
    width : 26
    height : 26
    fillColor : rgba(0.9, 0.35, 0.25, 1.0)
    strokeWidth : 0.0
  }
  layer link below x.icon
  layer link below y.icon
}
`;
  playground(stage, {
    domain: `type Set
`,
    substance: `Set A, B
AutoLabel All
`,
    style,
    variants: [
      { label: '2 sets: 1 match' },
      { label: '3 sets: 3 matches', substance: `Set A, B, C\nAutoLabel All\n` },
      { label: '4 sets: 6 matches', substance: `Set A, B, C, D\nAutoLabel All\n` },
    ],
  });
  return () => stage.dispose();
};

export default mount;
