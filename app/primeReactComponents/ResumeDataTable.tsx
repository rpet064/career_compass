import { FC, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { formatDate } from '../utility/dateFormatter';
import { FiTrash2 } from "react-icons/fi";
import globals from "../styles/global.module.css";
import { errorMessage, successMessage } from "../utility/toastMessages";
import { deleteResumeFromDatabase } from "../proxyApi/resume/deleteResumeFromDatabase";
import { dataTableComponentType } from "../types/dataTableComponentType";
import { resumeDataTableColumnConfiguration } from '@/configurations/resumeColumnConfiguration';
import { resumes } from '@prisma/client';

const deleteResume = (resumeid: number, userId: number| null) => {

  if (!resumeid) {
    errorMessage("Unable to delete resume: resume id was blank")
    return;
  }

  if (!userId) {
    errorMessage("Unable to delete resume: userid id was blank")
    return;
  }

  let isResumeDeleted = deleteResumeFromDatabase(userId, resumeid)
  if (!isResumeDeleted) {
    errorMessage("Unable to delete resume")
    return;
  }
  location.reload();
}

const ResumeDataTable: FC<{ resumeData: resumes[]; userIdParam: number | null }> = ({ resumeData, userIdParam }) => {

  const [userId, setUserId] = useState<number | null>(userIdParam);

  if (Array.isArray(resumeData)) {
    return (
      <DataTable value={resumeData}>
        {resumeDataTableColumnConfiguration.map((col, index) => (
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
                case 'deleteIcon':
                  return <FiTrash2 className={globals.deleteIconStyle} onClick={() => (deleteResume(rowData.resumeid, userId))} />
                default:
                  return <span>{rowData[col.field]}</span>;
              }
            }}
          />
        ))}
      </DataTable>
    );
  } else {
    return <div>No resumes found</div>;
  }
};

export default ResumeDataTable;
