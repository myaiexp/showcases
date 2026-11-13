// gsap example: getById, exportRoot and globalTimeline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "getById, exportRoot and globalTimeline",
  summary:
    "In an isolated page, gsap.exportRoot() wraps every running animation so it can be frozen with timeScale while a tween made afterwards keeps playing. gsap.getById() finds a tween by id and gsap.globalTimeline slows everything.",
  section: "gsap methods",
  tags: ["getById", "exportRoot", "globalTimeline", "timeScale"],
  docs: [
    "pages/gsap-com/docs/v3/GSAP/gsap-getById-.md",
    "pages/gsap-com/docs/v3/GSAP/gsap-exportRoot-.md",
    "pages/gsap-com/docs/v3/GSAP/gsap-globalTimeline.md",
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
