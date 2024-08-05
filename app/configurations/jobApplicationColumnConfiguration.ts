import { jobApplicationColumnType } from "@/types/jobApplicationColumnType";

export const applicationDataTableColumnConfiguration: Array<jobApplicationColumnType> = [
    { field: 'jobapplicationid', header: 'Application', dataTableComponentType: 'label' },
    { field: 'resumeid', header: 'Resume id', dataTableComponentType: 'label' },
    { field: 'progress', header: 'Progress', dataTableComponentType: 'label' },
    { field: 'sentiment', header: 'Sentiment', dataTableComponentType: 'label' },
    { field: 'joburl', header: 'Job url', dataTableComponentType: 'label' },
    { field: 'whencreated', header: 'When applied', dataTableComponentType: 'dateLabel' },
    { field: 'jobapplicationsid', header: '', dataTableComponentType: 'editIcon' },
    { field: 'whendeleted', header: '', dataTableComponentType: 'deleteIcon' },
  ];