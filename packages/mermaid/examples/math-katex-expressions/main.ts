// $$...$$ KaTeX expressions in flowchart node and edge labels and in sequence diagram participants and messages
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Flowchart: $$ wraps the expression in node labels and edge labels (quote the label).
// String.raw keeps the backslashes of the TeX commands as written.
const FLOW_SIMPLE = String.raw`graph LR
    A["$$x^2$$"] -->|"$$\sqrt{x+3}$$"| B("$$\frac{1}{2}$$")
    A -->|"$$\overbrace{a+b+c}^{\text{note}}$$"| C("$$\pi r^2$$")`;

// A larger flowchart with a piecewise definition and a matrix in two nodes.
const FLOW_BIG = String.raw`graph LR
    A["$$x^2$$"] -->|"$$\sqrt{x+3}$$"| B("$$\frac{1}{2}$$")
    A -->|"$$\overbrace{a+b+c}^{\text{note}}$$"| C("$$\pi r^2$$")
    B --> D("$$x = \begin{cases} a &\text{if } b \\ c &\text{if } d \end{cases}$$")
    C --> E("$$x(t)=c_1\begin{bmatrix}-\cos{t}+\sin{t}\\ 2\cos{t} \end{bmatrix}e^{2t}$$")`;

// Sequence diagram: participant aliases, message text and notes all accept $$.
const SEQUENCE = String.raw`sequenceDiagram
    autonumber
    participant 1 as $$\alpha$$
    participant 2 as $$\beta$$
    1->>2: Solve: $$\sqrt{2+2}$$
    2-->>1: Answer: $$2$$
    Note right of 2: $$\sqrt{2+2}=\sqrt{4}=2$$`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Flowchart', code: FLOW_SIMPLE },
      { label: 'Sequence', code: SEQUENCE },
      { label: 'Flowchart with cases and matrix', code: FLOW_BIG },
    ],
  });

export default mount;
