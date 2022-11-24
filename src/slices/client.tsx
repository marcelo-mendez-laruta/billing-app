import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import clientInterface from '../interfaces/clientInterface';
import responseInterface from '../interfaces/responseInterface';
import clientService from '../services/clientServices'
const initialState: clientInterface = {
    id: 0,
    name: "No Client"

};
export const getClientData = createAsyncThunk(
    'client/getClientData',
    async (clientId: number) => {
        let response:string|responseInterface = await clientService.getClientData(clientId);
        if (typeof response != 'string') {
            if(response.status===200){
                return response.data;
            }
            else{
                let errorResponse:clientInterface={
                    id: 0,
                    name: response.data.detail ?? 'An unexpected error occurred'
                };
                return errorResponse;
            }
        } else {
            return response;
        }
    }
);
const clientSlice = createSlice({
    name: 'getClientData',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getClientData.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});
const { reducer } = clientSlice;
export default reducer;