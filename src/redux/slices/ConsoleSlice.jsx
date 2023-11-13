import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showConsole: false,
  activeFile: null,
  fileClicked: false,
  editorContent: {},
};
const consoleReducer = createSlice({
  name: "console",
  initialState,
  reducers: {
    updateShowConsole: (state, action) => {
      state.showConsole = action.payload;
    },
    updateActiveFile: (state, action) => {
      state.activeFile = action.payload;
    },
    updateFileClicked: (state, action) => {
      state.fileClicked = action.payload;
    },
    uploadEditorContent: (state, action) => {
      state.editorContent = action.payload;
    },
  },
});

export const {
  updateShowConsole,
  updateActiveFile,
  uploadEditorContent,
  updateFileClicked,
} = consoleReducer.actions;
export const showConsole = (state) => state.consoleReducer.showConsole;
export default consoleReducer.reducer;
