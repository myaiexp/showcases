// @property is added to the page so a custom property can animate smoothly
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 5 / 100% _2px;
    @property --turn {
      syntax: '<angle>';
      inherits: false;
      initial-value: 0deg;
    }
    background: conic-gradient(from var(--turn), #fff, #e6437d, #fff);
    border-radius: 50%;
    animation: spin @r(2s, 6s) linear infinite;
    
    @keyframes spin {
      to { --turn: 360deg; }
    }
  `,
  reroll: true,
});
