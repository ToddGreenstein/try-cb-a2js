export interface IUser {
    _id?: string,
    name: string,
    password: string,
    token: string,
    flights?: Array<Object>
}
