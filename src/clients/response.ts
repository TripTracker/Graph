export interface Response<T> {
    payload: T;
    success: boolean;
    wasNotFound: boolean;
}