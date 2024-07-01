import { FC } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { jobapplications } from "@prisma/client";
import { InputText } from 'primereact/inputtext';
import { formatDate } from '../utility/dateFormatter';
import { FiTrash2 } from "react-icons/fi";
import globals from "../styles/global.module.css";
import { errorMessage, successMessage } from "../utility/toastMessages";
import { deleteJobApplication } from "../proxyApi/jobApplication/deleteJobApplication"
import { dataTableComponentType } from "../interfaces/dataTableComponentType";

const userid = 1;

type ColumnConfig = {
  field: keyof jobapplications;
  header: string;
  dataTableComponentType?: dataTableComponentType;
};

const deleteApplication = (jobapplicationsid: number) => {
  if (!jobapplicationsid) {
    errorMessage("Unable to delete job application: job application id was blank");
    return;
  }
  let isJobApplicationDeleted = deleteJobApplication(jobapplicationsid, userid);

  if (!isJobApplicationDeleted) {
    errorMessage("Unable to delete job application");
    return;
  }
  location.reload();
}

const columnsConfiguration: Array<ColumnConfig> = [
  { field: 'jobapplicationsid', header: 'Application id', dataTableComponentType: 'redirectLink' },
  { field: 'resumeid', header: 'Resume id', dataTableComponentType: 'inputText' },
  { field: 'progress', header: 'Progress', dataTableComponentType: 'inputText' },
  { field: 'sentiment', header: 'Sentiment', dataTableComponentType: 'inputText' },
  { field: 'joburl', header: 'Job url', dataTableComponentType: 'inputText' },
  { field: 'whencreated', header: 'When applied', dataTableComponentType: 'dateLabel' },
  { field: 'whendeleted', header: '', dataTableComponentType: 'deleteIcon' },
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
              switch (col.dataTableComponentType) {
                case 'dateLabel':
                  return <span>{formatDate(rowData[col.field])}</span>;
                case 'inputText':
                  const safeValue = rowData[col.field] ?? "";
                  return <InputText type="text" value={safeValue} />;
                case 'redirectLink':
                  return <h1>Hey</h1>
                  // return (<Routes><Route path="/details/:id" Component={ManageJobApplication}/></Routes>)
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
