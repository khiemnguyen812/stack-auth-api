/* eslint-disable prettier/prettier */
export class ResponseData<D> {
    status: number;
    data: D | D[];
    message: string;

    constructor(status: number, data: D | D[], message: string) {
        this.status = status;
        this.data = data;
        this.message = message;

        return this;
    }
}