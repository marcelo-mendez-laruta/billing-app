import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableComponent } from '../components/bills/Table';
import billInterface from '../interfaces/billInterface';
import { getBillsHistory, getPendingBills } from '../slices/bill';
import store from '../store';

export function ClientPage() {
  const [client] = React.useState(store.getState().client);
  const [activeTab, setActiveTab] = React.useState(1);
  const [Bills, setBills] = React.useState<billInterface[]>(store.getState().bills);
  const [errorMessage, setErrorMessage] = React.useState('');
  const navigate = useNavigate();
  React.useEffect(() => {
    if (client.name === 'No Client') {
      navigate("/");
    }
    fetchPendingBills();
    setActiveTab(1);
  }, [client, navigate]);
  const handleActiveTab = (tab: number) => {
    setActiveTab(tab);
  };
  const handlePendingBillsClick = (e: any) => {
    e.preventDefault();
    handleActiveTab(1);
    fetchPendingBills();
  }
  const handleBillsHistoryClick = (e: any) => {
    e.preventDefault();
    handleActiveTab(2);
    fetchBillsHistory();
  }
  const fetchPendingBills = () => {
    const { id } = store.getState().client;
    store.dispatch(getPendingBills(id)).then((response: any) => {
      if (typeof response.payload != 'string') {
        setBills(response.payload);
        setErrorMessage('');
      }
      else {
        setErrorMessage(response.payload);
      }
    });
  };
  const fetchBillsHistory = () => {
    const { id } = store.getState().client;
    store.dispatch(getBillsHistory(id)).then((response: any) => {      
      if (typeof response.payload != 'string' ) {
        setBills(response.payload);
        setErrorMessage('');
      }
      else {
        setErrorMessage(response.payload);
        setBills([]);
      }
    });
  };
  const renderSwitch = (tab: number) => {
    switch (tab) {
      case 1:
        return (<TableComponent bills={Bills} errorMessage={errorMessage} hasActions={true}/>);
      case 2:
        return (<TableComponent bills={Bills} errorMessage={errorMessage} hasActions={false}/>);
      case 3:
        return (<div>Tab 3</div>);
    };
  };
  return (
    <>
      <div className='box is-shadowless'>
        <p className='is-size-3'>Hello <span className='has-text-primary-dark'>{client.name}</span>, welcome again!</p>
      </div>
      <div className='box is-shadowless'>
        <div className="tabs is-toggle">
          <ul>
            <li className={activeTab === 1 ? "is-active" : ""}><a href="#/" onClick={e => handlePendingBillsClick(e)}>Pending Bills</a></li>
            <li className={activeTab === 2 ? "is-active" : ""}><a href="#/" onClick={e => handleBillsHistoryClick(e)}>History</a></li>
            <li className={activeTab === 3 ? "is-active" : ""}><a href="#/" onClick={() => handleActiveTab(3)}>[ADMIN] Create a bill</a></li>
          </ul>
        </div>
        {
          renderSwitch(activeTab)
        }
      </div>
    </>
  );
}
