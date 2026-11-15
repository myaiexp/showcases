// A parcats trace of hair, eye and sex: one row per case, or weighted counts
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const rows = {
  hair: ['Black', 'Black', 'Black', 'Brown', 'Brown', 'Brown', 'Red', 'Brown'],
  eye: ['Brown', 'Brown', 'Brown', 'Brown', 'Brown', 'Blue', 'Blue', 'Blue'],
  sex: ['Female', 'Female', 'Female', 'Male', 'Female', 'Male', 'Male', 'Male'],
};
const weighted = {
  hair: ['Black', 'Brown', 'Brown', 'Brown', 'Red'],
  eye: ['Brown', 'Brown', 'Brown', 'Blue', 'Blue'],
  sex: ['Female', 'Male', 'Female', 'Male', 'Male'],
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const trace = (counted: boolean) => {
    const v = counted ? weighted : rows;
    return {
      type: 'parcats' as const,
      dimensions: [
        { label: 'Hair', values: v.hair },
        { label: 'Eye', values: v.eye },
        { label: 'Sex', values: v.sex },
      ],
      // counts weights each row, so five rows can stand for 86 people
      ...(counted ? { counts: [6, 10, 40, 23, 7] } : {}),
    };
  };

  await Plotly.newPlot(stage.div, [trace(false)], { template: stage.template }, stage.config);

  const show = (counted: boolean): void => void Plotly.react(stage.div, [trace(counted)], { template: stage.template }, { ...stage.config });
  if (stage.bar) toggle(stage.bar, 'counts (weighted rows)', false, show);
  else stage.every(1800, (i) => show(i % 2 === 1));

  return () => stage.dispose();
};

export default mount;
