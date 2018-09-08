import { RemoteService, Options } from '../utils/remoteService';
import { API } from './index';

export class UserAPI {
    static login(options: Options) {
        options.serv = API.USER_LOGIN;
        RemoteService.getData(options);
    }

}