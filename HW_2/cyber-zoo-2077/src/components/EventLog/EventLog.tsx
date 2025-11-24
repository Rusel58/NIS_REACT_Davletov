import React from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useEventLog } from '../../hooks/useEventLog';

export const EventLog: React.FC = () => {
  const { events, clearEvents } = useEventLog();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="h6">CyberZoo Events</Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={clearEvents}
          disabled={events.length === 0}
        >
          Clear
        </Button>
      </Stack>

      <List dense sx={{ overflowY: 'auto', flexGrow: 1 }}>
        {events.length === 0 && (
          <ListItem>
            <ListItemText primary="Пока событий нет — поиграй с питомцами 👾" />
          </ListItem>
        )}
        {events.map((event, index) => (
          <ListItem key={index}>
            <ListItemText primary={event} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default EventLog;
