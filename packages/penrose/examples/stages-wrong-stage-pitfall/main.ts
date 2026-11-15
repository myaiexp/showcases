// The blog caveat: Text centre in the wrong stage cannot be pulled into a Circle
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'Centre in circle stage (mistake)',
        style: `canvas {
  width = 500
  height = 500
}

layout = [circle, text]

global {
  icon = Circle {
    center : (? in circle, ? in circle)
    r : ? in circle
    fillColor : rgba(0.8, 0.9, 1.0, 1.0)
    strokeColor : #1a3a6b
    strokeWidth : 3
  }
  text = Text {
    string : "inside?"
    fontSize : "30px"
    center : (? in circle, ? in circle)
  }
  ensure icon.r == 90 in circle
  ensure norm(icon.center - (0, 0)) == 0 in circle
  ensure contains(icon, text) in text
}
`,
      },
      {
        label: 'Centre in text stage (fixed)',
        style: `canvas {
  width = 500
  height = 500
}

layout = [circle, text]

global {
  icon = Circle {
    center : (? in circle, ? in circle)
    r : ? in circle
    fillColor : rgba(0.8, 0.9, 1.0, 1.0)
    strokeColor : #1a3a6b
    strokeWidth : 3
  }
  text = Text {
    string : "inside?"
    fontSize : "30px"
    center : (? in text, ? in text)
  }
  ensure icon.r == 90 in circle
  ensure norm(icon.center - (0, 0)) == 0 in circle
  ensure contains(icon, text) in text
}
`,
      },
    ],
    domain: `type Thing
`,
    substance: `Thing T
`,
    style: ``,
  });
  return () => stage.dispose();
};

export default mount;
