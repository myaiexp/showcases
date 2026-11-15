// the p3d flag keeps a rotating ring of cells in three dimensions
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 12x1 / 100% p3d;
    :container {
      rotate: y @t(*.05deg);
    }
    @place: center;
    @size: 80%;
    border: 2px solid #e6437d;
    border-radius: 50%;
    background: #fff2;
    rotate: y @iI(*360deg);
  `,
});
