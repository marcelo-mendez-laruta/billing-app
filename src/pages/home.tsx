import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClientData } from '../slices/client';
import store from '../store';

export interface IHomePageProps {
  WelcomeMessage: string;
}

export function HomePage(props: IHomePageProps) {
  const initialClientState = {
    id: 0,
    name: "No Client",
    createdOn: new Date(),
    updatedOn: new Date(),
  };
  const navigate = useNavigate();
  const [client, setClient] = useState(initialClientState);
  const [errorMessage, seterrorMessage] = useState(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(event.target.value);
    setClient({ ...client, id: Number(event.target.value) });
    console.log(event.target.value);
  };
  const login = () => {
    const { id } = client;
    store.dispatch(getClientData(id)).then((response: any) => {
      if (typeof response.payload != 'string') {
        setClient(response.payload);
        navigate("/client");
        //store.getstate().client
      }
      else {
        seterrorMessage(response.payload);
      }
    });
  }
  return (
    <>
      <p>{props.WelcomeMessage}</p>
      <input type="number" value={client.id} onChange={handleChange} />
      <p>{client.name === 'No Client' ? '' : client.name}</p>
      {errorMessage ?? <p>{errorMessage}</p>}
      <button onClick={login}>Sign In</button>
    </>
  );
}
