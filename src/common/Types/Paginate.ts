export interface Paginate<T> {
    count: number
    data: T[]
    page: number
    pageCount: number
    total: number
}