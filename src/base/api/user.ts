import { RemoteService, Options } from '../utils/remoteService';
import { API } from './index';

export class UserAPI {
    static login(options: Options) {
        options.serv = API.USER_LOGIN;
        RemoteService.getData(options);
    }

    static sendSms(options: Options){
        options.serv = API.USER_SMS;
        RemoteService.getData(options);
    }
    
    static loginBySmsCode(options: Options){
        options.serv = API.USER_LOGIN_SMS;
        RemoteService.getData(options);
    }
    
    static register(options: Options){
        options.serv = API.USER_REGISTER;
        RemoteService.getData(options);
    }
}

