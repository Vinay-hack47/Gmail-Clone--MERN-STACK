import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    open: false,
    user: null,
    emails: [],
    selectedEmail: null,
    searchText: "",
    scheduledEmails: [],
    selectedScheduledEmail:null,
  },
  reducers: {
    //action
    setOpen: (state, action) => {
      state.open = action.payload;
    }, 
    setAuthUser: (state, action) => {
      state.user = action.payload;
      state.open = false;
    },
    setEmails: (state, action) => {
      state.emails = action.payload;
    },
    setSelectedEmail: (state, action) => {
      state.selectedEmail = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setScheduledEmails: (state, action) => {
      state.scheduledEmails = action.payload;
    },
    setSelectedScheduledEmail: (state, action) => {
      state.selectedScheduledEmail = action.payload;
    },
  },
});

export const {
  setOpen,
  setAuthUser,
  setEmails,
  setSelectedEmail,
  setSearchText,
  setScheduledEmails,
  setSelectedScheduledEmail,
} = appSlice.actions;
export default appSlice.reducer;
