import { jobapplications } from "@prisma/client";

export type jobApplicationColumnType = {
    field: keyof jobapplications;
    header: string;
    dataTableComponentType?: dataTableComponentType;
  };
  