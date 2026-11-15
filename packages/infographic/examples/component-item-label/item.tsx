/** @jsxImportSource @antv/infographic */
// A custom item made of one ItemLabel
import { ItemLabel, getItemProps, registerItem } from '@antv/infographic';
import type { BaseItemProps } from '@antv/infographic';

export const ITEM = 'showcase-component-item-label';

interface LabelItemProps extends BaseItemProps {
  width?: number;
  fontSize?: number;
  fill?: string;
  alignHorizontal?: 'left' | 'center' | 'right';
}

const LabelItem = (props: LabelItemProps) => {
  const [{ indexes, datum, width = 160, fontSize = 18, fill, alignHorizontal = 'center', themeColors }, rest] = getItemProps(props, [
    'width',
    'fontSize',
    'fill',
    'alignHorizontal',
  ]);
  return (
    <ItemLabel {...rest} indexes={indexes} width={width} fontSize={fontSize} fill={fill ?? themeColors.colorText} alignHorizontal={alignHorizontal}>
      {datum.label}
    </ItemLabel>
  );
};

registerItem(ITEM, { component: LabelItem as never, composites: ['label'] });
