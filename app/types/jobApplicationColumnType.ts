import { jobapplications } from "@prisma/client";
import { dataTableComponentType } from "./dataTableComponentType";

export type jobApplicationColumnType = {
    field: keyof jobapplications;
    header: string;
    dataTableComponentType?: dataTableComponentType;
  };
  