// The docs' Gantt timeline sampler: comments, themeCSS and gantt config in frontmatter, vert, milestone and a custom marker
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Years as dates (dateFormat YYYY, axisFormat %y). The docs note that tickInterval 1decade is
// not a recognised unit and is silently ignored; item0 is a milestone, the vert line is a
// marker, and "workaround" is a task whose id the CSS below turns into a custom red marker.
const SECTIONS = `gantt
    title Timeline - Gantt Sampler
    dateFormat YYYY
    axisFormat %y
    %% this next line doesn't recognise 'decade' or 'year', but will silently ignore
    tickInterval 1decade

    section Issue19062
    71   :            item71, 1900, 1930
    section Issue19401
    36   :            item36, 1913, 1935
    section Issue1300
    94   :            item94, 1910, 1915
    5    :            item5,  1920, 1925
    0    : milestone, item0,  1918, 1s
    9    : vert,              1906, 1s   %% not yet official
    64   : workaround,        1923, 1s   %% custom CSS object`;

// The full sample: YAML comments, displayMode (works at this level too), themeCSS as a
// multi-line string with an id rule and the marker workaround, and gantt settings.
const FULL = `---
    # Frontmatter config, YAML comments
    title: Ignored if specified in chart
    displayMode: compact     #gantt specific setting but works at this level too
    config:
        themeCSS: " // YAML supports multiline strings using a newline markers: \\n
            #item36 { fill: CadetBlue }       \\n

            // Custom marker workaround CSS from forum (below)    \\n
            rect[id^=workaround] { height: calc(100% - 50px) ; transform: translate(9px, 25px); y: 0; width: 1.5px; stroke: none; fill: red; }   \\n
            text[id^=workaround] { fill: red; y: 100%; font-size: 15px;}
        "
        gantt:
            useWidth: 400
            rightPadding: 0
            topAxis: true  #false
            numberSectionStyles: 2
---
${SECTIONS}`;

// In the sample above nothing styled shows up in 12.3.0: the // lines inside themeCSS are not CSS
// comments, so each swallows the selector after it, and task elements carry an id prefixed with the
// diagram's (mm-1-item36), so #item36 and [id^=workaround] no longer match. With /* */ comments and
// [id$=item36] / [id*=workaround] both rules apply: item36 turns CadetBlue and the workaround task
// becomes a thin red marker line.
const CSS_FIXED = `---
    displayMode: compact
    config:
        themeCSS: "/* item 36 gets a colour */ \\n
            [id$=item36] { fill: CadetBlue }       \\n

            /* custom marker workaround */    \\n
            rect[id*=workaround] { height: calc(100% - 50px) ; transform: translate(9px, 25px); y: 0; width: 1.5px; stroke: none; fill: red; }   \\n
            text[id*=workaround] { fill: red; y: 100%; font-size: 15px;}
        "
        gantt:
            useWidth: 400
            rightPadding: 0
            topAxis: true
            numberSectionStyles: 2
---
${SECTIONS}`;

// The same chart without themeCSS: item36 keeps the section colour and the workaround task is an ordinary tiny bar.
const NO_CSS = `---
    displayMode: compact
    config:
        gantt:
            useWidth: 400
            rightPadding: 0
            topAxis: true
            numberSectionStyles: 2
---
${SECTIONS}`;

// topAxis false (the comment's alternative) puts the date labels back at the bottom.
const BOTTOM_AXIS = FULL.replace('topAxis: true  #false', 'topAxis: false');

// Without displayMode: compact each task keeps its own row.
const ROWS = FULL.replace('    displayMode: compact     #gantt specific setting but works at this level too\n', '');

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'The docs sample', code: FULL },
      { label: 'With /* */ comments', code: CSS_FIXED },
      { label: 'Without themeCSS', code: NO_CSS },
      { label: 'topAxis: false', code: BOTTOM_AXIS },
      { label: 'No compact mode', code: ROWS },
    ],
  });

export default mount;
