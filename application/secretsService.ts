import { EncodeService } from '../infrastructure/encodeService';
import { Database } from '../infrastructure/database';

export class SecretService {
    encodeService: EncodeService;
    database: Database
    constructor(encodeService:EncodeService, database:Database){
        this.encodeService=encodeService;
        this.database=database;
    }

    saveSecret(message:string):string{
        const secretKey:string = this.encodeService.encodeKey();
        this.database.addSecret(secretKey, message);
        return secretKey;
    }

    getSecret(secretKey:string){
        const secret = this.database.getSecret(secretKey);
        let response; 
        if (!secret) {
            response={status:404, message:{ error: 'Secret not found' }}
        } else {
            this.database.deleteSecret(secretKey);
            response={status:200, message: secret}
        }
        return response;
    }

    
    
    
}
