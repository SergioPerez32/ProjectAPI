import crypto from 'crypto';
require('dotenv').config()

export class EncodeService{
    encodeKey():string {
        const bytesSize:number= Number(process.env.BYTESSIZE);
        console.log(bytesSize);
        return crypto.randomBytes(bytesSize).toString('hex');
    }
}