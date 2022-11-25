import * as React from 'react';
import billInterface from '../../interfaces/billInterface';
import { searchBillsByCategory } from '../../slices/bill';
import store from '../../store';
import { BillsTableComponent } from './billsTable';

export function SearchByCategoryComponent() {
    const [bills, setBills] = React.useState<Array<billInterface>>([]);
    const [categories] = React.useState(["ELECTRICITY", "SEWER", "WATER"]);
    const [selectedCategory, setSelectedCategory] = React.useState("ELECTRICITY");
    const [errorMessage, setErrorMessage] = React.useState('');

    React.useEffect(() => {
        const fetchBillsByCategory = () => {
            store.dispatch(searchBillsByCategory(selectedCategory)).then((response: any) => {
                if (typeof response.payload != 'string') {
                    setBills(response.payload);
                }
                else {
                    setErrorMessage(response.payload);
                }
            });
        };
        fetchBillsByCategory();
        // eslint-disable-next-line
    }, [selectedCategory]);

    const handleCategoryChange = (e: any) => {
        setSelectedCategory(e.target.value);
    };
    return (
        <>
            <div className="box">
                <div className="field">
                    <label className="label">Category</label>
                    <div className="control">
                        <div className="select" onChange={handleCategoryChange}>
                            <select>
                                {categories.map((category, index) => {
                                    return <option key={index}>{category}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>

                {
                    bills.length > 0 ? <BillsTableComponent bills={bills} errorMessage="" hasActions={true} isSearchMode={true} /> : <></>
                }
                {
                    errorMessage.length > 0 ? <p className="help has-text-danger">{errorMessage}</p> : <></>
                }
            </div>
        </>
    );
}
