// import { Player } from '@app/features/rpg/model/player';
// import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

// type PlayerState = {
//   player: Player;
//   isLoading: boolean;
//   //filter: { query: string; order: 'asc' | 'desc' };
// };

// const initialState: PlayerState = {
//   player: {
//     hp: 100,
//     maxHp: 100,
//     mp: 100,
//     maxMp: 100,
//     level: 1,
//     experience: 0,
//     maxExperience: 10
//   },
//   isLoading: false,
//   //filter: { query: '', order: 'asc' },
// };

// export const PlayerStore = signalStore(
//   withState(initialState),
//   withMethods((store) => ({
//     damage(amount: number) {
//       // const currentPlayer = store().player;
//       // store().player = {
//       //   ...currentPlayer,
//       //   hp: Math.max(currentPlayer.hp - amount, 0)
//       // };
//       patchState(store, (state) => ({
//         player: { ...state.player, hp: Math.max(state.player.hp - amount, 0) }
//       }));
//     },
//     heal(amount: number) {
//       // const currentPlayer = store().player;
//       // store().player = {
//       //   ...currentPlayer,
//       //   hp: Math.min(currentPlayer.hp + amount, currentPlayer.maxHp)
//       // };
//       patchState(store, (state) => ({
//         player: { ...state.player, hp: Math.min(state.player.hp + amount, state.player.maxHp) }
//       }));
//     }
//   }))
// );
