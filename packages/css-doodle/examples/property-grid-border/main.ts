// the ß modifier and border flag of @grid draw a border on the component
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "ß8", code: `
      @grid: 1 / 100% ß8;
    ` },
    { label: "ß 1em", code: `
      @grid: 1 / 100% ß 1em;
    ` },
    { label: "ß red", code: `
      @grid: 1 / 100% ß red;
    ` },
    { label: "ß 8px dashed", code: `
      @grid: 1 / 100% ß 8px dashed #e6437d;
    ` },
    { label: "border", code: `
      @grid: 4 / 100% border;
      border-right: 1px solid;
    ` },
    { label: "border:#e6437d", code: `
      @grid: 4 / 100% border:#e6437d;
      border-right: 1px solid #e6437d;
    ` },
  ],
});
