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
import { dataTableComponentType } from "../types/dataTableComponentType";
import { userColumnConfiguration } from '@/configurations/userColumnConfiguration';

const roleId = 1;

type ColumnConfig = {
    field: keyof users;
    header: string;
    dataTableComponentType?: dataTableComponentType;
};

const deleteUser = (userid: number| null) => {
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

const UserDataTable: FC<{ userData: users[] }> = ({ userData }) => {

    if (Array.isArray(userData)) {
        return (
            <DataTable value={userData}>
                {userColumnConfiguration.map((col, index) => (
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