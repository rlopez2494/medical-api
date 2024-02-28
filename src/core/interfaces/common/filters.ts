export interface FilterInterface {
    field: string;
    operator: string;
    value: any;
}

export interface DataFilterInterface {
    filters: FilterInterface[]
}