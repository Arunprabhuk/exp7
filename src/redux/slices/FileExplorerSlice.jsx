import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navType: "file",
  showSideNav: true,
  fileName: "",
  structure: [
    {
      key: 1,
      lable: "Contracts",
      childs: [],
    },
  ],
  fileNameArray: [],
};
const fileExpoReducer = createSlice({
  name: "explorer",
  initialState,
  reducers: {
    updateNavType: (state, action) => {
      state.navType = action.payload;
    },
    updateSideNavDrawer: (state, action) => {
      state.showSideNav = action.payload;
    },
    updateStructure: (state, action) => {
      state.structure.map((item) => {
        item.childs = action.payload;
      });
    },
    updateFileName: (state, action) => {
      state.fileName = action.payload;
    },
    updateFileNameArray: (state, action) => {
      state.fileNameArray = action.payload;
    },
  },
});

export const {
  updateNavType,
  updateSideNavDrawer,
  updateStructure,
  updateFileName,
  updateFileNameArray,
} = fileExpoReducer.actions;
export const navType = (state) => state.fileExpoReducer.navType;
export default fileExpoReducer.reducer;
