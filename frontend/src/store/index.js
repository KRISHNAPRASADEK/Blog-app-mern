import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  // action creators
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

const isSignupSlice = createSlice({
  name: "isSignup",
  initialState: { isSignup: false },
  // action creators
  reducers: {
    signup(state) {
      state.isSignup = true;
    },
    login(state) {
      state.isSignup = false;
    },
  },
});

const linkValueSlice = createSlice({
  name: "linkValue",
  initialState: { value: 0 },
  // action creators
  reducers: {
    allBlog(state) {
      state.value = 0;
    },
    myBlog(state) {
      state.value = 1;
    },
    addBlog(state) {
      state.value = 2;
    },
    profile(state) {
      state.value = 3;
    },
  },
});

const deleteSlice = createSlice({
  name: "isDelete",
  initialState: { isDelete: false },
  // action creators
  reducers: {
    delete(state) {
      state.isDelete = !state.isDelete;
    },
  },
});

export const authActions = authSlice.actions;
export const isSignupActions = isSignupSlice.actions;
export const linkValueActions = linkValueSlice.actions;
export const deleteSliceActions = deleteSlice.actions;

// now we need to export reducer function which handle the states of the store
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    sign: isSignupSlice.reducer,
    link: linkValueSlice.reducer,
    delete: deleteSlice.reducer,
  },
});
