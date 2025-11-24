import type { CSSProperties } from 'react';
import { memo, useEffect, useRef } from 'react';
import styles from './PetCard.module.scss';
import type { Pet } from './types';
import { ActionButton } from '../PetActions/ActionButton.styled';
import { usePetLifecycle } from '../../hooks/usePetLifecycle';

interface PetCardProps {
  pet: Pet;
}

const PetCardComponent: React.FC<PetCardProps> = ({ pet }) => {
  const { pet: statePet, isDisabled, feed, levelUp, cheer, reset } =
    usePetLifecycle(pet);

  const avatarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = avatarRef.current;
    if (!node) return;

    node.classList.add(styles.pulse);
    const timeoutId = window.setTimeout(() => {
      node.classList.remove(styles.pulse);
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [statePet.mood]);

  const moodShadowStyle: CSSProperties = {
    boxShadow:
      statePet.mood === 'happy'
        ? '0 0 12px rgba(76, 175, 80, 0.7)'
        : statePet.mood === 'sad'
          ? '0 0 12px rgba(244, 67, 54, 0.7)'
          : '0 0 8px rgba(148, 163, 184, 0.6)',
    transition: 'box-shadow 0.3s ease',
  };

  return (
    <div
      className={`${styles.card} ${isDisabled ? styles.disabled : ''}`}
      style={moodShadowStyle}
    >
      <div className={styles.avatarWrapper} ref={avatarRef}>
        <img src={statePet.avatar} alt={statePet.name} className={styles.avatar} />
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{statePet.name}</h3>
        <p className={styles.species}>{statePet.species}</p>
        <p className={styles.stat}>
          <span>Mood:</span>
          <span className={styles.moodBadge}>{statePet.mood}</span>
        </p>
        <p className={styles.stat}>
          <span>Energy:</span>
          <span>{statePet.energy}</span>
        </p>
        <p className={styles.stat}>
          <span>Level:</span>
          <span>{statePet.level}</span>
        </p>
      </div>

      <div className={styles.actions}>
        <ActionButton variant="primary" onClick={feed} disabled={isDisabled}>
          Feed
        </ActionButton>
        <ActionButton variant="primary" onClick={cheer} disabled={isDisabled}>
          Cheer
        </ActionButton>
        <ActionButton variant="secondary" onClick={levelUp} disabled={isDisabled}>
          Level Up
        </ActionButton>
        <ActionButton variant="danger" onClick={reset}>
          Reset
        </ActionButton>
      </div>
    </div>
  );
};

export const PetCard = memo(PetCardComponent);

export default PetCard;
