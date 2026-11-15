// Everything about where a title goes and how it reads
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 340,
  height: 150,
  padding: 8,
  signals: [
    { name: 'anchor', value: 'middle' },
    { name: 'angle', value: 0 },
    { name: 'pad', value: 6 },
    { name: 'tx', value: null },
    { name: 'ty', value: null },
    { name: 'lim', value: 300 },
  ],
  scales: [
    { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
    { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
  ],
  axes: [
    {
      orient: 'bottom',
      scale: 'x',
      title: 'Horizontal title that is rather long',
      titleAnchor: { signal: 'anchor' },
      titlePadding: { signal: 'pad' },
      titleX: { signal: 'tx' },
      titleY: { signal: 'ty' },
      titleLimit: { signal: 'lim' },
      titleColor: 'orange',
      titleFontSize: 13,
      titleFontStyle: 'italic',
    },
    {
      orient: 'left',
      scale: 'y',
      title: ['Two-line', 'vertical title'],
      titleAngle: { signal: 'angle' },
      titleAnchor: { signal: 'anchor' },
      titleAlign: 'center',
      titleLineHeight: 14,
      titleFontWeight: 'bold',
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { anchor: 'middle', angle: 0, pad: 6, tx: null, ty: null, lim: 300 },
      { anchor: 'start', angle: -90, pad: 6, tx: null, ty: null, lim: 300 },
      { anchor: 'end', angle: 0, pad: 20, tx: null, ty: null, lim: 300 },
      { anchor: 'middle', angle: 90, pad: 6, tx: 60, ty: 40, lim: 300 },
      { anchor: 'start', angle: -90, pad: 6, tx: null, ty: null, lim: 120 },
    ],
    1500,
  );
});
