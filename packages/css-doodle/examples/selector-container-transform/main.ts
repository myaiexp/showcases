// :container transforms the grid or switches it to flexbox
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "rotate + scale", code: `
      @grid: 8 / 100%;
      
      :container {
        transform: rotate(45deg) scale(1.5);
        gap: 5px;
      }
      
      border: 1px solid #e6437d;
    ` },
    { label: "flex", code: `
      @grid: 4 / 100% _4px;
      
      :container {
        display: flex;
      }
      
      background: #e6437d;
      flex: @iI;
    ` },
  ],
});
