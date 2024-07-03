import { resume } from "@prisma/client";

export type resumeColumnType = {
  field: keyof resume;
  header: string;
  dataTableComponentType?: dataTableComponentType;
};