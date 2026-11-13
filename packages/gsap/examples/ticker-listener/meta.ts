// gsap example: gsap.ticker listeners and deltaRatio for frame-rate independent motion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ticker listener and deltaRatio',
  summary:
    'Two balls are moved by a gsap.ticker.add() listener: one by a fixed step per tick, one scaled with deltaRatio(60). A readout shows time, frame and deltaTime, and a button adds a once-only listener.',
  section: 'gsap methods',
  tags: ['ticker', 'add', 'remove', 'deltaRatio', 'quickSetter'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/gsap-ticker.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-quickSetter-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
