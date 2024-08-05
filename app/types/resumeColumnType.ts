import { resumes } from "@prisma/client";
import { dataTableComponentType } from "./dataTableComponentType";

export type resumeColumnType = {
  field: keyof resumes;
  header: string;
  dataTableComponentType?: dataTableComponentType;
};