import { FormField } from "@/hooks/types";
import { includes } from "@/hooks/polyfills";

export const userFormType: FormField[] = [
  {
    type: "text",
    required: true,
    name: "username",
    label: "Employee Name",
    placeholder: "Enter employee name",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    required: true,
    placeholder: "Enter your email",
    validation: (value) => (includes(value, "@") ? null : "Invalid email"),
  },
  {
    name: "role",
    type: "select",
    required: true,
    label: "Employee Role",
    placeholder: "Select user role",
    options: []
  },
  {
    type: "text",
    name: "password",
    label: "Enter Password",
    placeholder: "Enter password",
  },
  {
    type: "choose",
    name: "status",
    label: "Do you want to activate this employee?",
    required: false,
  },
];

export const coachFormType: FormField[] = [
  {
    type: "text",
    name: "name.en",
    label: "Coach Name (English)",
    required: true,
    placeholder: "Enter full name in English",
  },
  {
    type: "text",
    name: "name.ar",
    label: "Coach Name (Arabic)",
    required: false,
    placeholder: "Enter full name in Arabic",
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    required: true,
    placeholder: "Enter email address",
    validation: (value: string) =>
      value.includes("@") ? null : "Invalid email format",
  },
  {
    type: "text",
    name: "phoneNumber",
    label: "Phone Number",
    required: true,
    placeholder: "Enter phone number",
  },
  {
    type: "number",
    name: "experience",
    label: "Experience (Years)",
    required: true,
    placeholder: "Enter years of experience",
  },
  {
    type: "select",
    name: "status",
    required: true,
    label: "Coach Status",
    options: [
      { value: "Active", label: "active" },
      { value: "Inactive", label: "inactive" },
      { value: "Suspended", label: "suspended" },
    ],
    placeholder: "Select coach status",
  },
  {
    rows: 1,
    name: "bio.en",
    widthFull: true,
    type: "textarea",
    required: false,
    label: "Biography (English)",
    placeholder: "Write a short coach bio (max 1000 chars)",
  },
  {
    rows: 1,
    name: "bio.ar",
    widthFull: true,
    type: "textarea",
    required: false,
    label: "Biography (Arabic)",
    placeholder: "اكتب نبذة قصيرة عن المدرب",
  },
  {
    rows: 1,
    type: "text",
    required: true,
    name: "address.en",
    label: "Coach Address (EN)",
    placeholder: "Enter full coach address in English",
  },
  {
    rows: 1,
    type: "text",
    required: true,
    name: "address.ar",
    label: "عنوان المدرب (AR)",
    placeholder: "أدخل العنوان الكامل للمدرب باللغة العربية",
  },
  {
    type: "file",
    name: "profileImage",
    label: "Profile Image",
    required: true,
  },
];