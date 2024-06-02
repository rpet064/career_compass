import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { jobapplications } from "@prisma/client";

const columnsConfiguration: Array<{ field: keyof jobapplications; header: string }> = [
  { field: 'jobapplicationsid', header: 'Job application id' },
  { field: 'resumeid', header: 'Resume id' },
  { field: 'userid', header: 'User id' },
  { field: 'progress', header: 'Progress' },
  { field: 'sentiment', header: 'Sentiment' },
  { field: 'joburl', header: 'Job url' },
  { field: 'whencreated', header: 'When applied' },
];

const JobApplicationDataTable: React.FC<{ jobApplicationData: jobapplications[] }> = ({ jobApplicationData }) => {
  if (Array.isArray(jobApplicationData)) {
  return (
    <DataTable value={jobApplicationData}>
      {columnsConfiguration.map((col, index) => (
        <Column key={index} field={col.field} header={col.header} body={(rowData) => rowData[col.field]} />
      ))}
    </DataTable>
  );
} else {
  return <div>No job applications found</div>;
}
};


export default JobApplicationDataTable;
