/*
    Client class is the main class for the client side of the application.
*/
// export interface Client {
//     clientId: string;
//     clientName: string;
//     clientAddress: string;
//     clientPhone: string;
//     clientEmail: string;
//     clientTotalPurchases: number;
//     clientIsBusiness: boolean;
// }

export interface Client {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    total_purchases: number;
    is_business: boolean;
    total_outgoing_invoices: number;
}

export interface ClientCreate {
    name: string;
    address: string;
    phone: string;
    email: string;
    total_purchases: number;
    is_business: boolean;
}

export interface ClientUpdate {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    total_purchases: number;
    is_business: boolean;
}
