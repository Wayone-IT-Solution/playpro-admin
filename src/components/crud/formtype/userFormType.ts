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


export const ownerFormType: FormField[] = [
  {
    type: "text",
    required: true,
    name: "firstName",
    label: "First Name",
    placeholder: "Enter first name",
  },
  {
    type: "text",
    required: true,
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter last name",
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
    type: "text",
    name: "phoneNumber",
    required: true,
    label: "Phone Number",
    placeholder: "Enter phone number",
  },
  {
    type: "date",
    name: "dateOfBirth",
    required: false,
    label: "Date of Birth",
    placeholder: "Select date of birth",
  },
  {
    name: "gender",
    type: "select",
    required: false,
    label: "Gender",
    placeholder: "Select gender",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
  },
  // {
  //   name: "role",
  //   type: "select",
  //   required: true,
  //   label: "User Role",
  //   placeholder: "Select user role",
  //   options: [
  //     { label: "Ground Owner", value: "ground_owner" },
  //     { label: "Admin", value: "admin" },
  //     { label: "Staff", value: "staff" },
  //   ],
  // },
  {
    type: "choose",
    name: "status",
    label: "Activate this user?",
    required: false,
  },
  {
    type: "br",
    label: "Business Details",
    name: "Business Details",
    widthFull: true
  },
  {
    type: "text",
    name: "businessDetail.businessName",
    label: "Business Name",
    placeholder: "Enter business name",
  },
  {
    type: "text",
    name: "businessDetail.gstNumber",
    label: "GST Number",
    placeholder: "Enter GST number",
  },
  {
    type: "text",
    name: "businessDetail.businessAddress",
    label: "Business Address",
    placeholder: "Enter business address",
  },
  {
    type: "br",
    label: "Contact Details",
    name: "Contact Details",
    widthFull: true
  },
  {
    type: "text",
    name: "contactDetail.alternatePhone",
    label: "Alternate Phone",
    placeholder: "Enter alternate phone number",
  },
  {
    type: "text",
    name: "contactDetail.emergencyContact",
    label: "Emergency Contact Name",
    placeholder: "Enter emergency contact name",
  },
  {
    type: "text",
    name: "contactDetail.emergencyPhone",
    label: "Emergency Phone",
    placeholder: "Enter emergency phone number",
  },
  // {
  //   type: "group",
  //   name: "userProfile",
  //   label: "Notification Preferences",
  //   fields: [
  //     {
  //       type: "checkbox",
  //       name: "sms",
  //       label: "SMS",
  //     },
  //     {
  //       type: "checkbox",
  //       name: "email",
  //       label: "Email",
  //     },
  //     {
  //       type: "checkbox",
  //       name: "push",
  //       label: "Push Notification",
  //     },
  //   ],
  // },
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


export const academyFormType: FormField[] = [
  {
    type: "text",
    name: "name.en",
    label: "Academy Name (English)",
    required: true,
    placeholder: "Enter academy name in English",
  },
  {
    type: "text",
    name: "name.ar",
    label: "Academy Name (Arabic)",
    required: false,
    placeholder: "Enter academy name in Arabic",
  },
  {
    type: "textarea",
    name: "description.en",
    label: "Description (English)",
    required: true,
    placeholder: "Enter description in English",
    rows: 3,
    widthFull: true,
  },
  {
    type: "textarea",
    name: "description.ar",
    label: "Description (Arabic)",
    required: false,
    placeholder: "Enter description in Arabic",
    rows: 3,
    widthFull: true,
  },
  {
    type: "select",
    name: "ground",
    label: "Ground",
    required: true,
    placeholder: "Select ground",
    options: [], // Populate dynamically with available grounds
  },
  {
    type: "select",
    name: "sports",
    label: "Sports",
    required: true,
    placeholder: "Select sports offered",
    options: [
      { value: "football", label: "Football" },
      { value: "basketball", label: "Basketball" },
      { value: "tennis", label: "Tennis" },
      { value: "swimming", label: "Swimming" },
      { value: "volleyball", label: "Volleyball" },
      { value: "badminton", label: "Badminton" },
      { value: "table_tennis", label: "Table Tennis" },
      { value: "karate", label: "Karate" },
      { value: "taekwondo", label: "Taekwondo" },
      { value: "gymnastics", label: "Gymnastics" },
    ],
  },
  {
    type: "select",
    name: "coaches",
    label: "Assigned Coaches",
    required: false,
    placeholder: "Select coaches",
    options: [], // Populate dynamically from /api/coaches
  },
  {
    type: "select",
    name: "status",
    label: "Academy Status",
    required: true,
    placeholder: "Select status",
    options: [
      { value: 'Active', label: "Active" },
      { value: 'Inactive', label: "Inactive" },
      { value: 'Closed', label: "Closed" },
    ],
  },
];



