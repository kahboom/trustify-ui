import { RENDER_DATE_FORMAT } from "@app/Constants";
import { ToolbarChip } from "@patternfly/react-core";
import { AxiosError } from "axios";
import dayjs from "dayjs";

// Axios error

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAxiosErrorMessage = (axiosError: AxiosError<any>) => {
  if (
    axiosError.response &&
    axiosError.response.data &&
    axiosError.response.data.errorMessage
  ) {
    return axiosError.response.data.errorMessage;
  } else if (
    axiosError.response?.data?.error &&
    typeof axiosError?.response?.data?.error === "string"
  ) {
    return axiosError?.response?.data?.error;
  } else {
    return axiosError.message;
  }
};

// ToolbarChip

export const getToolbarChipKey = (value: string | ToolbarChip) => {
  return typeof value === "string" ? value : value.key;
};

// Dates

export const formatDate = (value?: string) => {
  return value ? dayjs(value).format(RENDER_DATE_FORMAT) : undefined;
};

export const duplicateFieldCheck = <T>(
  fieldKey: keyof T,
  itemList: T[],
  currentItem: T | null,
  fieldValue: T[keyof T]
) =>
  (currentItem && currentItem[fieldKey] === fieldValue) ||
  !itemList.some((item) => item[fieldKey] === fieldValue);

export const duplicateNameCheck = <T extends { name?: string }>(
  itemList: T[],
  currentItem: T | null,
  nameValue: T["name"]
) => duplicateFieldCheck("name", itemList, currentItem, nameValue);

export const dedupeFunction = (arr: any[]) =>
  arr?.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.value === value.value)
  );

export const numStr = (num: number | undefined): string => {
  if (num === undefined) return "";
  return String(num);
};

export const parseMaybeNumericString = (
  numOrStr: string | undefined | null
): string | number | null => {
  if (numOrStr === undefined || numOrStr === null) return null;
  const num = Number(numOrStr);
  return isNaN(num) ? numOrStr : num;
};

export const objectKeys = <T extends Object>(obj: T) =>
  Object.keys(obj) as (keyof T)[];

export const getValidatedFromErrors = (
  error: unknown | undefined,
  dirty: boolean | undefined,
  isTouched: boolean | undefined
) => {
  return error && (dirty || isTouched) ? "error" : "default";
};

export const getValidatedFromError = (error: unknown | undefined) => {
  return error ? "error" : "default";
};
