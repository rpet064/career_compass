import { FC } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { users } from "@prisma/client";
import { InputText } from 'primereact/inputtext';
import { formatDate } from '../utility/dateFormatter';
import { FiTrash2 } from "react-icons/fi";
import globals from "../styles/global.module.css";
import { errorMessage, successMessage } from "../utility/toastMessages";
import { deleteUserFromDatabase } from "../proxyApi/user/deleteUser";
import { dataTableComponentType } from "../interfaces/dataTableComponentType";
import { useNavigationWithParams } from "../utility/navigation"

const userid = 1;
const roleId = 1;

type ColumnConfig = {
    field: keyof users;
    header: string;
    dataTableComponentType?: dataTableComponentType;
};

const deleteUser = (userid: number) => {
    if (!userid) {
        errorMessage("Unable to delete user: user id was blank")
        return;
    }

    let isUserDeleted = deleteUserFromDatabase(userid, roleId)
    if (!isUserDeleted) {
        errorMessage("Unable to delete user")
        return;
    }
    location.reload();
}

const columnsConfiguration: Array<ColumnConfig> = [
    { field: 'userid', header: 'User Id', dataTableComponentType: 'redirectLink' },
    { field: 'title', header: 'Title', dataTableComponentType: 'inputText' },
    { field: 'firstname', header: 'First Name', dataTableComponentType: 'inputText' },
    { field: 'lastname', header: 'Last Name', dataTableComponentType: 'inputText' },
    { field: 'roleid', header: 'Role', dataTableComponentType: 'inputText' },
    { field: 'email', header: 'Email', dataTableComponentType: 'inputText' },
    { field: 'whencreated', header: 'When Created', dataTableComponentType: 'dateLabel' },
    { field: 'whendeleted', header: 'When Deleted', dataTableComponentType: 'deleteIcon' },
];

const UserDataTable: FC<{ userData: users[] }> = ({ userData }) => {
    let navigateWithParams = useNavigationWithParams();
    if (Array.isArray(userData)) {
        return (
            <DataTable value={userData}>
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
                                    return  <button
                                    type="button"
                                    onClick={() => navigateWithParams('/manage-user', 'id', rowData.userid)}></button>
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