// gsap example: Observer enable, disable and getAll
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Observer enable, disable and getAll',
  summary:
    'Three pads each have an Observer with an id and count the wheel, touch and pointer movement over them. Buttons call disable(), enable() and kill() on each, onEnable and onDisable redraw the state, and a readout shows what Observer.getAll() and getById() return afterwards.',
  section: 'Observer',
  tags: ['Observer', 'enable', 'disable', 'kill', 'getAll', 'getById', 'id', 'isEnabled', 'onEnable', 'onDisable'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/Observer/enable-.md',
    'pages/gsap-com/docs/v3/Plugins/Observer/disable-.md',
    'pages/gsap-com/docs/v3/Plugins/Observer/kill-.md',
    'pages/gsap-com/docs/v3/Plugins/Observer/isEnabled.md',
    'pages/gsap-com/docs/v3/Plugins/Observer/static-getAll-.md',
    'pages/gsap-com/docs/v3/Plugins/Observer/static-getById-.md',
    'pages/gsap-com/docs/v3/Plugins/Observer/static-create-.md',
    'pages/gsap-com/docs/v3/Plugins/Observer.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-context-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
