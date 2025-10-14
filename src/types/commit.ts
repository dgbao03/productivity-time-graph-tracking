export type Commit = {
  date: string;        // 'YYYY-MM-DD'
  message: string;
  hours: number;       // thời gian đã dành ra
  minutes: number;     // thời gian đã dành ra
  time?: string;       // 'HH:MM' - thời điểm commit thực tế
};
