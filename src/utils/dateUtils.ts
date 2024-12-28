export const getCurrentDay = () => {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' });
};

export const getTodayISO = () => {
  return new Date().toISOString().split('T')[0];
};