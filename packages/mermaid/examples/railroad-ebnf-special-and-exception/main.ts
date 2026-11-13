// Railroad EBNF in ISO 14977 style: commas, brackets, braces, special sequences and exceptions
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// ISO writes a sequence with commas, an optional with [ ] and zero-or-more with { }.
const ISO = `railroad-ebnf-beta
title "ISO 14977 forms"

(* ISO comment *)
integer = [ sign ] , digit , { digit } ;
sign = "+" | "-" ;
digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ;`;

// ? text ? describes something EBNF cannot express; it is drawn as a special element.
const SPECIAL = `railroad-ebnf-beta
title "Special sequences"

line = { character } , newline ;
character = ? any visible character ? ;
newline = ? the platform line terminator ? ;`;

// A - B matches A but not B: the exception is drawn on the rule.
const EXCEPTION = `railroad-ebnf-beta
title "Exception: A - B"

identifier-char = character - "_" ;
quoted = '"' , { character - '"' } , '"' ;
character = ? any visible character ? ;`;

// Both families side by side: the same rule in W3C and then ISO notation draws the same shape.
const W3C = `railroad-ebnf-beta
title "W3C: A? B* C+"

list = "[" item? ( "," item )* "]" ;
item = digit+ ;
digit = "0" | "1" | "2" ;`;

const ISO_SAME = `railroad-ebnf-beta
title "ISO: [ A ] { B }"

list = "[" , [ item ] , { "," , item } , "]" ;
item = digit , { digit } ;
digit = "0" | "1" | "2" ;`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'ISO forms', code: ISO },
      { label: 'Special sequences', code: SPECIAL },
      { label: 'Exception', code: EXCEPTION },
      { label: 'W3C list', code: W3C },
      { label: 'Same list in ISO', code: ISO_SAME },
    ],
  });

export default mount;
