// Template: a container spreads in a styled wrapper file
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const files = {
  'imports-wrapper-template.d2': `style: {
  fill: "#E3EDE6"
  fill-pattern: dots
  stroke: "#820758"
  stroke-width: 3
  border-radius: 2
  shadow: true
}
label: ""`,
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover tim for his tooltip.' });
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'diagram.d2 inside the designer’s template',
        files,
        code: `template: {
  ...@imports-wrapper-template
  synergy: {
    our firm -> yours: value add
  }
  stakeholders: {
    george.shape: person
    tim.shape: person
    tim.tooltip: is this web scale?
  }
}`,
      },
      {
        label: 'Another diagram, same template',
        files,
        code: `template: {
  ...@imports-wrapper-template
  roadmap: {
    q1 -> q2 -> q3
  }
}`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
