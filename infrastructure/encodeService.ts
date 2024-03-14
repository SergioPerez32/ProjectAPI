import crypto from 'crypto';
require('dotenv').config()
const bytesSize:number= Number(process.env.BYTESSIZE);
export class EncodeService{
    encodeKey():string {
        console.log(bytesSize);
        return crypto.randomBytes(bytesSize).toString('hex');
    }
}