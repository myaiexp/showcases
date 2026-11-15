// `theme-overrides` and `dark-theme-overrides` in `vars.d2-config` recolour.
// They replace single colour codes (B1..B6, AA2.., AB4..) of the chosen theme.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The overrides live in the source, so editing a hex code recolours the diagram. The dark-theme-overrides tab only shows in dark mode.' });
  playground(stage, {
    options: {},
    onRender: (_result, svg, variant) => {
      if (variant.label.startsWith('dark')) stage.say('dark-theme-overrides: applied only when the system is in dark mode (media query in SVG: ' + svg.outerHTML.includes('prefers-color-scheme') + ')');
    },
    variants: [
      {
        label: 'No overrides',
        code: `vars: {
  d2-config: {
    theme-id: 0
  }
}
direction: right
a -> b -> c
box: {x -> y}
`,
      },
      {
        label: 'theme-overrides: green and blue codes',
        code: `vars: {
  d2-config: {
    theme-id: 0
    theme-overrides: {
      B1: "#2E7D32"
      B2: "#66BB6A"
      B3: "#A5D6A7"
      B4: "#C5E1A5"
      B5: "#E6EE9C"
      B6: "#FFF59D"
      AA2: "#0D47A1"
      AA4: "#42A5F5"
      AA5: "#90CAF9"
      AB4: "#F44336"
      AB5: "#FFCDD2"
    }
  }
}
direction: right
a -> b -> c
box: {x -> y}
`,
      },
      {
        label: 'dark-theme-overrides',
        code: `vars: {
  d2-config: {
    theme-id: 0
    dark-theme-id: 200
    dark-theme-overrides: {
      B1: "#2E7D32"
      B2: "#66BB6A"
      B3: "#A5D6A7"
    }
  }
}
direction: right
a -> b -> c
box: {x -> y}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
