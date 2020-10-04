import React, {FC} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {switchDataLabels} from '../constants/data-labels';
import ChartType from '../enum/chart';

type Props = {
  chartType: ChartType;
  onPress: () => void;
  isActive?: boolean;
};

const SwitchItem: FC<Props> = ({chartType, onPress, isActive}) => {
  const {text, color} = switchDataLabels[chartType];
  const borderStyles = isActive
    ? {borderBottomColor: color, borderBottomWidth: 2}
    : undefined;
  return (
    <TouchableOpacity onPress={onPress} style={borderStyles}>
      <Text style={{color, fontSize: 20}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SwitchItem;
