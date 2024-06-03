import { FC } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { jobapplications } from "@prisma/client";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

type DataType = 'label' | 'dropdown' | 'inputText' | 'calender';

type ColumnConfig = {
  field: keyof jobapplications;
  header: string;
  componentType?: DataType;
};

const columnsConfiguration: Array<ColumnConfig> = [
  { field: 'jobapplicationsid', header: 'Job application id', componentType: 'label' },
  { field: 'resumeid', header: 'Resume id', componentType: 'inputText' },
  { field: 'progress', header: 'Progress', componentType: 'inputText' },
  { field: 'sentiment', header: 'Sentiment', componentType: 'inputText' },
  { field: 'joburl', header: 'Job url', componentType: 'inputText' },
  { field: 'whencreated', header: 'When applied', componentType: 'calender' }
];

const JobApplicationDataTable: FC<{ jobApplicationData: jobapplications[] }> = ({ jobApplicationData }) => {

  const onCellValueChange = (event: React.ChangeEvent<HTMLElement>, rowData: jobapplications, field: keyof jobapplications) => {
  };

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
            case 'calender':
              return <Calendar value={rowData[col.field]} />;
            case 'inputText':
              return <InputText type="text" value={rowData[col.field]} />;
            default:
              return <InputText disabled value={rowData[col.field]} />;
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
