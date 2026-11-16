// Switching text.font and listening for textfontset
import { q } from '../../shared/comp-dom.ts';
import { select } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { logger } from '../../shared/comp-log.ts';

const fonts = ['roboto', 'aileronsemibold', 'dejavu', 'exo2bold', 'exo2semibold', 'kelsonsans', 'monoid', 'mozillavr', 'sourcecodepro'] as const;

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity id="t" position="0 1.8 -3" text="value: Hamburgefonstiv\\n0123456789; font: roboto; width: 5; align: center; color: #ffffff"></a-entity>
    </a-scene>`,
  run(stage) {
    const t = q(stage, '#t');
    const log = logger(stage, 4);
    t.addEventListener('textfontset', () => log(`textfontset: font is now ${t.getAttribute('text').font}`));
    const set = (font: string): void => t.setAttribute('text', 'font', font);
    if (stage.bar) select(stage.bar, 'font', fonts, 'roboto', set);
    if (stage.preview) stage.every(1500, (i) => set(fonts[i % fonts.length]!));
  },
});
