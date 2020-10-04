const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const formatDate = (date: string) => {
  const day = new Date(date);
  return String(`${day.getDate()} ${monthNames[day.getMonth()]}`);
};

export default formatDate;
