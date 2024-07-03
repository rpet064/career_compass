export const resumeDataTableColumnConfiguration: Array<ColumnConfig> = [
    { field: 'resumeid', header: 'Resume', dataTableComponentType: 'redirectLink' },
    { field: 'resumename', header: 'Name', dataTableComponentType: 'label' },
    { field: 'resumedescription', header: 'Description', dataTableComponentType: 'label' },
    { field: 'resumeurl', header: 'URL', dataTableComponentType: 'label' },
    { field: 'whencreated', header: 'When Created', dataTableComponentType: 'dateLabel' },
    { field: 'resumeid', header: '', dataTableComponentType: 'editIcon' },
    { field: 'whendeleted', header: '', dataTableComponentType: 'deleteIcon' },
  ];