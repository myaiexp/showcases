// Partial import: `@people.management` imports one object of people.d2
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const files = {
  'people.d2': `management: {
  joe: {
    shape: person
    label: Joe Donutlover
  }
  jan: {
    shape: person
    label: Jan Donutbaker
  }
}
# Notice how these do not appear in the rendered diagram
employees: {
  toby: {
    shape: person
    label: Toby Simonton
  }
}`,
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: '...@people.management: only Joe and Jan',
        files,
        code: '...@people.management\njoe -> donuts: loves\njan -> donuts: brings',
      },
      {
        label: '...@people: the whole file, employees included',
        files,
        code: '...@people\nmanagement.joe -> donuts: loves\nmanagement.jan -> donuts: brings',
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
