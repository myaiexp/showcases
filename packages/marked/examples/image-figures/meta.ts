// marked example: Images as figures
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Images as figures",
  summary:
    "A photo album where each picture gets a frame and a caption taken from its title, next to the plain pictures. It overrides renderer.image, which receives the address, the title and the alt text.",
  section: "Renderer",
  tags: ["renderer", "image", "figure", "figcaption"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts", "repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
