export type MultiPurposeProps = {
  options?: string[];
  type: "label" | "button" | "select";
};

export enum UserType {
  WORKER = "worker",
  EMPLOYER = "employer",
  CONTRACTOR = "contractor",
}

export enum PlanType {
  FREE = "free",
  BASIC = "basic",
  PREMIUM = "premium",
  ENTERPRISE = "enterprise",
  PROFESSIONAL = "professional",
}

export enum BillingCycle {
  MONTHLY = "monthly",
  ANNUALLY = "annually",
  LIFETIME = "lifetime",
  QUARTERLY = "quarterly",
  SEMI_ANNUALLY = "semi_annually",
  PAY_AS_YOU_GO = "pay_as_you_go",
}


export enum Currency {
  INR = "INR",
}

export enum PlanStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum CommunityPrivacy {
  PUBLIC = "public",
  PRIVATE = "private",
}

export enum CommunityType {
  TECH = "tech",
  OTHER = "other",
  GAMING = "gaming",
  SPORTS = "sports",
  HEALTH = "health",
  GENERAL = "general",
  CREATIVE = "creative",
  BUSINESS = "business",
  EDUCATION = "education",
}

export enum CommunityStatus {
  ACTIVE = "active",
  ARCHIVED = "archived",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
}

export enum CourseStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  ARCHIVED = "archived",
  COMPLETED = "completed",
}

export enum PriorityLevel {
  LOW = "low",
  HIGH = "high",
  MEDIUM = "medium",
  CRITICAL = "critical",
}

export enum CourseType {
  ONLINE = "online",
  OFFLINE = "offline",
}

export type ColConfig = {
  key: string;
  image?: boolean;
  length?: number;
  prefix?: string;
  suffix?: string;
  joiner?: string;
  isAMPm?: boolean;
  isTime?: boolean;
  isDate?: boolean;
  fallback?: string;
  urlLink?: boolean;
  isPercent?: string;
  jsonFormat?: boolean;
  isDateTime?: boolean;
  isCurrency?: boolean;
  imageWithKey?: string;
  isMultiPurpose?: boolean;
  truncateWords?: boolean;
  multiPurposeProps?: MultiPurposeProps;
  transform?: "uppercase" | "lowercase" | "capitalize";
};

export interface FilterOption {
  label: string;
  value: string;
}

export interface FormField {
  customClasses?: any;
  name: string;
  label: string;
  type:
  "boolean"
  | "text"
  | "label"
  | "br"
  | "button"
  | "time"
  | "datetime"
  | "arrayOfString"
  | "warehouse"
  | "packing"
  | "billing"
  | "purchaseForm"
  | "productBillingForm"
  | "stockTransferForm"
  | "email"
  | "password"
  | "richTextEditor"
  | "file"
  | "date"
  | "multipleFiles"
  | "select"
  | "checkbox"
  | "radio"
  | "number"
  | "textarea"
  | "choose"
  | "stringNumeric"
  | "productForm";
  value?: any;
  rows?: number;
  min?: number;
  max?: number;
  minDate?: any;
  maxDate?: any;
  options?: any;
  accept?: string;
  maxFiles?: number;
  currentDate?: any;
  maxSizeMB?: number;
  maxLength?: number;
  minLength?: number;
  multiple?: boolean;
  isVideo?: boolean;
  required?: boolean;
  widthFull?: boolean;
  isMultiple?: boolean;
  placeholder?: string;
  confirmPlaceholder?: string;
  validation?: (value: any) => string | null;
  isDisabled?: boolean;
}
