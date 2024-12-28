import { BranchPreset } from '../types';

export const branchPresets: BranchPreset[] = [
  {
    id: 'ee-sec-b',
    name: 'Electrical Engineering SEC B',
    timeTable: [
      {
        day: 'Monday',
        classes: [
          { subject: 'CY1021', type: 'LECTURE' },
          { subject: 'CS2101', type: 'LECTURE' },
          { subject: 'EE1031', type: 'LECTURE' },
          { subject: 'EE1021', type: 'LECTURE' },
          { subject: 'CS2102', type: 'LAB' }
        ]
      },
      {
        day: 'Tuesday',
        classes: [
          { subject: 'CS2101', type: 'LECTURE' },
          { subject: 'EE1031', type: 'LECTURE' },
          { subject: 'CS2101', type: 'TUTORIAL' },
          { subject: 'MA1021', type: 'LECTURE' },
          { subject: 'EE1021', type: 'TUTORIAL' }
        ]
      },
      {
        day: 'Wednesday',
        classes: [
          { subject: 'EE1021', type: 'LECTURE' },
          { subject: 'EE1031', type: 'LECTURE' },
          { subject: 'HS1011', type: 'LECTURE' },
          { subject: 'CY1021', type: 'LECTURE' },
          { subject: 'ME1072', type: 'LAB' }
        ]
      },
      {
        day: 'Thursday',
        classes: [
          { subject: 'HS1011', type: 'LECTURE' },
          { subject: 'EE1021', type: 'LECTURE' },
          { subject: 'MA1021', type: 'LECTURE' },
          { subject: 'EE1031', type: 'TUTORIAL' }
        ]
      },
      {
        day: 'Friday',
        classes: [
          { subject: 'MA1021', type: 'LECTURE' },
          { subject: 'CY1021', type: 'LECTURE' },
          { subject: 'CS2101', type: 'LECTURE' },
          { subject: 'MA1021', type: 'TUTORIAL' }
        ]
      }
    ]
  }
];