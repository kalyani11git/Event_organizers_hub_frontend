import React from "react";
import TokenReducer from "../tokenSlice/TokenSlice";
import RoleReducer  from "../tokenSlice/RoleSlice";
import ProfileReducer from "../tokenSlice/ProfileSlice"

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        token: TokenReducer,
        role: RoleReducer,
        profile:ProfileReducer
    }
})