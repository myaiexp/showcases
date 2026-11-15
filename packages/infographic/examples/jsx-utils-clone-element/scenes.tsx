/** @jsxImportSource @antv/infographic */
// cloneElement scenes: one original badge and its overridden copies
import type { JSXElement } from '@antv/infographic';
import { cloneElement, Rect } from '@antv/infographic';

const original = <Rect x={20} y={70} width={60} height={60} rx={10} fill="#3b82f6" />;

export const SCENES: { say: string; node: JSXElement }[] = [
  { say: 'the original element', node: original },
  {
    say: 'cloneElement(original, { x: 110 })',
    node: (
      <>
        {original}
        {cloneElement(original, { x: 110 })}
      </>
    ),
  },
  {
    say: '{ x: 110, fill } and { x: 200, y: 40, opacity: 0.5 }',
    node: (
      <>
        {original}
        {cloneElement(original, { x: 110, fill: '#f97316' })}
        {cloneElement(original, { x: 200, y: 40, opacity: 0.5, width: 90 })}
      </>
    ),
  },
];
