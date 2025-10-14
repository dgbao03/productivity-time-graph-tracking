import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Box, Typography, Stack, Tooltip as MuiTooltip } from '@mui/material';
import 'react-calendar-heatmap/dist/styles.css';

// Năm hiện tại
const currentYear = new Date().getFullYear();
const startOfYear = new Date(currentYear, 0, 0); // 1 Jan
const endOfYear = new Date(currentYear, 11, 31); // 31 Dec

// Dữ liệu demo 0-4 commit/ngày (bao trọn 01/01 → 31/12, tránh lệch múi giờ)
const formatDateLocal = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const sampleValues: HeatmapValue[] = (() => {
  const values: HeatmapValue[] = [];
  const d = new Date(startOfYear);
  while (d <= endOfYear) {
    const count = Math.floor(Math.random() * 5);
    values.push({ date: formatDateLocal(d), count });
    d.setDate(d.getDate() + 1);
  }
  return values;
})();

// Màu GitHub-like
const colorScale = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];

type HeatmapValue = { date: string; count: number };

type HeatmapGraphProps = {
    onDayClick?: (date: string) => void; // thêm prop kiểu function
  };

const getColor = (value: HeatmapValue | null) => {
  if (!value) return colorScale[0];
  if (value.count === 0) return colorScale[0];
  if (value.count === 1) return colorScale[1];
  if (value.count === 2) return colorScale[2];
  if (value.count === 3) return colorScale[3];
  return colorScale[4];
};

const HeatmapGraph: React.FC<HeatmapGraphProps> = ({ onDayClick }) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        mt: 4,
      }}
    >
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
                mb: 4   
            }}
            >
            Commit Heatmap - {currentYear}
        </Typography>


        {/* Heatmap */}
        <Box sx={{ display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
          <CalendarHeatmap
            startDate={startOfYear}
            endDate={endOfYear}
            values={sampleValues}
            gutterSize={2} 
            rectSize={22}  
            classForValue={(_: HeatmapValue | null) => ''}
            showWeekdayLabels
            showMonthLabels
            transformDayElement={(
              rect: React.ReactElement<React.SVGProps<SVGRectElement>>,
              value: HeatmapValue | null,
              index: number,
            ) => (
              <MuiTooltip
                key={index}
                title={value ? `${value.date}: ${value.count} commit(s)` : 'No commits'}
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

        {/* Legend */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
          mt={3}
        >
          <Typography variant="body2">Less</Typography>
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
          <Typography variant="body2">More</Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default HeatmapGraph;
