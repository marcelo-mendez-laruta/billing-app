import * as React from 'react';
import billInterface from '../../interfaces/billInterface';
import { payBillById } from '../../slices/bill';
import store from '../../store';

export interface ITableComponentProps {
    bills: billInterface[];
    errorMessage: string;
    hasActions: boolean;
    isSearchMode: boolean;
}
export function BillsTableComponent(props: ITableComponentProps) {
    const [bills, setBills] = React.useState<Array<billInterface>>(props.bills ?? []);
    const [errorMessage, setErrorMessage] = React.useState(props.errorMessage ?? '');
    const [hasActions, setHasActions] = React.useState(props.hasActions ?? false);
    const [isPaymentSuccess, setIsPaymentSuccess] = React.useState(false);

    React.useEffect(() => {
        setBills(props.bills);
        setErrorMessage(props.errorMessage);
        setHasActions(props.hasActions);
    }, [props]);

    const handlePayBill = (e: any, billId: number) => {
        e.preventDefault();
        store.dispatch(payBillById(billId)).then((response: any) => {
            if (response.payload === "Payment made successfully") {
                if (props.isSearchMode) {
                    let _bills = bills.filter((bill) => bill.id === billId);
                    let _bill = { ..._bills[0] };
                    _bill.state = "Paid";
                    let _newBills=bills.filter(function (item) { return item.id !== billId });
                    _newBills.push(_bill);
                    setBills(_newBills);
                }
                else {
                    setBills(bills.filter(function (item) { return item.id !== billId }));
                }
                setIsPaymentSuccess(true);
                setTimeout(() => {
                    setIsPaymentSuccess(false);
                }, 2000);
            }
            else {
                setErrorMessage(response.payload);
            }
        });
    };

    return (errorMessage === "" ?
        <>
            {isPaymentSuccess ?
                <p className="notification is-primary has-text-white">Successful payment</p> : <></>
            }
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Category</th>
                        <th>Amount ($US)</th>
                        <th>State</th>
                        <th>Period</th>
                        {hasActions ? <th>Actions</th> : null}
                    </tr>
                </thead>
                <tbody>
                    {
                        bills.map((bill: billInterface) => {
                            return (
                                <tr key={bill.id}>
                                    <td>{bill.id}</td>
                                    <td>{bill.category}</td>
                                    <td>{bill.amount}</td>
                                    <td>{bill.state}</td>
                                    <td>{bill.period}</td>
                                    {
                                        bill.state === "Pending" ?
                                            (<td>
                                                <button className="button is-primary is-small" onClick={e => handlePayBill(e, bill.id)}>Pay</button>
                                            </td>)
                                            :
                                            (<></>)
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </>
        : (<div className="notification is-danger has-text-white">{errorMessage}</div>));
}
