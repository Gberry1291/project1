import {CryptoUtil} from '../utils/crypto-util.js';

export class User{
    constructor(username, password) {
        this.username = username;
        this.passwordHash = CryptoUtil.hashPwd(password);
    }
}