import { Status } from "./Status";
export interface Task {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
    status: Status;
}