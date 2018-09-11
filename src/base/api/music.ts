import { RemoteService, Options } from '../utils/remoteService';
import { API } from './index';

export class MusicAPI {
    static getTypes(options: Options) {
        options.serv = API.MUSIC_TYPES;
        RemoteService.getData(options);
    }
    static getRows(options:Options){
        options.serv = API.MUSIC_ROWS;
        RemoteService.getData(options);    
    }

    static getSource(options:Options){
        options.serv = API.MUSIC_SOURCE;
        RemoteService.getData(options);    
    }

    static addStore(options:Options){
        options.serv = API.MUSIC_ADD_STORE;
        RemoteService.getData(options);    
    }

    static deleteStore(options:Options){
        options.serv = API.MUSIC_DELETE_STORE;
        RemoteService.getData(options);    
    }

    static getStores(options:Options){
        options.serv = API.MUSIC_STORE;
        RemoteService.getData(options);    
    }


    
}