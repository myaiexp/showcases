// Themes 300 to 302 (Terminal) do more than recolour.
// They upper-case labels, use a monospaced font and square corners,
// fill containers with dots and double the outermost border.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { layout: "elk" },
    variants: [
      {
        label: 'themeID 300 (Terminal)',
        code: `direction: right
network: {
  tower: {
    satellites: {shape: stored_data; style.multiple: true}
    transmitter
    satellites -> transmitter: send
  }
  portal: {ui: {shape: hexagon}}
}
user: {shape: person}
user -> network.tower: call
user -> network.portal.ui: access {style.stroke-dash: 3}
`,
        options: { themeID: 300 },
      },
      {
        label: 'themeID 301 (Terminal Grayscale)',
        code: `direction: right
network: {
  tower: {
    satellites: {shape: stored_data; style.multiple: true}
    transmitter
    satellites -> transmitter: send
  }
  portal: {ui: {shape: hexagon}}
}
user: {shape: person}
user -> network.tower: call
user -> network.portal.ui: access {style.stroke-dash: 3}
`,
        options: { themeID: 301 },
      },
      {
        label: 'themeID 302 (Origami)',
        code: `direction: right
network: {
  tower: {
    satellites: {shape: stored_data; style.multiple: true}
    transmitter
    satellites -> transmitter: send
  }
  portal: {ui: {shape: hexagon}}
}
user: {shape: person}
user -> network.tower: call
user -> network.portal.ui: access {style.stroke-dash: 3}
`,
        options: { themeID: 302 },
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
