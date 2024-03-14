/*
    Client class is the main class for the client side of the application.
*/
export interface ClientProp {
    clientId: string;
    clientName: string;
    clientAddress: string;
    clientPhone?: string;
    clientEmail: string;
    clientNotes?: string;
    clientTotalPurchases?: number;
}
