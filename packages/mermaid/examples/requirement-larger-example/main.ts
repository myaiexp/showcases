// The docs' larger requirement example (every type, element and relationship) plus the four direction values
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Six requirement types, three elements (the last with a quoted type), seven relationships. The
// last one uses the reversed form, `destination <- type - source`.
const BODY = `requirement test_req {
    id: 1
    text: the test text.
    risk: high
    verifymethod: test
}

functionalRequirement test_req2 {
    id: 1.1
    text: the second test text.
    risk: low
    verifymethod: inspection
}

performanceRequirement test_req3 {
    id: 1.2
    text: the third test text.
    risk: medium
    verifymethod: demonstration
}

interfaceRequirement test_req4 {
    id: 1.2.1
    text: the fourth test text.
    risk: medium
    verifymethod: analysis
}

physicalRequirement test_req5 {
    id: 1.2.2
    text: the fifth test text.
    risk: medium
    verifymethod: analysis
}

designConstraint test_req6 {
    id: 1.2.3
    text: the sixth test text.
    risk: medium
    verifymethod: analysis
}

element test_entity {
    type: simulation
}

element test_entity2 {
    type: word doc
    docRef: reqs/test_entity
}

element test_entity3 {
    type: "test suite"
    docRef: github.com/all_the_tests
}

test_entity - satisfies -> test_req2
test_req - traces -> test_req2
test_req - contains -> test_req3
test_req3 - contains -> test_req4
test_req4 - derives -> test_req5
test_req5 - refines -> test_req6
test_entity3 - verifies -> test_req5
test_req <- copies - test_entity2`;

// direction picks the layout axis: TB is the default.
const dir = (d?: string): string => `requirementDiagram\n${d ? `\ndirection ${d}\n` : ''}\n${BODY}`;

// A short diagram for the direction tabs, so every orientation is easy to read.
const SMALL = (d: string): string => `requirementDiagram

direction ${d}

requirement test_req {
    id: 1
    text: the test text.
    risk: high
    verifymethod: test
}

element test_entity {
    type: simulation
}

test_entity - satisfies -> test_req`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Larger example', code: dir() },
      { label: 'Larger, LR', code: dir('LR') },
      { label: 'direction TB', code: SMALL('TB') },
      { label: 'direction BT', code: SMALL('BT') },
      { label: 'direction LR', code: SMALL('LR') },
      { label: 'direction RL', code: SMALL('RL') },
    ],
  });

export default mount;
