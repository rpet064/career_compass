import { FC } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { resume } from "@prisma/client";
import { InputText } from 'primereact/inputtext';
import { formatDate } from '../utility/dateFormatter';
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import globals from "../styles/global.module.css";
import { errorMessage, successMessage } from "../utility/toastMessages";
import { deleteResumeFromDatabase } from "../proxyApi/resume/deleteResumeFromDatabase";
import { dataTableComponentType } from "../interfaces/dataTableComponentType";
import { useNavigationWithParams } from "../utility/navigation"

const userid = 1;

type ColumnConfig = {
  field: keyof resume;
  header: string;
  dataTableComponentType?: dataTableComponentType;
};

const deleteResume = (resumeid: number) => {
  if (!resumeid) {
    errorMessage("Unable to delete resume: resume id was blank")
    return;
  }

  if (!userid) {
    errorMessage("Unable to delete resume: userid id was blank")
    return;
  }

  let isResumeDeleted = deleteResumeFromDatabase(userid, resumeid)
  if (!isResumeDeleted) {
    errorMessage("Unable to delete resume")
    return;
  }
  location.reload();
}

const columnsConfiguration: Array<ColumnConfig> = [
  { field: 'resumeid', header: 'Resume', dataTableComponentType: 'redirectLink' },
  { field: 'resumename', header: 'Name', dataTableComponentType: 'label' },
  { field: 'resumedescription', header: 'Description', dataTableComponentType: 'label' },
  { field: 'resumeurl', header: 'URL', dataTableComponentType: 'label' },
  { field: 'whencreated', header: 'When Created', dataTableComponentType: 'dateLabel' },
  { field: 'resumeid', header: '', dataTableComponentType: 'editIcon' },
  { field: 'whendeleted', header: '', dataTableComponentType: 'deleteIcon' },
];

const ResumeDataTable: FC<{ resumeData: resume[] }> = ({ resumeData }) => {

  let navigateWithParams = useNavigationWithParams();
    
  if (Array.isArray(resumeData)) {
    return (
      <DataTable value={resumeData}>
        {columnsConfiguration.map((col, index) => (
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
                  case 'redirectLink':
                    return  <button className={globals.dataTableButton} type="button"
                    onClick={() => navigateWithParams('/manage-resume', 'id', rowData.resumeid)}>{rowData.resumeid}</button>
                  case 'editIcon':
                    return  <button className={globals.dataTableButton} type="button"
                      onClick={() => navigateWithParams('/manage-job-application', 'id', rowData.resumeid)}>
                      <FiEdit2 className={globals.editIconStyle}/></button>
                case 'deleteIcon':
                  return <FiTrash2 className={globals.deleteIconStyle} onClick={() => (deleteResume(rowData.resumeid))} />
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
