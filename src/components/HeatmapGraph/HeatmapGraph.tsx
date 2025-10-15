import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Box, Typography, Stack, Tooltip as MuiTooltip } from '@mui/material';
import 'react-calendar-heatmap/dist/styles.css';
import { type CommitSummaryResponse } from '../../services/commitService';

const currentYear = new Date().getFullYear();
const startOfYear = new Date(currentYear, 0, 0); // 1 Jan
const endOfYear = new Date(currentYear, 11, 31); // 31 Dec

const formatDateLocal = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const colorScale = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];

type HeatmapValue = { date: string; totalMinutes: number };

type HeatmapGraphProps = {
  commits: CommitSummaryResponse[];
  onDayClick?: (date: string) => void;
};

const getColor = (value: HeatmapValue | null) => {
  if (!value || value.totalMinutes === 0) return colorScale[0];
  const t = value.totalMinutes;
  if (t <= 60) return colorScale[1];
  if (t <= 120) return colorScale[2];
  if (t <= 240) return colorScale[3];
  return colorScale[4];
};

const HeatmapGraph: React.FC<HeatmapGraphProps> = ({ commits, onDayClick }) => {
  const buildHeatmapValues = (): HeatmapValue[] => {
    const values: HeatmapValue[] = [];
    const d = new Date(startOfYear);
    while (d <= endOfYear) {
      const dateStr = formatDateLocal(d);
      const found = commits.find(c => c.date === dateStr);
      values.push({ date: dateStr, totalMinutes: found ? found.duration : 0 });
      d.setDate(d.getDate() + 1);
    }
    return values;
  };

  const values = buildHeatmapValues();

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Box
        sx={{
          width: '95vw',
          maxWidth: 1200,
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 600,
            letterSpacing: '0.5px',
            mb: 4,
          }}
        >
          Commit Heatmap - {currentYear}
        </Typography>

        {/* Heatmap */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            overflowX: 'auto',
            '& .react-calendar-heatmap-weekday-label': { textAnchor: 'end', transform: 'translateX(10px)' },
            '& .react-calendar-heatmap-month-label': { transform: 'translateY(-3px)' },
          }}
        >
          <CalendarHeatmap
            startDate={startOfYear}
            endDate={endOfYear}
            values={values}
            gutterSize={2}
            rectSize={22}
            classForValue={() => ''}
            showWeekdayLabels
            showMonthLabels
            transformDayElement={(
              rect: React.ReactElement<React.SVGProps<SVGRectElement>>,
              value: HeatmapValue | null,
              index: number
            ) => (
              <MuiTooltip
                key={index}
                title={
                  value
                    ? `${new Date(value.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}: ${Math.floor(value.totalMinutes / 60)}h ${value.totalMinutes % 60}m`
                    : 'No commits'
                }
                arrow
                placement="top"
              >
                {React.cloneElement(rect, {
                  fill: getColor(value),
                  rx: 4,
                  ry: 4,
                  style: { cursor: 'pointer' },
                  onClick: () => onDayClick?.(value?.date || ''),
                })}
              </MuiTooltip>
            )}
          />
        </Box>

        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
          <Typography variant="body2" sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif' }}>
            Less
          </Typography>
          {colorScale.map((color, idx) => (
            <Box
              key={idx}
              sx={{
                width: 22,
                height: 22,
                bgcolor: color,
                borderRadius: 0.5,
                border: '1px solid #ccc',
              }}
            />
          ))}
          <Typography variant="body2" sx={{ fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif' }}>
            More
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default HeatmapGraph;
