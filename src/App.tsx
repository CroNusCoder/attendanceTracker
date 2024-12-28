import React from 'react';
import { Class, UserConfig, AttendanceStatus } from './types';
import { UserOnboarding } from './components/UserOnboarding';
import { DaySchedule } from './components/DaySchedule';
import { AttendanceStats } from './components/AttendanceStats';
import { AddClassForm } from './components/AddClassForm';
import { branchPresets } from './data/branchPresets';
import { PieChart, CalendarPlus } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getCurrentDay, getTodayISO } from './utils/dateUtils';
import { calculateStats } from './utils/statsUtils';

export default function App() {
  const [userConfig, setUserConfig] = useLocalStorage<UserConfig | null>('user-config', null);
  const [classes, setClasses] = useLocalStorage<Class[]>('attendance-classes', []);
  const [showStats, setShowStats] = useLocalStorage<boolean>('show-stats', false);
  const [showAddClass, setShowAddClass] = useLocalStorage<boolean>('show-add-class', false);

  if (!userConfig) {
    return <UserOnboarding onComplete={setUserConfig} />;
  }

  const branchPreset = branchPresets.find(preset => preset.id === userConfig.branchId)!;
  const currentDay = getCurrentDay();
  const todaySchedule = branchPreset.timeTable.find(schedule => schedule.day === currentDay);

  const getTodayClasses = () => {
    const today = getTodayISO();
    return classes.filter(cls => cls.date === today);
  };

  const handleMarkAttendance = (subject: string, type: string, status: AttendanceStatus) => {
    const newClass: Class = {
      id: Date.now().toString(),
      subject: `${subject} (${type})`,
      date: getTodayISO(),
      status,
    };
    setClasses(prev => [newClass, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm mb-8">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{userConfig.name}</h1>
              <p className="text-gray-600">{branchPreset.name}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddClass(!showAddClass)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 border-2 border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                <CalendarPlus size={20} />
                Add Extra Class
              </button>
              <button
                onClick={() => setShowStats(!showStats)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <PieChart size={20} />
                Statistics
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {showStats ? (
          <AttendanceStats stats={calculateStats(classes)} />
        ) : showAddClass ? (
          <AddClassForm onAddClass={(newClass) => {
            setClasses(prev => [newClass, ...prev]);
            setShowAddClass(false);
          }} />
        ) : todaySchedule ? (
          <DaySchedule
            day={currentDay}
            classes={todaySchedule.classes}
            markedClasses={getTodayClasses()}
            onMarkAttendance={handleMarkAttendance}
          />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-800">No Classes Today</h2>
            <p className="text-gray-600 mt-2">Enjoy your day off!</p>
          </div>
        )}
      </main>
    </div>
  );
}