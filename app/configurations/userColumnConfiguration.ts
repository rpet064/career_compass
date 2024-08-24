import { userColumnType } from "@/types/userColumnType";

export const userColumnConfiguration: Array<userColumnType> = [
    { field: 'userid', header: 'User', dataTableComponentType: 'label' },
    { field: 'title', header: 'Title', dataTableComponentType: 'label' },
    { field: 'firstname', header: 'First Name', dataTableComponentType: 'label' },
    { field: 'lastname', header: 'Last Name', dataTableComponentType: 'label' },
    { field: 'roleid', header: 'Role', dataTableComponentType: 'label' },
    { field: 'email', header: 'Email', dataTableComponentType: 'label' },
    { field: 'whencreated', header: 'When Created', dataTableComponentType: 'dateLabel' },
    { field: 'whendeleted', header: '', dataTableComponentType: 'deleteIcon' },
];