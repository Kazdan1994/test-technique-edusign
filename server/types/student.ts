export interface StudentData {
  ID: string;
  id: string;
  EMAIL: string;
  FIRSTNAME: string;
  LASTNAME: string;
  USERNAME: string;
  PHOTO: null | string;
  PHONE: string;
  TRAINING_NAME: string;
  FILE_NUMBER: null | number;
  COMPANY: string;
  TAGS: string[];
  SIGNATURE_ID: string;
  HIDDEN: number;
  DATE_CREATED: string | null;
  DATE_UPDATED: string | null;
  MULTI_ACCOUNT_LOGIN_CODE: number;
  SCHOOL_ID: string;
  BADGE_ID: string;
  API_ID: string;
  API_TYPE: string;
  LANGUAGE: string;
  NEW_PASSWORD_NEEDED: number;
  STUDENT_FOLLOWER_ID: string[];
  GROUPS: string[];
  VARIABLES: string[];
}
