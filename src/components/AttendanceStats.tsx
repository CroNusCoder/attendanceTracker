import React from 'react';
import { PieChart, GraduationCap } from 'lucide-react';
import { SubjectStats } from '../types';

interface AttendanceStatsProps {
  stats: SubjectStats[];
}

export function AttendanceStats({ stats }: AttendanceStatsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <PieChart className="text-blue-600" />
        <h2 className="text-xl font-semibold">Attendance Statistics</h2>
      </div>
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.subject} className="border-b pb-4">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="text-gray-600" />
              <h3 className="font-medium">{stat.subject}</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Total Classes</p>
                <p className="font-semibold">{stat.totalClasses}</p>
              </div>
              <div>
                <p className="text-gray-600">Attended</p>
                <p className="font-semibold">{stat.attendedClasses}</p>
              </div>
              <div>
                <p className="text-gray-600">Percentage</p>
                <p className={`font-semibold ${stat.percentage < 75 ? 'text-red-600' : 'text-green-600'}`}>
                  {stat.percentage.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}