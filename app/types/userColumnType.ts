import { users } from "@prisma/client";
import { dataTableComponentType } from "./dataTableComponentType";

export type userColumnType = {
    field: keyof users;
    header: string;
    dataTableComponentType?: dataTableComponentType;
  };
  