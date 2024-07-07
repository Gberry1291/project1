import CryptoUtil from '../utils/crypto-util.js';

export default class User{
    constructor(username, password) {
        this.username = username;
        this.passwordHash = CryptoUtil.hashPwd(password);
        this.darkmode=false;
        this.sortway="title";
        this.sorthighlow=1;
        this.darkmode=false;
        this.filter=false;
    }
}