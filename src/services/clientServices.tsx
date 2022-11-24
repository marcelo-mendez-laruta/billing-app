import axios from "axios";
import http from "../http-common";
import responseInterface from "../interfaces/responseInterface";
const getClientData = async (ClientId: number) => {
  try {
    const { data, status }=await http.get(
      'Client',
      {
        headers: {
          Accept: 'application/json',
        },
        params: { clientId: ClientId }
      },
    );
    let response: responseInterface = {
      data: data,
      status: status
    };
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.detail;
    } else {
      return 'An unexpected error occurred';
    }
  }
};
const clientService = {
  getClientData
};

export default clientService;
