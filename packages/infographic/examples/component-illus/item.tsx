/** @jsxImportSource @antv/infographic */
// A custom item made of an Illus and an ItemLabel
import { Group, Illus, ItemLabel, getItemProps, registerItem } from '@antv/infographic';
import type { BaseItemProps } from '@antv/infographic';

export const ITEM = 'showcase-component-illus';

interface IllusItemProps extends BaseItemProps {
  width?: number;
  height?: number;
  rx?: number;
}

const IllusItem = (props: IllusItemProps) => {
  const [{ indexes, datum, width = 120, height = 90, rx = 0, themeColors }, rest] = getItemProps(props, ['width', 'height', 'rx']);
  return (
    <Group {...rest}>
      <Illus indexes={indexes} width={width} height={height} rx={rx} />
      <ItemLabel indexes={indexes} width={width} y={height + 6} alignHorizontal="center" fill={themeColors.colorText}>
        {datum.label}
      </ItemLabel>
    </Group>
  );
};

registerItem(ITEM, { component: IllusItem as never, composites: ['illus', 'label'] });
