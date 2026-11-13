// railroad-beta primitives: every constructor once, then the railroad config block restyling the same rule
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// All eight constructors in one grammar, including special() which the notation forms rarely use.
const ALL = `railroad-beta
title Every constructor

statement = choice(
    sequence(terminal("let"), nonterminal("name"), terminal("="), nonterminal("value")),
    sequence(terminal("print"), optional(terminal("-n")), oneOrMore(nonterminal("value"))),
    zeroOrMore(nonterminal("comment"))
) ;
value = choice(nonterminal("name"), special("any numeric literal")) ;`;

// The same rule with default styling, as a baseline for the config variants.
const RULE = `railroad-beta
title Call expression

call = sequence(
    nonterminal("name"),
    terminal("("),
    optional(sequence(nonterminal("arg"), zeroOrMore(sequence(terminal(","), nonterminal("arg"))))),
    terminal(")")
) ;`;

// Frontmatter railroad: block overrides colours; unset values still follow the theme.
const COLOURS = `---
config:
  railroad:
    terminalFill: "#14532d"
    terminalStroke: "#4ade80"
    terminalTextColor: "#dcfce7"
    nonTerminalFill: "#1e3a8a"
    nonTerminalStroke: "#60a5fa"
---
${RULE}`;

// Spacing and curve options: wide separations and a large arc radius open the diagram up.
const SPACING = `---
config:
  railroad:
    padding: 14
    verticalSeparation: 24
    horizontalSeparation: 24
    arcRadius: 16
    fontSize: 18
---
${RULE}`;

// Theme integration: no railroad block, just a different theme, and the diagram follows it.
const THEME = `---
config:
  theme: forest
---
${RULE}`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'All constructors', code: ALL },
      { label: 'Default style', code: RULE },
      { label: 'Colour overrides', code: COLOURS },
      { label: 'Spacing and curves', code: SPACING },
      { label: 'Follows the theme', code: THEME },
    ],
  });

export default mount;
