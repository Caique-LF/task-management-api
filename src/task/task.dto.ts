export class TaskDto {
    id : string;
    title : string;
    description : string;
    status : string;
    experitionDate : Date;
}

export interface FindAllParameters{
    title : string;
    status : string;
}