// Modular classes: classes.d2 holds the styles, main.d2 spreads them in
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const files = {
  'classes.d2': `classes: {
  base: {
    style: {
      border-radius: 4
      shadow: true
    }
  }
  error: {
    style.fill: pink
    style.stroke: red
  }
  med: {
    width: 200
    height: 200
    style.font-size: 24
  }
  large: {
    width: 300
    height: 300
    style.font-size: 28
  }
  person: {
    shape: person
    style.stroke-dash: 3
  }
}`,
};

const main = `...@classes
user.class: person
error.class: [base; error]
modal.class: [base; med]

user -> app.signup: click
app.signup -> error: invalid fields
app.signup -> modal: continue registration`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      { label: 'main.d2 with the classes from classes.d2', files, code: main },
      { label: 'Swap modal to the large class', files, code: main.replace('[base; med]', '[base; large]') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
