import React from 'react';
import { Calendar, Check, X, Clock } from 'lucide-react';
import { Class } from '../types';

interface ClassListProps {
  classes: Class[];
  onDeleteClass: (id: string) => void;
}

export function ClassList({ classes, onDeleteClass }: ClassListProps) {
  const getStatusIcon = (status: Class['status']) => {
    switch (status) {
      case 'present':
        return <Check className="text-green-600" />;
      case 'absent':
        return <X className="text-red-600" />;
      case 'postponed':
        return <Clock className="text-yellow-600" />;
    }
  };

  return (
    <div className="space-y-4">
      {classes.map((cls) => (
        <div key={cls.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="text-gray-600" />
              <div>
                <h3 className="font-medium">{cls.subject}</h3>
                <p className="text-sm text-gray-600">{cls.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {getStatusIcon(cls.status)}
              <button
                onClick={() => onDeleteClass(cls.id)}
                className="text-red-600 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}