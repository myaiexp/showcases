// gsap example: gsap.defaults and gsap.config
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "gsap.defaults and gsap.config",
  summary:
    "Inside an isolated page, gsap.defaults() sets a shared ease, duration and repeat while gsap.config() changes the default unit for left to percent. One row opts out with inherit:false.",
  section: "gsap methods",
  tags: ["gsap.defaults", "gsap.config", "units", "inherit"],
  docs: [
    "pages/gsap-com/docs/v3/GSAP/gsap-defaults-.md",
    "pages/gsap-com/docs/v3/GSAP/gsap-config-.md",
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
