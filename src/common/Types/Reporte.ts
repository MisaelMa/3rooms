export interface Reporte {
    "numero": string;
    "name": string;
    "total": number
    students: Student[]
}

export interface Student {
    "id": number
    "name": string
    "type": string
    "registeDate": string
}