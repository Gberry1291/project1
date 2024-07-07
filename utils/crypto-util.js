import crypto from 'crypto';

export default class CryptoUtil {
    static hashPwd(pwd) {
        return crypto.createHmac('sha256', "secret!")
            .update(pwd)
            .digest('hex');
    }
}