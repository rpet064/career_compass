export const userColumnConfiguration: Array<ColumnConfig> = [
    { field: 'userid', header: 'User', dataTableComponentType: 'redirectLink' },
    { field: 'title', header: 'Title', dataTableComponentType: 'label' },
    { field: 'firstname', header: 'First Name', dataTableComponentType: 'label' },
    { field: 'lastname', header: 'Last Name', dataTableComponentType: 'label' },
    { field: 'roleid', header: 'Role', dataTableComponentType: 'label' },
    { field: 'email', header: 'Email', dataTableComponentType: 'label' },
    { field: 'whencreated', header: 'When Created', dataTableComponentType: 'dateLabel' },
    { field: 'userid', header: '', dataTableComponentType: 'editIcon' },
    { field: 'whendeleted', header: '', dataTableComponentType: 'deleteIcon' },
];