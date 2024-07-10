export interface KanbanTask {
    id: number;
    title: string;
    column_type: string;
}

export interface KanbanTaskCreate {
    title: string;
    column_type: string;
}

export type ColumnType = 'backlog' | 'todo' | 'doing' | 'done';
