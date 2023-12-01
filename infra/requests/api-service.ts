import { APIResponse, request } from "@playwright/test"
import { url } from "inspector"

export class ApiService {

    post = async <T>(url: string, data?: T): Promise<APIResponse> => {
        const context = await request.newContext();
        const res = await context.post(url, { data });
        // to wait for coockie to load fully
        await context.storageState()
        return res;
    };




}