// Railroad EBNF: each W3C-style construct (terminal, sequence, choice, optional, repetition, group, comment) in turn
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Terminals are quoted literals; bare identifiers are non-terminals that point at other rules.
const TERMINALS = `railroad-ebnf-beta
title "Terminals and non-terminals"

letter = "a" | "b" | 'c' ;
identifier = letter ;`;

// A sequence is just elements one after another.
const SEQUENCE = `railroad-ebnf-beta
title "Sequence"

greeting = "Hello" " " "World" "!" ;`;

// "|" draws a branch; ::= is accepted as the assignment operator too.
const CHOICE = `railroad-ebnf-beta
title "Choice"

sign ::= "+" | "-" ;
boolean ::= "true" | "false" | "unknown" ;`;

// "?" makes the element skippable: the line bypasses it.
const OPTIONAL = `railroad-ebnf-beta
title "Optional sign"

sign = "+" | "-" ;
number = sign? digit+ ;
digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ;`;

// "*" (zero or more) and "+" (one or more) draw a loop-back path.
const REPETITION = `railroad-ebnf-beta
title "Repetition: * and +"

word = letter+ ;
spaces = " "* ;
letter = "a" | "b" | "c" ;`;

// Parentheses group elements so an operator can apply to the whole group.
const GROUPING = `railroad-ebnf-beta
title "Grouping"

expression = term ( ( "+" | "-" ) term )* ;
term = "number" ;`;

// Comments in both styles are dropped by the parser, so the diagram is unchanged.
const COMMENTS = `railroad-ebnf-beta
title "Comments are ignored"

/* W3C style comment */
pair = key ":" value ; (* ISO style comment *)
key = "name" | "id" ;
value = "text" | "number" ;`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Terminals', code: TERMINALS },
      { label: 'Sequence', code: SEQUENCE },
      { label: 'Choice', code: CHOICE },
      { label: 'Optional', code: OPTIONAL },
      { label: 'Repetition', code: REPETITION },
      { label: 'Grouping', code: GROUPING },
      { label: 'Comments', code: COMMENTS },
    ],
  });

export default mount;
