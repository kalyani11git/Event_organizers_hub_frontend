import { createSlice , nanoid} from "@reduxjs/toolkit";


const initialState = {
    token:''
    
}


export const tokenSlice = createSlice({
    name:'token',
    initialState,
    reducers:{
        addToken:(state,action)=>{
            const newToken = action.payload;
            state.token = newToken;
        },

        deleteToken:(state)=>{
            state.token='';
        }


    }
})


export const {addToken,deleteToken} = tokenSlice.actions


export default tokenSlice.reducer;