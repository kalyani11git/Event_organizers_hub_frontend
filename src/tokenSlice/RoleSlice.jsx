import { createSlice} from "@reduxjs/toolkit";


const initialState = {
    role:''
    
}


export const roleSlice = createSlice({
    name:'role',
    initialState,
    reducers:{
        addRole:(state,action)=>{
            const newRole = action.payload;
            state.role = newRole;
        },

        deleteRole:(state)=>{
            state.role='';
        }


    }
})


export const {addRole,deleteRole} = roleSlice.actions


export default roleSlice.reducer;