import { APIResponse, request } from "@playwright/test"
import { url } from "inspector"

export class ApiService {

    post = async <T>(url: string, data: T) => {
        const context = await request.newContext();
        const res = await context.post(url, { data });
        await context.storageState()
        return await res;
    };




}