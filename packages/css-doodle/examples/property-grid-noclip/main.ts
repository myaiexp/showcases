// the noclip flag lets cells overflow the component
import { simple } from '../../shared/a-kit.ts';

export default simple({
  doodles: [
    { label: "noclip", code: `
      @grid: 1 / 100% ß1 noclip;
      @size: 2em;
      margin: -1em 0 0 -1em;
      background: #e6437dcc;
      animation: drift 3s ease-in-out infinite alternate;
      @keyframes drift {
        to { translate: 6em 0 }
      }
      :doodle {
        scale: .85;
      }
    ` },
    { label: "default", code: `
      @grid: 1 / 100% ß1 ;
      @size: 2em;
      margin: -1em 0 0 -1em;
      background: #e6437dcc;
      animation: drift 3s ease-in-out infinite alternate;
      @keyframes drift {
        to { translate: 6em 0 }
      }
      :doodle {
        scale: .85;
      }
    ` },
  ],
});
