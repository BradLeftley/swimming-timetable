import { Progress } from '@chakra-ui/react';

const calculatePercentage = (total, available) => {
  return (available / total) * 100;
};

const getColorScheme = percentage => {
  if (percentage >= 90) {
    return 'red';
  } else if (percentage >= 50) {
    return 'yellow';
  } else {
    return 'green';
  }
};

const AvailabilityIndicator = ({ total, available }) => {
  const percentage = calculatePercentage(48, 48 - available);
  const colorScheme = getColorScheme(percentage);

  return (
    <Progress
      value={percentage}
      colorScheme={colorScheme}
      size="sm"
      isAnimated
      aria-label={`Available: ${available} / Total: ${total}`}
    />
  );
};

export default AvailabilityIndicator;
