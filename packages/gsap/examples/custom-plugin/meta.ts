// gsap example: registerPlugin with a counter plugin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "registerPlugin with a counter plugin",
  summary:
    "A tiny plugin object with name, init and render is registered with gsap.registerPlugin(), and then a counterTo property tweens a number inside text. The panel shows the GSAP version.",
  section: "gsap methods",
  tags: ["registerPlugin", "plugin authoring", "gsap.version"],
  docs: [
    "pages/gsap-com/docs/v3/GSAP/gsap-registerPlugin-.md",
    "pages/gsap-com/docs/v3/GSAP/gsap-version.md",
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
