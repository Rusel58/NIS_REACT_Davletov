import { useContext } from 'react';
import { EventLogContext } from '../context/EventContext';

export const useEventLog = () => {
  const ctx = useContext(EventLogContext);

  if (!ctx) {
    throw new Error('useEventLog must be used within EventLogProvider');
  }

  return ctx;
};
