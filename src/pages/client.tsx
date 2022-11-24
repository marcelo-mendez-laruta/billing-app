import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../store';

export function ClientPage() {
  const [client] = React.useState(store.getState().client);
  const navigate = useNavigate();
  console.log(client);
  React.useEffect(() => {
    if (client.name === 'No Client') {
      navigate("/");
    }
  }, [client, navigate]);

  return (
    <div>
      <p>{client.name}</p>
    </div>
  );
}
