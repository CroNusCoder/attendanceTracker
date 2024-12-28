export type AttendanceStatus = 'present' | 'absent' | 'postponed';

export interface Class {
  id: string;
  subject: string;
  date: string;
  status: AttendanceStatus;
}

export interface SubjectStats {
  subject: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
}

export interface TimeTableClass {
  subject: string;
  type: 'LECTURE' | 'LAB' | 'TUTORIAL';
}

export interface DaySchedule {
  day: string;
  classes: TimeTableClass[];
}

export interface BranchPreset {
  id: string;
  name: string;
  timeTable: DaySchedule[];
}

export interface UserConfig {
  name: string;
  branchId: string;
}