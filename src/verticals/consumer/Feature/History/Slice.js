import { createSlice } from "@reduxjs/toolkit";

const initialState=[];
export const historyCartSlice=createSlice({
  name:"historyCartSlice",
  initialState,
  reducers:{
   addHistory:(state,actions)=>{
    console.log("History is updated");
    state.push(actions.payload);
   },
  }

})

export default historyCartSlice.reducer;
export const {addHistory} =historyCartSlice.actions;