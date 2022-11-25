import axios from "axios";
import http from "../http-common";
import billInterface from "../interfaces/billInterface";
import responseInterface from "../interfaces/responseInterface";


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
    let response: responseInterface = {
      data: data,
      status: status
    };
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.detail;
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
    let response: responseInterface = {
      data: data,
      status: status
    };
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.detail;
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
    let response: responseInterface = {
      data: data,
      status: status
    };
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.detail;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}
const payBillById = async (BillId: number) => {
  try {
    const { data, status } = await http.get<any>(
      'billing/payById',
      {
        headers: {
          Accept: 'application/json',
        },
        params: { Id: BillId }
      },
    );
    console.log('response status is: ', status);
    let response: responseInterface = {
      data: data,
      status: status
    };
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.detail;
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
    let response: responseInterface = {
      data: data,
      status: status
    };
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.detail;
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
    let response: responseInterface = {
      data: data,
      status: status
    };
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.detail;
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