import { FC } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { jobapplications } from "@prisma/client";
import { InputText } from 'primereact/inputtext';
import { formatDate } from '../utility/dateFormatter';

type DataType = 'label' | 'dropdown' | 'inputText' | 'dateLabel';

type ColumnConfig = {
  field: keyof jobapplications;
  header: string;
  componentType?: DataType;
};

const columnsConfiguration: Array<ColumnConfig> = [
  { field: 'jobapplicationsid', header: 'Application id', componentType: 'label' },
  { field: 'resumeid', header: 'Resume id', componentType: 'inputText' },
  { field: 'progress', header: 'Progress', componentType: 'inputText' },
  { field: 'sentiment', header: 'Sentiment', componentType: 'inputText' },
  { field: 'joburl', header: 'Job url', componentType: 'inputText' },
  { field: 'whencreated', header: 'When applied', componentType: 'dateLabel' },
];

const JobApplicationDataTable: FC<{ jobApplicationData: jobapplications[] }> = ({ jobApplicationData }) => {

  if (Array.isArray(jobApplicationData)) {
  return (
    <DataTable value={jobApplicationData}>
    {columnsConfiguration.map((col, index) => (
      <Column 
        key={index} 
        field={col.field} 
        header={col.header} 
        body={(rowData) => {
          switch (col.componentType) {
            case 'dateLabel':
              return <span>{formatDate(rowData[col.field])}</span>;
            case 'inputText':
              return <InputText type="text" value={rowData[col.field]} />;
            default:
              return <span>{rowData[col.field]}</span>;
          }
        }}
      />
    ))}
  </DataTable>
  );
} else {
  return <div>No job applications found</div>;
}
};

export default JobApplicationDataTable;
