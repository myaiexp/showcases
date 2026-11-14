// A custom property on :doodle(:hover) moves cells; cards fake the hover
import type { Mount } from '@/types.ts';
import { simple } from '../../shared/a-kit.ts';

const mount: Mount = simple({
  hint: 'Hover the doodle.',
  code: `
    :doodle {
      @grid: 5 / 100%;
      --s: 0;
      gap: 1px;
    }
    :doodle(:hover) {
      --s: 1;
    }

    --offset: calc(var(--s) * 100%);
    transform: translateY(var(--offset));
    transition: .5s cubic-bezier(.175, .885, .32, 1.275);
    transition-delay: @r(500ms);
    background: #e6437d;

    @cell(i < 8) {
      @content: @pn([hoverme]);
      color: #fff;
    }
  `,
  setup(stage, [doodle]) {
    if (!stage.preview) return;
    // No pointer in a card: set --s on the element, which is what :hover does.
    let on = false;
    stage.every(1800, () => {
      on = !on;
      doodle!.style.setProperty('--s', on ? '1' : '0');
    });
    stage.say('A card sets --s itself, where the full view uses :hover');
  },
});

export default mount;
