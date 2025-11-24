import { useCallback, useEffect, useReducer } from 'react';
import type { Pet, Mood } from '../components/PetCard/types';
import { useEventLog } from './useEventLog';

interface PetLifecycleState {
  pet: Pet;
  initialPet: Pet;
  isDisabled: boolean;
}

type PetReducerAction =
  | { type: 'FEED' }
  | { type: 'LEVEL_UP' }
  | { type: 'CHEER' }
  | { type: 'RESET' }
  | { type: 'TICK' };

const MAX_ENERGY = 100;
const FEED_DELTA = 15;
const TICK_DELTA = 5;

const deriveMood = (energy: number): Mood => {
  if (energy <= 0) return 'offline';
  if (energy <= 20) return 'sad';
  if (energy < 60) return 'neutral';
  return 'happy';
};

const createInitialState = (pet: Pet): PetLifecycleState => ({
  pet,
  initialPet: { ...pet },
  isDisabled: pet.energy <= 0,
});

const petReducer = (
  state: PetLifecycleState,
  action: PetReducerAction,
): PetLifecycleState => {
  switch (action.type) {
    case 'FEED': {
      if (state.isDisabled) return state;
      const newEnergy = Math.min(MAX_ENERGY, state.pet.energy + FEED_DELTA);
      const updatedPet: Pet = {
        ...state.pet,
        energy: newEnergy,
        mood: deriveMood(newEnergy),
      };
      return {
        ...state,
        pet: updatedPet,
        isDisabled: newEnergy <= 0,
      };
    }

    case 'LEVEL_UP': {
      if (state.isDisabled) return state;
      const updatedPet: Pet = {
        ...state.pet,
        level: state.pet.level + 1,
      };
      return {
        ...state,
        pet: updatedPet,
      };
    }

    case 'CHEER': {
      if (state.isDisabled) return state;
      const updatedPet: Pet = {
        ...state.pet,
        mood: 'happy',
      };
      return {
        ...state,
        pet: updatedPet,
      };
    }

    case 'RESET': {
      const resetPet: Pet = {
        ...state.initialPet,
        mood: deriveMood(state.initialPet.energy),
      };
      return {
        pet: resetPet,
        initialPet: { ...state.initialPet },
        isDisabled: resetPet.energy <= 0,
      };
    }

    case 'TICK': {
      if (state.isDisabled) return state;
      const newEnergy = Math.max(0, state.pet.energy - TICK_DELTA);
      const updatedPet: Pet = {
        ...state.pet,
        energy: newEnergy,
        mood: deriveMood(newEnergy),
      };
      return {
        ...state,
        pet: updatedPet,
        isDisabled: newEnergy <= 0,
      };
    }

    default:
      return state;
  }
};

interface UsePetLifecycleResult {
  pet: Pet;
  isDisabled: boolean;
  feed: () => void;
  levelUp: () => void;
  cheer: () => void;
  reset: () => void;
}

export const usePetLifecycle = (
  initialPet: Pet,
  tickMs = 4000,
): UsePetLifecycleResult => {
  const { addEvent } = useEventLog();

  const [state, dispatch] = useReducer(
    petReducer,
    initialPet,
    createInitialState,
  );

  // Таймер энергии (useEffect + setInterval)
  useEffect(() => {
    const id = window.setInterval(() => {
      dispatch({ type: 'TICK' });
    }, tickMs);

    return () => window.clearInterval(id);
  }, [tickMs]);

  // Логируем, когда питомец "умирает" по энергии
  useEffect(() => {
    if (state.pet.energy === 0) {
      addEvent(`💤 ${state.pet.name} исчерпал энергию и недоступен.`);
    }
  }, [state.pet.energy, state.pet.name, addEvent]);

  const feed = useCallback(() => {
    if (state.isDisabled) return;
    dispatch({ type: 'FEED' });
    addEvent(`🍖 Покормили ${state.pet.name}`);
  }, [addEvent, state.pet.name, state.isDisabled]);

  const levelUp = useCallback(() => {
    if (state.isDisabled) return;
    dispatch({ type: 'LEVEL_UP' });
    addEvent(`🚀 ${state.pet.name} получил новый уровень!`);
  }, [addEvent, state.pet.name, state.isDisabled]);

  const cheer = useCallback(() => {
    if (state.isDisabled) return;
    dispatch({ type: 'CHEER' });
    addEvent(`✨ Вы приободрили ${state.pet.name}`);
  }, [addEvent, state.pet.name, state.isDisabled]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    addEvent(`🔁 Сбросили состояние ${state.pet.name}`);
  }, [addEvent, state.pet.name]);

  return {
    pet: state.pet,
    isDisabled: state.isDisabled,
    feed,
    levelUp,
    cheer,
    reset,
  };
};
