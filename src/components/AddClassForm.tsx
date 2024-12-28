import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { AttendanceStatus, Class } from '../types';

interface AddClassFormProps {
  onAddClass: (newClass: Class) => void;
}

export function AddClassForm({ onAddClass }: AddClassFormProps) {
  const [subject, setSubject] = useState('');
  const [status, setStatus] = useState<AttendanceStatus>('present');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    const newClass: Class = {
      id: Date.now().toString(),
      subject: subject.trim(),
      date: new Date().toISOString().split('T')[0],
      status,
    };

    onAddClass(newClass);
    setSubject('');
    setStatus('present');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter subject name"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Attendance Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as AttendanceStatus)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="postponed">Postponed</option>
          </select>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle size={20} />
          Add Class
        </button>
      </div>
    </form>
  );
}