import { configureStore } from "@reduxjs/toolkit";
import consoleReducer from "../redux/slices/ConsoleSlice";
import fileExpoReducer from "../redux/slices/FileExplorerSlice";

export const store = configureStore({
  reducer: {
    consoleReducer,
    fileExpoReducer,
  },
});
