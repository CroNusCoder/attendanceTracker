import React from 'react';
import { TimeTableClass, AttendanceStatus, Class } from '../types';
import { Clock, BookOpen, GraduationCap } from 'lucide-react';

interface DayScheduleProps {
  day: string;
  classes: TimeTableClass[];
  markedClasses: Class[];
  onMarkAttendance: (subject: string, type: TimeTableClass['type'], status: AttendanceStatus) => void;
}

export function DaySchedule({ day, classes, markedClasses, onMarkAttendance }: DayScheduleProps) {
  const getTypeIcon = (type: TimeTableClass['type']) => {
    switch (type) {
      case 'LAB':
        return <Clock className="text-purple-600" />;
      case 'TUTORIAL':
        return <GraduationCap className="text-green-600" />;
      default:
        return <BookOpen className="text-blue-600" />;
    }
  };

  const isClassMarked = (subject: string, type: string) => {
    const today = new Date().toISOString().split('T')[0];
    return markedClasses.some(
      cls => cls.subject === `${subject} (${type})` && cls.date === today
    );
  };

  const getClassStatus = (subject: string, type: string) => {
    const today = new Date().toISOString().split('T')[0];
    return markedClasses.find(
      cls => cls.subject === `${subject} (${type})` && cls.date === today
    )?.status;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{day}'s Classes</h2>
      <div className="grid gap-4">
        {classes.map((cls, index) => {
          const marked = isClassMarked(cls.subject, cls.type);
          const status = getClassStatus(cls.subject, cls.type);

          return (
            <div
              key={`${cls.subject}-${cls.type}-${index}`}
              className={`bg-white rounded-lg shadow-md p-6 transition-all ${
                marked ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-50 rounded-full">
                    {getTypeIcon(cls.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{cls.subject}</h3>
                    <p className="text-sm text-gray-600">{cls.type}</p>
                    {marked && (
                      <p className={`text-sm mt-1 font-medium ${
                        status === 'present' ? 'text-green-600' :
                        status === 'absent' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                        Marked as {status}
                      </p>
                    )}
                  </div>
                </div>
                {!marked && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => onMarkAttendance(cls.subject, cls.type, 'present')}
                      className="px-4 py-2 text-sm font-medium rounded-md bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                    >
                      Present
                    </button>
                    <button
                      onClick={() => onMarkAttendance(cls.subject, cls.type, 'absent')}
                      className="px-4 py-2 text-sm font-medium rounded-md bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                    >
                      Absent
                    </button>
                    <button
                      onClick={() => onMarkAttendance(cls.subject, cls.type, 'postponed')}
                      className="px-4 py-2 text-sm font-medium rounded-md bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors"
                    >
                      Postponed
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}