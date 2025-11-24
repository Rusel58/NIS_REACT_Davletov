import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import PetCard from '../components/PetCard/PetCard';
import type { Pet } from '../components/PetCard/types';
import EventLog from '../components/EventLog/EventLog';
import petsMock from '../data/pets.json';

const Dashboard: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [speciesFilter, setSpeciesFilter] = useState<string>('all');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);

    const timeoutId = window.setTimeout(() => {
      if (!isCancelled) {
        setPets(petsMock as Pet[]);
        setIsLoading(false);
      }
    }, 1000);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  const speciesOptions = useMemo(
    () => Array.from(new Set(pets.map((p) => p.species))),
    [pets],
  );

  const visiblePets = useMemo(() => {
    let result: Pet[] =
      speciesFilter === 'all'
        ? pets
        : pets.filter((p) => p.species === speciesFilter);

    if (showOnlyAvailable) {
      result = result.filter((p) => p.energy > 0);
    }

    return result;
  }, [pets, speciesFilter, showOnlyAvailable]);

  const handleSpeciesChange = (event: SelectChangeEvent<string>) => {
    setSpeciesFilter(event.target.value);
  };

  const handleResetFilters = () => {
    setSpeciesFilter('all');
    setShowOnlyAvailable(false);
  };

  return (
    <div className="app-root">
      <main className="dashboard-main">
        <header className="dashboard-header">
          <Typography variant="h4" component="h1">
            🐾 Cyber-Zoo 2077 Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Управляй настроением, энергией и уровнем своих кибер-питомцев.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
          >
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="species-filter-label">Species</InputLabel>
              <Select
                labelId="species-filter-label"
                value={speciesFilter}
                label="Species"
                onChange={handleSpeciesChange}
              >
                <MenuItem value="all">All species</MenuItem>
                {speciesOptions.map((sp) => (
                  <MenuItem key={sp} value={sp}>
                    {sp}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Stack direction="row" spacing={1}>
              {/* Кнопки фильтрации животных (Material UI) */}
              <Button
                variant={showOnlyAvailable ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setShowOnlyAvailable((prev) => !prev)}
              >
                {showOnlyAvailable ? 'Показывать всех' : 'Только доступные'}
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={handleResetFilters}
              >
                Сбросить фильтры
              </Button>
            </Stack>
          </Stack>
        </header>

        <Box className="pets-grid">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  height={220}
                  sx={{ borderRadius: '16px' }}
                />
              ))
            : visiblePets.map((pet) => <PetCard key={pet.id} pet={pet} />)}
        </Box>
      </main>

      <aside>
        <EventLog />
      </aside>
    </div>
  );
};

export default Dashboard;
