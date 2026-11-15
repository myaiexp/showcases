// l7 example: setEnableRender and render
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "setEnableRender and render",
  summary:
    "setEnableRender(false) stops the scene from drawing, so the pulsing waves freeze mid-frame; true resumes them. render() asks for one frame by hand.",
  section: 'Scene',
  tags: ["setEnableRender", "render", "animate"],
  docs: ["repo/site/docs/api/scene.en.md", "repo/site/docs/api/point_layer/animate.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
