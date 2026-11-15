// l7 example: setEnable
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "setEnable",
  summary:
    "Logging can be switched on and off after the scene starts; a layer built while it is off leaves an empty log. The docs spell the method serEnable; in the code it is setEnable.",
  section: "Debug",
  tags: ["setEnable", "getLog"],
  docs: ["repo/site/docs/api/debug/debugservice.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
