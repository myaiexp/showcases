// autonumber <start> <increment>, a restart mid-diagram, and showSequenceNumbers in frontmatter config
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

const BODY = `    Alice->>John: Hello John, how are you?
    loop HealthCheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!`;

// The config switch: showSequenceNumbers under sequence: in frontmatter numbers every arrow without an autonumber line.
const CONFIG = `---
config:
  sequence:
    showSequenceNumbers: true
---
sequenceDiagram
${BODY}`;

// autonumber alone counts 1, 2, 3, and so on.
const PLAIN = `sequenceDiagram
    autonumber
${BODY}`;

// autonumber <start> <increment>: start at 10 and step by 10.
const START_INC = `sequenceDiagram
    autonumber 10 10
${BODY}`;

// Start and increment may include decimals up to the hundredths place.
const DECIMALS = `sequenceDiagram
    autonumber 1 0.25
${BODY}`;

// A second autonumber line restarts the count from its own start and increment.
const RESTART = `sequenceDiagram
    autonumber 1
    Alice->>John: Request
    John-->>Alice: Response
    autonumber 100 5
    Alice->>John: Follow-up request
    John-->>Alice: Follow-up response
    Alice->>John: One more`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Config switch', code: CONFIG },
      { label: 'autonumber', code: PLAIN },
      { label: 'Start and increment', code: START_INC },
      { label: 'Decimals', code: DECIMALS },
      { label: 'Restart mid-diagram', code: RESTART },
    ],
  });

export default mount;
