import axios from "axios";
import http from "../http-common";
import billInterface from "../interfaces/billInterface";


const pendingBills = async (ClientId: number) => {
  try {
    const { data, status } = await http.get<any>(
      'billing/pending',
      {
        headers: {
          Accept: 'application/json',
        },
        params: { clientId: ClientId }
      },
    );
    console.log('response status is: ', status);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
};
const searchBillsByCategory = async (Category: string) => {
  try {
    const { data, status } = await http.get<any>(
      'billing/search',
      {
        headers: {
          Accept: 'application/json',
        },
        params: { Category: Category }
      },
    );
    console.log('response status is: ', status);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
};
const payBill = async (Bill: billInterface) => {
  try {
    const { data, status } = await http.post<any>(
      'billing/pay',
      Bill,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    console.log('response status is: ', status);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}
const payBillById = async (BillId: number) => {
  try {
    const { data, status } = await http.post<any>(
      'billing/payById',
      BillId,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    console.log('response status is: ', status);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}
const createNewBill = async (Bill: billInterface) => {
  try {
    const { data, status } = await http.post<any>(
      'billing/bills',
      Bill,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    console.log('response status is: ', status);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
};
const billingHistory = async (ClientId: number) => {
  try {
    const { data, status } = await http.get<any>(
      'billing/history',
      {
        headers: {
          Accept: 'application/json',
        },
        params: { clientId: ClientId }
      },
    );
    console.log('response status is: ', status);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
};
const billingService = {
  pendingBills,
  searchBillsByCategory,
  payBill,
  payBillById,
  createNewBill,
  billingHistory
};

export default billingService;