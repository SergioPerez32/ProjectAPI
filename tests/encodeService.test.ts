import { EncodeService } from "../infrastructure/encodeService"
const encodeService = new EncodeService
test('Check secret key lenght',()=>{
    let key = encodeService.encodeKey()
    expect(key.length).toBe(32)
})