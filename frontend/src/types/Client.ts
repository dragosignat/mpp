/*
    Client class is the main class for the client side of the application.
*/
export interface Client {
    clientId: string;
    clientName: string;
    clientAddress: string;
    clientPhone: string;
    clientEmail: string;
    clientTotalPurchases: number;
    clientIsBusiness: boolean;
}

export interface ClientCreate {
    clientName: string;
    clientAddress: string;
    clientPhone: string;
    clientEmail: string;
    clientTotalPurchases: number;
    clientIsBusiness: boolean;
}
