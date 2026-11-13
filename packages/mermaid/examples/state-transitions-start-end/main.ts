// Basic state syntax: three declarations, labelled transitions, [*] start/end, ids for names with spaces, comments
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Three ways to declare a state: a bare id, `state "text" as id`, and `id : text`.
const DECLARE = `stateDiagram-v2
    direction LR
    plain
    state "Described with the state keyword" as viaKeyword
    viaColon : Described with a colon
    plain --> viaKeyword
    viaKeyword --> viaColon`;

// A transition defines any states it names; text after the colon labels the arrow.
const TRANSITIONS = `stateDiagram-v2
    s1 --> s2
    s2 --> s3: A transition
    s3 --> s1: And back again`;

// [*] is the start state when the arrow leaves it and the end state when the arrow enters it.
const START_END = `stateDiagram-v2
    [*] --> Idle
    Idle --> Working: begin
    Working --> Idle: pause
    Working --> [*]: finish
    Idle --> [*]: cancel`;

// A state with spaces is defined once with an id and a description; the id is used afterwards.
const SPACES = `stateDiagram-v2
    classDef yourState font-style:italic,font-weight:bold,fill:white

    yswsii: Your state with spaces in it
    [*] --> yswsii:::yourState
    [*] --> SomeOtherState
    SomeOtherState --> YetAnotherState
    yswsii --> YetAnotherState
    YetAnotherState --> [*]`;

// %% comments can sit on their own line or at the end of a statement.
const COMMENTS = `stateDiagram-v2
    [*] --> Still
    Still --> [*]
%% this is a comment
    Still --> Moving
    Moving --> Still %% another comment
    Moving --> Crash
    Crash --> [*]`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Three declarations', code: DECLARE },
      { label: 'Transitions', code: TRANSITIONS },
      { label: 'Start and end', code: START_END },
      { label: 'Spaces in names', code: SPACES },
      { label: 'Comments', code: COMMENTS },
    ],
  });

export default mount;
