import { apiGet } from "../api";
import { DetailResponse } from "../types/Response";


export async function show(id: number): Promise<DetailResponse> {
    const result: DetailResponse = await apiGet(`/task/${id}`);
    
    if (result.result === 'failed') {
        throw new Error(`${result.message}`);
    } else {
        console.log(`${result.message}`);
    }
    
    return result;
}