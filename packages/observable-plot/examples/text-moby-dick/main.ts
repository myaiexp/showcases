// Text: lineWidth wraps paragraphs; textOverflow clips or ellipsizes long lines
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

// The three opening paragraphs, with a soft hyphen (\xad) in "coffin".
const PARAGRAPHS = [
  'Call me Ishmael. Some years ago — never mind how long precisely — having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before cof\xadfin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off — then, I account it high time to get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.',
  'There now is your insular city of the Manhattoes, belted round by wharves as Indian isles by coral reefs — commerce surrounds it with her surf. Right and left, the streets take you waterward. Its extreme downtown is the battery, where that noble mole is washed by waves, and cooled by breezes, which a few hours previous were out of sight of land. Look at the crowds of water-gazers there.',
  'Circumambulate the city of a dreamy Sabbath afternoon. Go from Corlears Hook to Coenties Slip, and from thence, by Whitehall, northward. What do you see? — Posted like silent sentinels all around the town, stand thousands upon thousands of mortal men fixed in ocean reveries. Some leaning against the spiles; some seated upon the pier-heads; some looking over the bulwarks of ships from China; some high aloft in the rigging, as if striving to get a still better seaward peep. But these are all landsmen; of week days pent up in lath and plaster — tied to counters, nailed to benches, clinched to desks. How then is this? Are the green fields gone? What do they here?',
];

const OVERFLOWS = ['none', 'ellipsis', 'clip', 'ellipsis-middle', 'clip-start', 'ellipsis-start'] as const;
type Overflow = (typeof OVERFLOWS)[number];

const mount: Mount = (el, ctx) =>
  mountPlot<{ overflow: Overflow; lineWidth: number }>(el, ctx, {
    initial: { overflow: 'none', lineWidth: ctx.preview ? 12 : 20 },
    render: ({ overflow, lineWidth }, { width, height, preview }) =>
      Plot.plot({
        width,
        height: height ?? 320,
        x: { type: 'point', align: 0, axis: preview ? null : 'top', tickSize: 0 },
        marks: [
          Plot.text(PARAGRAPHS, {
            x: (_d, i) => 1 + i, // paragraph number
            lineWidth,
            // With textOverflow set, each paragraph is cut to one line of lineWidth ems
            // instead of wrapping; the full text moves to the title.
            textOverflow: overflow === 'none' ? null : overflow,
            frameAnchor: 'top',
            textAnchor: 'start',
            fontSize: preview ? 6 : undefined,
          }),
        ],
      }),
    // Cards are narrow, so the three columns get short lines; the cycle also tries overflows.
    step: (_s, i) => ({ lineWidth: [12, 16, 9, 12][i % 4] ?? 12, overflow: OVERFLOWS[[0, 0, 1, 2][i % 4] ?? 0] ?? 'none' }),
    previewMs: 2200,
    controls: (bar, live) => {
      select(bar, 'textOverflow', OVERFLOWS, live.state.overflow, (overflow) => live.set({ overflow }));
      slider(bar, 'lineWidth (ems)', [6, 40, 1], live.state.lineWidth, (lineWidth) => live.set({ lineWidth }));
    },
  });

export default mount;
