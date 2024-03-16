type Task = {
    id: number;
    title: string;
    description: string;
    id_creator: string;
    creator_username?: string;
    finished: boolean | number;
    task_date: string;
}