import * as React from 'react';
import billInterface from '../../interfaces/billInterface';
import store from '../../store';

export interface ITableComponentProps {
    bills: billInterface[];
    errorMessage: string;
    hasActions: boolean;
}
export function TableComponent(props: ITableComponentProps) {
    const [bills, setBills] = React.useState<Array<billInterface>>(props.bills??[]);
    const [errorMessage,setErrorMessage] = React.useState(props.errorMessage ?? '');
    const [hasActions,setHasActions] = React.useState(props.hasActions ?? false);
    React.useEffect(() => {
        setBills(props.bills);
        setErrorMessage(props.errorMessage);
        setHasActions(props.hasActions);
    }, [props]);

    return (errorMessage === "" ?
            <>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Category</th>
                            <th>Amount ($US)</th>
                            <th>State</th>
                            <th>Period</th>
                            {hasActions?<th>Actions</th>:null}
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
                                            bills[0].state === "Pending" ?
                                                (<td>
                                                    <button className="button is-primary is-small">Pay</button>
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
