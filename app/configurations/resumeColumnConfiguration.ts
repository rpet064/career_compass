import { resumeColumnType } from "@/types/resumeColumnType";

export const resumeDataTableColumnConfiguration: Array<resumeColumnType> = [
    { field: 'resumeid', header: 'Resume', dataTableComponentType: 'label' },
    { field: 'resumename', header: 'Name', dataTableComponentType: 'label' },
    { field: 'resumedescription', header: 'Description', dataTableComponentType: 'label' },
    { field: 'resumeurl', header: 'URL', dataTableComponentType: 'label' },
    { field: 'whencreated', header: 'When Created', dataTableComponentType: 'dateLabel' },
    { field: 'whendeleted', header: '', dataTableComponentType: 'deleteIcon' },
  ];