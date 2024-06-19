import { FC } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { resume } from "@prisma/client";
import { InputText } from 'primereact/inputtext';
import { formatDate } from '../utility/dateFormatter';
import { FiTrash2 } from "react-icons/fi";
import globals from "../styles/global.module.css";
import { errorMessage, successMessage } from "../utility/toastMessages";
import { deleteResumeFromDatabase } from "../proxyApi/resume/deleteResumeFromDatabase"

const userid = 1;

type componentType = 'label' | 'dropdown' | 'inputText' | 'dateLabel' | 'deleteIcon';

type ColumnConfig = {
  field: keyof resume;
  header: string;
  componentType?: componentType;
};

const deleteResume = (resumeid: number) => {
  if(!resumeid){
    errorMessage("Unable to delete resume: resume id was blank")
    return;
  }

  if(!userid){
    errorMessage("Unable to delete resume: userid id was blank")
    return;
  }

  let isResumeDeleted = deleteResumeFromDatabase(userid, resumeid)
  if(!isResumeDeleted){
    errorMessage("Unable to delete resume")
    return;
  }
  successMessage("Resume successfully deleted")
}

const columnsConfiguration: Array<ColumnConfig> = [
  { field: 'resumeid', header: 'Resume Id', componentType: 'label' },
  { field: 'resumename', header: 'Name', componentType: 'inputText' },
  { field: 'resumedescription', header: 'Description', componentType: 'inputText' },
  { field: 'resumeurl', header: 'URL', componentType: 'inputText' },
  { field: 'whencreated', header: 'When Created', componentType: 'dateLabel' },
  { field: 'whendeleted', header: 'When Deleted', componentType: 'deleteIcon' },
];

const ResumeDataTable: FC<{ resumeData: resume[]}> = ({ resumeData }) => {

  if (Array.isArray(resumeData)) {
  return (
    <DataTable value={resumeData}>
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
