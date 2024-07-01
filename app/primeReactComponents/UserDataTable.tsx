import { FC } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { users } from "@prisma/client";
import { InputText } from 'primereact/inputtext';
import { formatDate } from '../utility/dateFormatter';
import { FiTrash2 } from "react-icons/fi";
import globals from "../styles/global.module.css";
import { errorMessage, successMessage } from "../utility/toastMessages";
import { deleteUserFromDatabase } from "../proxyApi/user/deleteUser"
import { useNavigationWithParams } from "../utility/navigation"

const userid = 1;
const roleId = 1;

type componentType = 'label' | 'dropdown' | 'inputText' | 'dateLabel' | 'deleteIcon';

type ColumnConfig = {
  field: keyof users;
  header: string;
  componentType?: componentType;
};

const deleteUser = (userid: number) => {
  if(!userid){
    errorMessage("Unable to delete user: user id was blank")
    return;
  }

  let isUserDeleted = deleteUserFromDatabase(userid, roleId)
  if(!isUserDeleted){
    errorMessage("Unable to delete user")
    return;
  }
  successMessage("User successfully deleted")
}

const columnsConfiguration: Array<ColumnConfig> = [
  { field: 'userid', header: 'User Id', componentType: 'label' },
  { field: 'title', header: 'Title', componentType: 'inputText' },
  { field: 'firstname', header: 'First Name', componentType: 'inputText' },
  { field: 'lastname', header: 'Last Name', componentType: 'inputText' },
  { field: 'roleid', header: 'Role', componentType: 'inputText' },
  { field: 'email', header: 'Email', componentType: 'inputText' },
  { field: 'whencreated', header: 'When Created', componentType: 'dateLabel' },
  { field: 'whendeleted', header: 'When Deleted', componentType: 'deleteIcon' },
];

const UserDataTable: FC<{ userData: users[] }> = ({ userData }) => {

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
                return <FiTrash2 className={globals.deleteIconStyle} onClick={() => (deleteUser(rowData.userid))} />
            default:
              return <span>{rowData[col.field]}</span>;
          }
        }}
      />
    ))}
  </DataTable>
  );
} else {
  return <div>No users found</div>;
}
};

export default UserDataTable;
