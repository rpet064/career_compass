import { resume } from "@prisma/client";
import { dataTableComponentType } from "./dataTableComponentType";

export type resumeColumnType = {
  field: keyof resume;
  header: string;
  dataTableComponentType?: dataTableComponentType;
};