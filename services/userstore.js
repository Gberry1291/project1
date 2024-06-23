import Datastore from 'nedb-promises'
import {CryptoUtil} from '../utils/crypto-util.js';
import {User} from './user.js'

export class UserStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/user.db', autoload: true});
    }

    async register(username, password) {
        if (!(username && password)) {
            throw new Error('no user');
        }
        const user = new User(username, password);
        return this.db.insert(user);
    }

    async authenticate(username, password) {
        if (!(username && password)) {
            return false;
        }
        const user = await this.db.findOne({username: username});
        if (user == null) {
            await this.register(username, password);
            return true;
        }
        return user.passwordHash === CryptoUtil.hashPwd(password)

    }
}

export const userStore = new UserStore();