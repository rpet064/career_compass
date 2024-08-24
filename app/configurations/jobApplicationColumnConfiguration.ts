import { jobApplicationColumnType } from "@/types/jobApplicationColumnType";

export const applicationDataTableColumnConfiguration: Array<jobApplicationColumnType> = [
    { field: 'jobapplicationid', header: 'Application', dataTableComponentType: 'label' },
    { field: 'resumeid', header: 'Resume id', dataTableComponentType: 'label' },
    { field: 'progress', header: 'Progress', dataTableComponentType: 'progressDropdown' },
    { field: 'sentiment', header: 'Sentiment', dataTableComponentType: 'sentimentDropdown' },
    { field: 'joburl', header: 'Job url', dataTableComponentType: 'label' },
    { field: 'whencreated', header: 'When applied', dataTableComponentType: 'dateLabel' },
    { field: 'whendeleted', header: '', dataTableComponentType: 'deleteIcon' },
  ];