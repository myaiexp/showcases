// Two scores that spring to their new values: springValue(number) plus set(), written to the page from on('change')
import { delay, scopeMotion, springValue } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const TEAMS = ['home', 'away'] as const;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="board${preview ? '' : ' big'}">
      ${TEAMS.map((t, i) => `${i ? '<div class="dash">-</div>' : ''}<div><div class="team">${t}</div><div class="score" data-team="${t}">0</div></div>`).join('')}
    </div>`;
  const targets = { home: 0, away: 0 };
  let stiffness = 180;
  let damping = 12;
  let springs: Array<ReturnType<typeof springValue<number>>> = [];
  let unsubs: VoidFunction[] = [];
  let p: ReturnType<typeof panel> | undefined;

  const scope = scopeMotion(el, () => {
    const build = (): void => {
      unsubs.forEach((u) => u());
      springs.forEach((s) => s.destroy());
      springs = TEAMS.map((t) => {
        // Rebuilt with the shown score as its start, so changing options mid-game keeps the digits.
        const shown = Number(el.querySelector(`[data-team="${t}"]`)!.textContent);
        const s = springValue(shown, { stiffness, damping });
        s.set(targets[t]);
        return s;
      });
      unsubs = springs.map((s, i) => s.on('change', (v) => { el.querySelector(`[data-team="${TEAMS[i]}"]`)!.textContent = String(Math.round(v)); }));
    };
    build();
    const score = (team: (typeof TEAMS)[number], points: number): void => {
      targets[team] += points;
      springs[TEAMS.indexOf(team)]!.set(targets[team]);
    };

    if (preview) {
      const play = (): void => {
        score(Math.random() < 0.5 ? 'home' : 'away', [2, 3, 3, 7][Math.floor(Math.random() * 4)]!);
        if (targets.home + targets.away > 60) { targets.home = 0; targets.away = 0; springs.forEach((s) => s.set(0)); }
        delay(play, 1.3);
      };
      delay(play, 0.6);
    } else {
      hint(el, 'Score some points. The number is a spring, so it overshoots and settles; bigger jumps swing further. Soften it with lower stiffness or more damping.');
      p = panel(el);
      for (const t of TEAMS) {
        p.button(`${t} +1`, () => score(t, 1));
        p.button(`${t} +7`, () => score(t, 7));
      }
      p.button('Reset', () => { targets.home = 0; targets.away = 0; springs.forEach((s) => s.set(0)); });
      p.slider('stiffness', { min: 20, max: 600, step: 10, value: stiffness }, (v) => { stiffness = v; build(); });
      p.slider('damping', { min: 2, max: 40, step: 1, value: damping }, (v) => { damping = v; build(); });
    }
  });
  return () => { scope.cancel(); unsubs.forEach((u) => u()); springs.forEach((s) => s.destroy()); p?.dispose(); };
};

export default mount;
