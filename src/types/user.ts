export type User = {
    id: string,
    email: string,
    name: string,
    lastName: string,
    mobile: string,
    role: 'customer' | 'admin' | 'barista',
}