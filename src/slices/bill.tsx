import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import billInterface from '../interfaces/billInterface';
import responseInterface from '../interfaces/responseInterface';
import billingService from '../services/billingService';
const initialState: Array<billInterface> = [];
export const getPendingBills = createAsyncThunk(
    'bills/getPendingBills',
    async (clientId: number) => {
        let response: string | responseInterface = await billingService.pendingBills(clientId);
        if (typeof response != 'string') {
            if (response.status === 200) {
                return response.data;
            }
            else {
                return response.data;
            }
        } else {
            return response;
        }
    }
);
export const getBillsHistory = createAsyncThunk(
    'bills/getBillsHistory',
    async (clientId: number) => {
        let response: string | responseInterface = await billingService.billingHistory(clientId);
        if (typeof response != 'string') {
            if (response.status === 200) {
                return response.data;
            }
            else {
                return response.data;
            }
        } else {
            return response;
        }
    }
);
export const createNewBill = createAsyncThunk(
    'bills/createNewBill',
    async (newBill: billInterface) => {
        let response: string | responseInterface = await billingService.createNewBill(newBill);
        if (typeof response != 'string') {
            if (response.status === 200) {
                return response.data;
            }
            else {
                return response.status;
            }
        } else {
            return response;
        }
    }
);
export const searchBillsByCategory = createAsyncThunk(
    'bills/searchBillsByCategory',
    async (searchCriteria: string) => {
        let response: string | responseInterface = await billingService.searchBillsByCategory(searchCriteria);
        if (typeof response != 'string') {
            if (response.status === 200) {
                return response.data;
            }
            else {
                return response.status;
            }
        } else {
            return response;
        }
    }
);
export const payBillById = createAsyncThunk(
    'bills/payBillById',
    async (billId: number) => {
        let response: string | responseInterface = await billingService.payBillById(billId);
        if (typeof response != 'string') {
            if (response.status === 200) {
                return response.data;
            }
            else {
                return response.status;
            }
        } else {
            return response;
        }
    }
);
const billSlice = createSlice({
    name: 'BillsData',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPendingBills.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(getBillsHistory.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(createNewBill.fulfilled, (state, action) => {
            return [...action.payload];
        });
        builder.addCase(searchBillsByCategory.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});
const { reducer } = billSlice;
export default reducer;