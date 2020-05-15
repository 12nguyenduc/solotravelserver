export default class BaseController {

    constructor() {
    }


    static Response(status: number = 200, message: string = 'success', data: any = {}): any {
        return {
            status: status === 0 ? 200 : status,
            message: message ? message : 'success',
            data: {}
        }
    }


}
