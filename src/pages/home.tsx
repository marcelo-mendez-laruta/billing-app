import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClientData, setDefaultClientData } from '../slices/client';
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
  const [errorMessage, seterrorMessage] = useState("");
  React.useEffect(() => {
    store.dispatch(setDefaultClientData()).then((response: any) => {
      setClient(response.payload);
    });
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setClient({ ...client, id: Number(event.target.value) });
  };
  const login = () => {
    const { id } = client;
    store.dispatch(getClientData(id)).then((response: any) => {
      if (typeof response.payload != 'string') {
        setClient(response.payload);
        navigate("/client");
      }
      else {
        seterrorMessage(response.payload);
      }
    });
  }
  const handleloginButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    login();
  }
  return (
    <section className="hero is-fullheight">
      <div className="hero-body has-text-centered">
        <div className="container">
          <div className="columns">
            <div className="column is-4 is-offset-4">
              <div className="box has-background-primary-light">
                <p className="subtitle is-5 has-text-weight-bold">{props.WelcomeMessage}</p>
                <p className="subtitle is-5 has-text-primary">Please enter your client ID.</p>
                <div className="block">
                  <input className="input" type="number" value={client.id} onChange={handleChange} />
                </div>
                {errorMessage !== "" ? (<div className="block"><div className="notification is-danger has-text-white">{errorMessage}</div></div>) : (<></>)}
                <div className="block">
                  <button className="button is-info is-fullwidth" onClick={e => handleloginButtonClick(e)}>Sign In</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
