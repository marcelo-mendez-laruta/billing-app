import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { BillsTableComponent } from '../components/bills/billsTable';
import { NewBillComponent } from '../components/bills/newBill';
import { SearchByCategoryComponent } from '../components/bills/searchByCategory';
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
      if (typeof response.payload != 'string') {
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
        return (<BillsTableComponent bills={Bills} errorMessage={errorMessage} hasActions={true} isSearchMode={false}/>);
      case 2:
        return (<BillsTableComponent bills={Bills} errorMessage={errorMessage} hasActions={false} isSearchMode={false}/>);
      case 3:
        return (<NewBillComponent />);
      case 4:
        return (<SearchByCategoryComponent />);
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
            <li className={activeTab === 4 ? "is-active" : ""}><a href="#/" onClick={() => handleActiveTab(4)}>[ADMIN] Search by category</a></li>
          </ul>
        </div>
        {
          renderSwitch(activeTab)
        }
      </div>
    </>
  );
}
