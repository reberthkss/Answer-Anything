export interface RepositoryResponse {
    isSuccessful: boolean,
    error: any
}
export const returnRepositoryResponse = (isSuccessful: boolean, error: any): RepositoryResponse => ({isSuccessful, error});
