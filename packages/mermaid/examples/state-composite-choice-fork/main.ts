// State diagrams: composite states, choice, fork and join, and concurrent regions
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// A choice node branches on a condition written on the transitions.
const CHOICE = `stateDiagram-v2
    state if_state <<choice>>
    [*] --> IsPositive
    IsPositive --> if_state
    if_state --> False: if n < 0
    if_state --> True : if n >= 0`;

// fork and join split one flow into two and merge them again.
const FORK = `stateDiagram-v2
    state fork_state <<fork>>
    [*] --> fork_state
    fork_state --> State2
    fork_state --> State3
    state join_state <<join>>
    State2 --> join_state
    State3 --> join_state
    join_state --> State4
    State4 --> [*]`;

// Composite states, with a transition between two of them.
const COMPOSITE = `stateDiagram-v2
    [*] --> Draft
    Draft --> Review : submit
    state Review {
        [*] --> Screening
        Screening --> Decision
    }
    Review --> Published : approved
    Review --> Draft : rejected
    Published --> [*]`;

// -- splits a composite state into concurrent regions.
const CONCURRENT = `stateDiagram-v2
    [*] --> Active
    state Active {
        [*] --> NumLockOff
        NumLockOff --> NumLockOn : EvNumLockPressed
        NumLockOn --> NumLockOff : EvNumLockPressed
        --
        [*] --> CapsLockOff
        CapsLockOff --> CapsLockOn : EvCapsLockPressed
        CapsLockOn --> CapsLockOff : EvCapsLockPressed
        --
        [*] --> ScrollLockOff
        ScrollLockOff --> ScrollLockOn : EvScrollLockPressed
        ScrollLockOn --> ScrollLockOff : EvScrollLockPressed
    }`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Choice', code: CHOICE },
      { label: 'Fork and join', code: FORK },
      { label: 'Composite states', code: COMPOSITE },
      { label: 'Concurrency', code: CONCURRENT },
    ],
    interval: 4500,
  });

export default mount;
