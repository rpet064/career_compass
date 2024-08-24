import { FC, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { jobapplications } from "@prisma/client";
import { InputText } from 'primereact/inputtext';
import { formatDate } from '../utility/dateFormatter';
import { FiTrash2 } from "react-icons/fi";
import globals from "../styles/global.module.css";
import { errorMessage, successMessage } from "../utility/toastMessages";
import { deleteJobApplication } from "../proxyApi/jobApplication/deleteJobApplication"
import { applicationDataTableColumnConfiguration } from '@/configurations/jobApplicationColumnConfiguration';
import { progressOptions } from '@/interfaces/progressOptions';
import { sentimentOptions } from '@/interfaces/sentimentOptions';

const userid = 1;

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

const JobApplicationDataTable: FC<{ jobApplicationData: jobapplications[] }> = ({ jobApplicationData }) => {
  if (Array.isArray(jobApplicationData)) {
    return (
      <DataTable value={jobApplicationData}>
        {applicationDataTableColumnConfiguration.map((col, index) => (
          <Column
            key={index}
            field={col.field}
            header={col.header}
            body={(rowData) => {
              switch (col.dataTableComponentType) {
                case 'label':
                  return <span>{rowData[col.field]}</span>;
                case 'dateLabel':
                  return <span>{formatDate(rowData[col.field])}</span>;
                case 'inputText':
                  const safeValue = rowData[col.field] ?? "";
                  return <InputText type="text" value={safeValue} />;
                case 'progressDropdown':
                  return <Dropdown value={rowData[col.field]} options={progressOptions} optionLabel="name" 
                    placeholder="Select progress" />
                case 'sentimentDropdown':
                  return <Dropdown value={rowData[col.field]} options={sentimentOptions} optionLabel="name" 
                    placeholder="Select sentiment" />
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