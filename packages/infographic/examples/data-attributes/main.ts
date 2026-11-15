// attributes on the data (title, desc) and on one item (label, icon, value)
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('data');

  const base = [
    { label: 'Plan', desc: 'Decide', icon: 'clipboard' },
    { label: 'Build', desc: 'Make', icon: 'hammer' },
    { label: 'Ship', desc: 'Release', icon: 'rocket' },
  ];
  const VARIANTS = [
    { say: 'No attributes', data: { title: 'Attributes', desc: 'Per data and per item', lists: base } },
    {
      say: "data.attributes: title and desc",
      data: {
        title: 'Attributes',
        desc: 'Per data and per item',
        attributes: { title: { fill: '#ff6bb5', 'font-size': 34 }, desc: { fill: '#ffd166' } },
        lists: base,
      },
    },
    {
      say: 'datum.attributes: the second item',
      data: {
        title: 'Attributes',
        desc: 'Per data and per item',
        lists: [
          base[0],
          { ...base[1], attributes: { label: { fill: '#ffd166' }, icon: { fill: '#ffd166' } } },
          base[2],
        ],
      },
    },
  ];

  stage.cycle(
    VARIANTS.map(({ say, data }) => ({
      say,
      run: () => {
        infographic.render({ template: 'list-row-horizontal-icon-arrow', theme: 'dark', data });
        if (code) code.textContent = JSON.stringify(data, null, 2);
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
