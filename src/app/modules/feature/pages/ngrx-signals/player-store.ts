import { Player } from '@app/features/rpg/model/player';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

type PlayerState = {
  player: Player;
  isLoading: boolean;
};

const initialState: PlayerState = {
  player: {
    hp: 100,
    maxHp: 100,
    mp: 100,
    maxMp: 100,
    level: 1,
    experience: 0,
    maxExperience: 10
  },
  isLoading: false,
};

export const PlayerStore = signalStore(
  { providedIn: 'root' },           // global singleton, so all injected instances share the same state
  withState(initialState),
  withComputed(({ player }) => ({
    isAlive: () => player().hp > 0
  })),
  withMethods((store) => ({
    damage(amount: number) {
      patchState(store, (state) => ({
        player: { ...state.player, hp: Math.max(state.player.hp - amount, 0) }
      }));
    },
    heal(amount: number) {
      patchState(store, (state) => ({
        player: { ...state.player, hp: Math.min(state.player.hp + amount, state.player.maxHp) }
      }));
    }
  }))
);
