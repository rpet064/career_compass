import { FC } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { jobapplications } from "@prisma/client";
import { InputText } from 'primereact/inputtext';
import { formatDate } from '../utility/dateFormatter';
import { FiTrash2 } from "react-icons/fi";
import globals from "../styles/global.module.css";
import { errorMessage, successMessage } from "../utility/toastMessages";
import { deleteJobApplication } from "../proxyApi/jobApplications/deleteJobApplication"

const userid = 1;

type componentType = 'label' | 'dropdown' | 'inputText' | 'dateLabel' | 'deleteIcon';

type ColumnConfig = {
  field: keyof jobapplications;
  header: string;
  componentType?: componentType;
};

const deleteApplication = (jobapplicationsid: number) => {
  if(!jobapplicationsid)
    errorMessage("Unable to delete job application: job application id was blank")

  deleteJobApplication(jobapplicationsid, userid)

  successMessage("Job application successfully deleted")
}

const columnsConfiguration: Array<ColumnConfig> = [
  { field: 'jobapplicationsid', header: 'Application id', componentType: 'label' },
  { field: 'resumeid', header: 'Resume id', componentType: 'inputText' },
  { field: 'progress', header: 'Progress', componentType: 'inputText' },
  { field: 'sentiment', header: 'Sentiment', componentType: 'inputText' },
  { field: 'joburl', header: 'Job url', componentType: 'inputText' },
  { field: 'whencreated', header: 'When applied', componentType: 'dateLabel' },
  { field: 'whendeleted', header: '', componentType: 'deleteIcon' },
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
                const safeValue = rowData[col.field]?? "";
                return <InputText type="text" value={safeValue} />;
              case 'deleteIcon':
                return <FiTrash2 className={globals.deleteIconStyle} onClick={() => (deleteApplication(rowData.jobapplicationsid))} />
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
