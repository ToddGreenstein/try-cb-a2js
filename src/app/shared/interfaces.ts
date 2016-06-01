export interface IUser {
    _id?: string,
    user: string,
    password: string,
    token?: string,
    flights?: Array<Object>
}

export interface IToken {
    status: string
    token?: string
}
