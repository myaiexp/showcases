// Several `&` lines in one glob must all match (AND).
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Two filters',
        code: `*: {
  &shape: person
  &connected: true
  style.fill: red
}
(** -> **)[*]: {
  &src: a
  &dst: c
  style.stroke: yellow
}
a -> b
a.shape: person
a -> c
`,
      },
      {
        label: '&src and &dst properties',
        code: `a: {
  shape: circle
  style: {
    fill: blue
    opacity: 0.8
  }
}
b: {
  shape: rectangle
  style: {
    fill: red
    opacity: 0.5
  }
}
c: {
  shape: diamond
  style.fill: green
  style.opacity: 0.8
}
(* -> *)[*]: {
  &src.style.fill: blue
  style.stroke-dash: 3
}
(* -> *)[*]: {
  &dst.style.opacity: 0.8
  style.stroke: cyan
}
(* -> *)[*]: {
  &src.shape: rectangle
  &dst.style.fill: green
  style.stroke-width: 5
}
a -> b
b -> c
a -> c
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
