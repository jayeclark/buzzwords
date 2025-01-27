import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Move } from "buzzwords-shared/Game";
import HexGrid from "buzzwords-shared/hexgrid";
import { QRCoord } from "../hexGrid/hexGrid";
import { GameStateModalProps, GameStateModalType } from "./GameStateModal";

interface GameState {
  selectedTiles: {
    [position: QRCoord]: number;
  };
  selectionIndex: number;
  currentGame: string | null;
  replay: {
    move: Move | null;
    moveListIndex: number;
    playbackState: number;
    poisonToken: string;
  };
  showingTutorialModal: boolean;
  windowHasFocus: boolean;
  gameStateModal: GameStateModalProps | null;
}

const initialState: GameState = {
  selectedTiles: {},
  selectionIndex: 0,
  currentGame: null,
  replay: {
    move: null,
    moveListIndex: 0,
    playbackState: 0,
    poisonToken: "",
  },
  showingTutorialModal: false,
  windowHasFocus: document.hasFocus(),
  gameStateModal: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectTile: (state, action: PayloadAction<QRCoord>) => {
      state.selectedTiles[action.payload] = state.selectionIndex + 1;
      state.selectionIndex = state.selectionIndex + 1;
    },
    setSelection: (
      state,
      action: PayloadAction<{ [position: QRCoord]: number }>
    ) => {
      state.selectedTiles = action.payload;
      state.selectionIndex = 0;
    },
    unselectTile: (state, action: PayloadAction<QRCoord>) => {
      delete state.selectedTiles[action.payload];
    },
    resetSelection: (state) => {
      state.selectionIndex = 0;
      state.selectedTiles = {};
    },
    setCurrentGame: (state, action: PayloadAction<string | null>) => {
      state.currentGame = action.payload;
      state.replay = initialState.replay;
      state.selectedTiles = {};
      state.selectionIndex = 0;
    },
    newReplay: (
      state,
      action: PayloadAction<{ move: Move; poison: string; index: number }>
    ) => {
      state.replay.move = action.payload.move;
      state.replay.moveListIndex = action.payload.index;
      state.replay.poisonToken = action.payload.poison;
      state.replay.playbackState = 0;
    },
    advanceReplayPlaybackState: (state) => {
      state.replay.playbackState = state.replay.playbackState + 1;
    },
    clearReplay: (state) => {
      state.replay.move = null;
      state.replay.playbackState = 0;
      state.replay.poisonToken = "";
      state.replay.moveListIndex = 0;
    },
    toggleTutorialModal: (state) => {
      state.showingTutorialModal = !state.showingTutorialModal;
    },
    setWindowHasFocus: (state, action: PayloadAction<boolean>) => {
      state.windowHasFocus = action.payload;
    },
    setGameStateModal: (state, action: PayloadAction<GameStateModalProps | null>) => {
      state.gameStateModal = action.payload
    }
  },
});

export const {
  selectTile,
  unselectTile,
  resetSelection,
  setCurrentGame,
  setSelection,
  newReplay,
  advanceReplayPlaybackState,
  clearReplay,
  toggleTutorialModal,
  setWindowHasFocus,
  setGameStateModal,
} = gameSlice.actions;

export default gameSlice.reducer;
