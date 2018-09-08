import { RemoteService, Options } from '../utils/remoteService';
import { API } from './index';

export class MusicAPI {
    static getTypes(options: Options) {
        options.serv = API.MUSIC_TYPES;
        RemoteService.getData(options);
    }

}