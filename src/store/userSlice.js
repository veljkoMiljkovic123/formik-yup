import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: {
    myUser: {},
  },
  reducers: {
    loggedUserAction: (state, action) => {
     /*  console.log(action.payload); */
      state.myUser=action.payload

      localStorage.setItem('redux_user', JSON.stringify(action.payload))
    },
    restoreUserAction:(state,action)=>{
       /*  console.log(action.payload); */
        state.myUser=action.payload
        
    },
    logoutUserAction:(state,action)=>{
        state.myUser={}
        localStorage.removeItem('redux_user')
    }
  }
})

export const { loggedUserAction,restoreUserAction,logoutUserAction } = userSlice.actions;
export default userSlice.reducer;
