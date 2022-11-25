import * as React from 'react';
import billInterface from '../../interfaces/billInterface';
import { createNewBill } from '../../slices/bill';
import store from '../../store';

export interface INewBillComponentProps {
}

export function NewBillComponent() {
    const [categories] = React.useState(["ELECTRICITY", "SEWER", "WATER"]);
    const [newBill, setNewBill] = React.useState<billInterface>({ clientId: store.getState().client.id, amount: 0, period: 202211, category: "NONE", createdOn: new Date(), id: 0, state: "Pending", updatedOn: new Date() });
    const [errorMessage, setErrorMessage] = React.useState('');
    const [isSuccess, setIsSuccess] = React.useState(false);
    const HandleNewBill = () => {
        store.dispatch(createNewBill(newBill)).then((response: any) => {
            if (typeof response.payload !== 'string') {
                setNewBill({ clientId: 0, amount: 0.00, period: 202211, category: "NONE", createdOn: new Date(), id: 0, state: "Pending", updatedOn: new Date() });
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                }, 2000);
            }
            else {
                setErrorMessage(response.payload);
            }
        });
    };
    //region Handlers
    const handlePeriodInputChange = (e: any) => {
        e.preventDefault();
        setNewBill({ ...newBill, period: e.target.value });
    };
    const handleAmountInputChange = (e: any) => {
        e.preventDefault();
        setNewBill({ ...newBill, amount: e.target.value });
    };
    const handleClientIdInputChange = (e: any) => {
        e.preventDefault();
        setNewBill({ ...newBill, clientId: e.target.value });
    };
    const handleCategoryInputChange = (e: any) => {
        setNewBill({ ...newBill, category: e.target.value });
    };
    const HandleNewBillClick = (e: any) => {
        e.preventDefault();
        HandleNewBill();
        //setNewBill({ clientId: store.getState().client.id, amount: 0, period: 202211, category: "NONE", createdOn: new Date(), id: 0, state: "Pending", updatedOn: new Date() });
    };
    //endregion
    return (
        <div className='box'>
            <p className='is-size-4 has-text-primary has-text-weight-bold'>New Bill</p>            
            <div className="field">
                <label className="label">Client Id</label>
                <div className="control">
                    <input className="input" type="number" placeholder="0" value={newBill.clientId} onChange={e => handleClientIdInputChange(e)} />
                </div>
                <p className="help has-text-info">
                    If you select the value 0 you will be create bills for all users</p>
            </div>
            <div className="field">
                <label className="label">Amount</label>
                <div className="control">
                    <input className="input" type="number" placeholder="125.14" value={newBill.amount} onChange={e => handleAmountInputChange(e)} />
                </div>
            </div>
            <div className="field">
                <label className="label">Category</label>
                <div className="control">
                    <div className="select" onChange={handleCategoryInputChange}>
                        <select>
                            <option selected disabled>
                                Choose one
                            </option>
                            {categories.map((category, index) => {
                                return <option key={index}>{category}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className="field">
                <label className="label">Period</label>
                <div className="control">
                    <input className="input" type="number" placeholder="YYYYMM" value={newBill.period} onChange={e => handlePeriodInputChange(e)} />
                </div>
                <p className="help has-text-info">
                    Remember to comply with the following format YYYYMM</p>
            </div>
            {
                errorMessage.length > 0 ? <p className="help has-text-danger">{errorMessage}</p> : <></>
            }
            {isSuccess && <div className='notification is-success'>Bill created successfully</div>}
            <button className="button is-primary" onClick={HandleNewBillClick}>Create Bill</button>
        </div>
    );
}
