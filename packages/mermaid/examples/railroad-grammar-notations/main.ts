// Railroad diagrams drawn from EBNF, ABNF, PEG and the explicit railroad-beta constructors
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// EBNF (W3C style): ? optional, * and + repetition, ( ) grouping, | choice.
const EBNF = `railroad-ebnf-beta
title "Identifier with Repetition"

identifier = letter ( letter | digit | "_" )* ;
letter = "a" | "b" | "c" | "d" | "e" ;
digit = "0" | "1" | "2" ;`;

// EBNF again, with [ ] for the optional member list: a small JSON grammar.
const EBNF_JSON = `railroad-ebnf-beta
title "JSON Grammar"

json = element ;
element = object | array | string | number | "true" | "false" | "null" ;
object = "{" [ member ( "," member )* ] "}" ;
array = "[" [ element ( "," element )* ] "]" ;
member = string ":" element ;`;

// ABNF: "/" for alternatives, 1*A for one or more, [ ] for optional.
const ABNF = `railroad-abnf-beta
title "Email Address"

address = local-part "@" domain ;
local-part = 1*( ALPHA / DIGIT / "." / "-" ) ;
domain = label *( "." label ) ;
label = 1*( ALPHA / DIGIT / "-" ) ;`;

// PEG: ordered choice with "/", and the !A not-predicate that keeps keywords out of identifiers.
const PEG = `railroad-peg-beta
title "Identifiers (keywords excluded)"

Identifier <- !Keyword Letter Letter* ;
Keyword <- "if" / "else" / "while" ;
Letter <- "a" / "b" / "c" / "_" ;`;

// PEG calculator: nested groups give loops inside loops.
const PEG_CALC = `railroad-peg-beta
title "Calculator Grammar"

Expression <- Term (("+" / "-") Term)* ;
Term <- Factor (("*" / "/") Factor)* ;
Factor <- Number / "(" Expression ")" ;
Number <- Digit+ ;
Digit <- "0" / "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9" ;`;

// railroad-beta: no notation at all, each construct is an explicit constructor.
const IR = `railroad-beta
title Expression Grammar

expression = sequence(
    nonterminal("term"),
    zeroOrMore(sequence(
        choice(terminal("+"), terminal("-")),
        nonterminal("term")
    ))
) ;
term = sequence(
    nonterminal("factor"),
    zeroOrMore(sequence(
        choice(terminal("*"), terminal("/")),
        nonterminal("factor")
    ))
) ;
factor = choice(
    nonterminal("number"),
    sequence(terminal("("), nonterminal("expression"), terminal(")"))
) ;
number = oneOrMore(nonterminal("digit")) ;
digit = choice(terminal("0"), terminal("1"), terminal("2"), terminal("3"), terminal("4")) ;`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'EBNF identifier', code: EBNF },
      { label: 'ABNF email', code: ABNF },
      { label: 'PEG identifiers', code: PEG },
      { label: 'EBNF JSON', code: EBNF_JSON },
      { label: 'PEG calculator', code: PEG_CALC },
      { label: 'railroad-beta constructors', code: IR },
    ],
  });

export default mount;
