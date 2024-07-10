// If the address field is actually a JSON string that needs to be decoded, you might have another interface for Address
export interface Address {
    street: string;
    city: string;
    state?: string;
    country?: string;
}
