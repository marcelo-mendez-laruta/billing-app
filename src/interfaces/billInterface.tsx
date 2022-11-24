export default interface billInterface {
    id: number;
    period: number;
    category: string;
    amount: number;
    state: string;
    clientId: number;
    createdOn: Date;
    updatedOn: Date;
};
