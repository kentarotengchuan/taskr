import { ValidationErrorResponse } from "./Response";

export function isValidationError(res: any): res is ValidationErrorResponse {
    return res && typeof res === 'object' && 'errors' in res;
}