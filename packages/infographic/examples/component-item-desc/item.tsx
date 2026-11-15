/** @jsxImportSource @antv/infographic */
// A custom item made of an ItemLabel and an ItemDesc
import { Group, ItemDesc, ItemLabel, getElementBounds, getItemProps, registerItem } from '@antv/infographic';
import type { BaseItemProps } from '@antv/infographic';

export const ITEM = 'showcase-component-item-desc';

interface DescItemProps extends BaseItemProps {
  width?: number;
  lineNumber?: number;
}

const DescItem = (props: DescItemProps) => {
  const [{ indexes, datum, width = 180, lineNumber, themeColors }, rest] = getItemProps(props, ['width', 'lineNumber']);
  const label = (
    <ItemLabel indexes={indexes} width={width} alignHorizontal="left" fill={themeColors.colorText}>
      {datum.label}
    </ItemLabel>
  );
  const labelHeight = getElementBounds(label).height;
  return (
    <Group {...rest}>
      {label}
      <ItemDesc indexes={indexes} width={width} y={labelHeight + 4} lineNumber={lineNumber} alignHorizontal="left" fill={themeColors.colorTextSecondary}>
        {datum.desc}
      </ItemDesc>
    </Group>
  );
};

registerItem(ITEM, { component: DescItem as never, composites: ['label', 'desc'] });
