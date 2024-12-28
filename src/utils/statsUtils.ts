import { Class } from '../types';

export const calculateStats = (classes: Class[]) => {
  const subjectMap = new Map<string, { total: number; attended: number }>();

  classes.forEach((cls) => {
    if (!subjectMap.has(cls.subject)) {
      subjectMap.set(cls.subject, { total: 0, attended: 0 });
    }

    const stats = subjectMap.get(cls.subject)!;
    if (cls.status !== 'postponed') {
      stats.total++;
      if (cls.status === 'present') {
        stats.attended++;
      }
    }
  });

  return Array.from(subjectMap.entries()).map(([subject, stats]) => ({
    subject,
    totalClasses: stats.total,
    attendedClasses: stats.attended,
    percentage: (stats.attended / stats.total) * 100 || 0,
  }));
};