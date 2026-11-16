// A custom property type: parse turns the string into data, stringify turns it back for the DOM
import { aframeExample } from '../../shared/frame.ts';
import { select } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent<{ myProperty: string[] }>('foo', {
      schema: {
        // Parse slash-delimited string to an array, stringify array back to a string.
        myProperty: {
          default: [],
          // A-Frame also runs parse over the default (an array), so pass non-strings through.
          parse: (value: string | string[]) => (typeof value === 'string' ? value.split('/') : value),
          stringify: (value: string[]) => value.join('/'),
        },
      },
      update() {
        this.el.setAttribute('text', { value: this.data.myProperty.join('\n'), align: 'center', width: 4, color: '#ffc65d' });
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="e" foo="myProperty: a/b" position="0 1.6 -3"></a-entity>
      ${board('board', '0 3.4 -4', 6, 1.4, 60)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const el = stage.scene.querySelector('#e') as Entity;
    const show = (): void => {
      el.components.foo!.flushToDOM();
      log.show(
        [
          `data.myProperty: ${JSON.stringify(el.getAttribute('foo').myProperty)}`,
          `after flushToDOM(), attribute text: foo="${el.getAttribute('foo').myProperty.join('/') && el.attributes.getNamedItem('foo')?.value}"`,
        ].join('\n'),
      );
    };
    show();
    const values = ['a/b', 'x/y/z', 'one/two/three/four'];
    if (stage.preview) {
      sway(stage);
      stage.every(1800, (i) => {
        el.setAttribute('foo', 'myProperty', values[i % 3]);
        show();
      });
    } else if (stage.bar) {
      select(stage.bar, 'myProperty', values, 'a/b', (v) => {
        el.setAttribute('foo', 'myProperty', v);
        show();
      });
    }
  },
});
