import { FC } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { users } from "@prisma/client";
import { InputText } from 'primereact/inputtext';
import { formatDate } from '../utility/dateFormatter';
import { FiTrash2 } from "react-icons/fi";
import globals from "../styles/global.module.css";
import { errorMessage, successMessage } from "../utility/toastMessages";
import { deleteUser } from "../proxyApi/user/deleteUser"

const userid = 1;

type componentType = 'label' | 'dropdown' | 'inputText' | 'dateLabel' | 'deleteIcon';

type ColumnConfig = {
  field: keyof users;
  header: string;
  componentType?: componentType;
};

const deleteuser = (usersid: number) => {
  if(!usersid)
    errorMessage("Unable to delete job user: job user id was blank")

//   let isUserDeleted = deleteUser(userid)
const isUserDeleted = false;

  if(!isUserDeleted)
    errorMessage("Unable to delete job user")

  successMessage("Job user successfully deleted")
}

const columnsConfiguration: Array<ColumnConfig> = [
//   { field: 'usersid', header: 'user id', componentType: 'label' },
//   { field: 'resumeid', header: 'Resume id', componentType: 'inputText' },
//   { field: 'progress', header: 'Progress', componentType: 'inputText' },
//   { field: 'sentiment', header: 'Sentiment', componentType: 'inputText' },
//   { field: 'joburl', header: 'Job url', componentType: 'inputText' },
  { field: 'whencreated', header: 'When applied', componentType: 'dateLabel' },
  { field: 'whendeleted', header: '', componentType: 'deleteIcon' },
];

const userDataTable: FC<{ userData: users[] }> = ({ userData }) => {

  if (Array.isArray(userData)) {
  return (
    <DataTable value={userData}>
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
                return <FiTrash2 className={globals.deleteIconStyle} onClick={() => (deleteuser(rowData.usersid))} />
            default:
              return <span>{rowData[col.field]}</span>;
          }
        }}
      />
    ))}
  </DataTable>
  );
} else {
  return <div>No job users found</div>;
}
};

export default userDataTable;
