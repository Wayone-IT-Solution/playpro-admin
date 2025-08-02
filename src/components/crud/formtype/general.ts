import { FormField } from "@/hooks/types";

export const bannerFormFields: FormField[] = [
  {
    type: "text",
    name: "title",
    required: true,
    label: "Banner title",
    placeholder: "Enter banner title",
  },
  {
    min: 0,
    type: "number",
    name: "order",
    required: true,
    label: "Banner Order",
    placeholder: "Enter order number",
  },
  {
    type: "choose",
    name: "isActive",
    label: "Is Active?",
  },
  {
    rows: 7,
    type: "textarea",
    name: "description",
    label: "Description",
    placeholder: "Provide a short description about the banner",
  },
  {
    type: "file",
    name: "image",
    required: true,
    label: "Image URL",
    placeholder: "Enter course image URL",
  },
];

export const videoFormFields: FormField[] = [
  {
    type: "number",
    name: "minAmount",
    required: true,
    label: "Minimum Amount",
    placeholder: "Enter minimum amount",
  },
  {
    type: "number",
    name: "maxAmount",
    required: true,
    label: "Maximum Amount",
    placeholder: "Enter maximum amount",
  },
  {
    type: "number",
    name: "duration",
    required: true,
    label: "Duration (in seconds)",
    placeholder: "Enter duration in seconds",
  },
  {
    type: "file",
    required: true,
    name: "imageUrl",
    label: "Image URL",
    placeholder: "Enter video poster image URL",
  },
  {
    type: "file",
    name: "video",
    isVideo: true,
    required: true,
    label: "Video URL",
  },
];

export const countryFormField: FormField[] = [
  {
    type: "text",
    name: "name",
    label: "Country Name",
    placeholder: "Enter country name",
    required: true,
  },
  {
    type: "text",
    name: "code",
    label: "Country Code",
    placeholder: "Enter Country Code",
    required: true,
  },
];

export const stateFormField: FormField[] = [
  {
    options: [],
    required: true,
    type: "select",
    label: "Country",
    name: "countryId",
    placeholder: "Select country",
  },
  {
    type: "text",
    name: "name",
    label: "State Name",
    placeholder: "Enter State name",
    required: true,
  },
  {
    type: "text",
    name: "code",
    label: "State Code",
    placeholder: "Enter State Code",
    required: true,
  },
];

export const cityFormField: FormField[] = [
  {
    options: [],
    required: true,
    type: "select",
    label: "Country",
    name: "countryId",
    placeholder: "Select country",
  },
  {
    options: [],
    required: true,
    type: "select",
    label: "State",
    name: "stateId",
    placeholder: "Select state",
  },
  {
    type: "text",
    name: "name",
    label: "City Name",
    placeholder: "Enter City name",
    required: true,
  },
];

export const paymentField: FormField[] = [
  {
    options: [
      { label: "pending", value: "Pending" },
      { label: "approved", value: "Approved" },
    ],
    type: "select",
    name: "status",
    required: true,
    label: "Select payment status",
    placeholder: "Choose payment status",
  },
  {
    type: "date",
    name: "processedAt",
    label: "Processed At",
    placeholder: "Select Date",
  },
  {
    rows: 1,
    name: "remark",
    widthFull: true,
    type: "textarea",
    label: "Remarks",
    placeholder: "Provide a short remarks about the Redeem Request",
  },
];

export const queryField: FormField[] = [
  {
    options: [
      { label: "pending", value: "Pending" },
      { label: "rejected", value: "rejected" },
      { label: "resolved", value: "resolved" },
    ],
    type: "select",
    name: "status",
    required: true,
    label: "Select payment status",
    placeholder: "Choose payment status",
  },
  {
    rows: 1,
    name: "response",
    type: "textarea",
    label: "Add a Response",
    placeholder: "Provide a short response about the ",
  },
];
export const testimonialField: FormField[] = [
  {
    name: "name",
    label: "Testimonial",
    type: "text",
    required: true,
    placeholder: "Enter Testimonial",
  },
  {
    type: "textarea",
    rows: 1,
    name: "feedback",
    label: "Feedback",
    required: true,
    placeholder: "Enter Feedback",
  },
  {
    type: "number",
    name: "rating",
    label: "Rating",
    required: true,
    placeholder: "Provide Rating",
    min: 1,
    max: 5,
  },
  {
    type: "choose",
    name: "isActive",
    label: "Is Active?",
  },
  {
    type: "choose",
    name: "isVerified",
    label: "Is Verified?",
  },
  {
    type: "file",
    name: "image",
    label: "Image",
    placeholder: "Enter Image",
  },
];

export const blogField: FormField[] = [
  {
    type: "text",
    name: "title",
    label: "Title",
    required: true,
    placeholder: "Enter Title",
  },
  {
    options: [],
    required: true,
    type: "select",
    name: "categoryId",
    label: "Select category",
    placeholder: "Select Category",
  },
  {
    type: "choose",
    name: "isActive",
    label: "Active",
  },
  {
    rows: 7,
    type: "textarea",
    name: "short_description",
    label: "Short Description",
    placeholder: "Enter short description",
    required: true,
  },
  {
    type: "file",
    required: true,
    name: "imageUrl",
    label: "Upload Blog Cover Image",
  },
  {
    rows: 1,
    required: true,
    widthFull: true,
    name: "description",
    label: "Description",
    type: "richTextEditor",
  },
];
export const categoryField: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    maxLength: 50,
    minLength: 2,
    placeholder: "Enter Name",
  },
  {
    name: "type",
    label: "Type",
    type: "text",
    required: true,
    placeholder: "Enter any type",
  },
  {
    type: "choose",
    name: "isActive",
    label: "Active",
  },
  {
    rows: 1,
    widthFull: true,
    name: "description",
    label: "Description",
    type: "textarea",
    maxLength: 200,
    placeholder: "Enter Description",
  },
];

export const groundField: FormField[] = [
  {
    options: [],
    name: "userId",
    label: "Owner",
    type: "select",
    required: true,
    placeholder: "Select Property Owner",
  },
  {
    name: "name",
    label: "Ground Name",
    type: "text",
    required: true,
    placeholder: "Enter Ground Name",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    required: true,
    placeholder: "Enter Address",
  },

  {
    name: "pricePerHour",
    label: "Price per Hour (₹)",
    type: "number",
    required: true,
    placeholder: "Enter price",
  },
  {
    name: "latitude",
    label: "Latitude",
    type: "text",
    required: true,
    placeholder: "Enter latitude",
  },
  {
    name: "longitude",
    label: "Longitude",
    type: "text",
    required: true,
    placeholder: "Enter longitude",
  },
  {
    rows: 1,
    name: "description",
    label: "Description",
    type: "textarea",
    required: false,
    placeholder: "Optional description",
  },
  {
    name: "facilities",
    label: "Facilities",
    type: "select",
    isMultiple: true,
    required: false,
    options: [
      { label: "Parking", value: "parking" },
      { label: "Washroom", value: "washroom" },
      { label: "Lights", value: "lights" },
      { label: "Seating", value: "seating" },
    ],
  },
  {
    name: "images",
    label: "Images",
    type: "file",
    widthFull: true,
    required: false,
    multiple: true,
  },
];
