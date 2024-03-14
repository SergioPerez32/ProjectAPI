export const storage: Map<string, { message: string }> = new Map();

export class Database {
    addSecret(secretKey:string, message:string){
        storage.set(secretKey, { message });
    }

    getSecret(secretKey:string):{ message: string } | undefined {
        return storage.get(secretKey);
    }

    deleteSecret(secretKey:string):void{
        storage.delete(secretKey);
    }
}

