// Writing an addon: a shader function registered with CSSDoodle.use()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Writing a shader addon',
  summary:
    'CSSDoodle.use(name, { shader }) makes @name() an image drawn with WebGL, like @pattern: shader(text, api) returns fragment shader code, and css-doodle supplies u_resolution, u_time and FragColor and animates it when it reads u_time. The api\'s color() turns a CSS colour into channels, split() cuts the arguments and expr() turns math into GLSL. Four cells call it with their own colour and speed.',
  section: 'Addons',
  tags: ['CSSDoodle.use()', 'shader', 'GLSL', 'u_time', 'addons'],
  docs: ['pages/github-com/css-doodle/addons/blob/v1-1-0/README-md.md', 'pages/css-doodle-com/reference/function-shaders.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
