// Shape catalog: every standard value of `shape`, laid out in a grid
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const catalog = `# Every standard shape, five rows of a grid
grid-rows: 5
grid-gap: 0
style.fill: transparent

classes: {
  row: {
    label: ""
    style.fill: transparent
    style.stroke-width: 0
  }
}

one: {
  class: row
  rectangle.shape: rectangle
  square.shape: square
  page.shape: page
  parallelogram.shape: parallelogram
}
two: {
  class: row
  document.shape: document
  cylinder.shape: cylinder
  queue.shape: queue
  package.shape: package
}
three: {
  class: row
  step.shape: step
  callout.shape: callout
  stored_data.shape: stored_data
  person.shape: person
}
four: {
  class: row
  diamond.shape: diamond
  oval.shape: oval
  circle.shape: circle
  hexagon.shape: hexagon
}
five: {
  class: row
  cloud.shape: cloud
  c4person.shape: c4-person
  c4person.label: c4-person
}
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [{ label: '21 values of shape', code: catalog }],
  });
  return () => stage.dispose();
};

export default mount;
