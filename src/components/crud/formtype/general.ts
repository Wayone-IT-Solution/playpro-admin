import { FormField } from "@/hooks/types";

export const bannerFormFields: FormField[] = [
  {
    type: "text",
    name: "title",
    required: true,
    label: "Banner Title",
    placeholder: "Enter the banner title (e.g., Summer Sale 2025)",
  },
  {
    type: "number",
    name: "order",
    required: true,
    min: 0,
    label: "Display Order",
    placeholder: "Enter the banner display order (e.g., 1 for top priority)",
  },
  {
    type: "choose",
    name: "isActive",
    required: true,
    label: "Banner Status",
    placeholder: "Select banner visibility status",
    options: [
      { label: "Active", value: true },
      { label: "Inactive", value: false },
    ],
  },
  {
    type: "textarea",
    name: "description",
    rows: 7,
    label: "Banner Description",
    placeholder: "Provide a detailed description (max 250 characters)",
  },
  {
    type: "file",
    name: "image",
    required: true,
    label: "Banner Image",
    placeholder: "Upload a high-quality image for the banner",
    accept: "image/*",
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
    placeholder: "Enter the full country name (e.g., United States)",
    required: true,
  },
  {
    type: "text",
    name: "code",
    label: "Country Code",
    placeholder: "Enter the ISO country code (e.g., US, IN, UK)",
    required: true,
  },
];

export const stateFormField: FormField[] = [
  {
    options: [],
    required: true,
    type: "select",
    label: "Select Country",
    name: "countryId",
    placeholder: "Choose the country this state belongs to",
  },
  {
    type: "text",
    name: "name",
    label: "State/Province Name",
    placeholder: "Enter the state or province name (e.g., California)",
    required: true,
  },
  {
    type: "text",
    name: "code",
    label: "State/Province Code",
    placeholder: "Enter the state/province code (e.g., CA, MH)",
    required: true,
  },
];

export const cityFormField: FormField[] = [
  {
    options: [],
    required: true,
    type: "select",
    label: "Select Country",
    name: "countryId",
    placeholder: "Choose the country for this city",
  },
  {
    options: [],
    required: true,
    type: "select",
    label: "Select State/Province",
    name: "stateId",
    placeholder: "Choose the state/province for this city",
  },
  {
    type: "text",
    name: "name",
    label: "City Name",
    placeholder: "Enter the city name (e.g., Los Angeles)",
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
      { label: "Pending", value: "Pending" },
      { label: "Rejected", value: "Rejected" },
      { label: "Resolved", value: "Resolved" },
    ],
    type: "select",
    name: "status",
    required: true,
    label: "Query Status",
    placeholder: "Select query status (Pending / Resolved / Rejected)",
  },
  {
    rows: 2,
    name: "response",
    type: "textarea",
    label: "Response",
    placeholder: "Write a brief response to address the query",
  },
];

// ====================== Testimonial Fields ======================
export const testimonialField: FormField[] = [
  {
    name: "name",
    label: "Customer Name",
    type: "text",
    required: true,
    placeholder: "Enter the customer's full name",
  },
  {
    type: "textarea",
    rows: 3,
    name: "feedback",
    label: "Customer Feedback",
    required: true,
    placeholder: "Share the customer’s feedback or testimonial",
  },
  {
    type: "number",
    name: "rating",
    label: "Customer Rating",
    required: true,
    placeholder: "Provide a rating between 1 and 5",
    min: 1,
    max: 5,
  },
  {
    type: "choose",
    name: "isActive",
    label: "Visible on Website?",
    placeholder: "Choose whether to display this testimonial",
  },
  {
    type: "choose",
    name: "isVerified",
    label: "Verified Testimonial?",
    placeholder: "Mark testimonial as verified",
  },
  {
    type: "file",
    name: "image",
    label: "Customer Image",
    placeholder: "Upload the customer's profile picture (optional)",
    accept: "image/*",
  },
];

// ====================== Blog Fields ======================
export const blogField: FormField[] = [
  {
    type: "text",
    name: "title",
    label: "Blog Title",
    required: true,
    placeholder: "Enter a catchy blog title",
  },
  {
    options: [],
    required: true,
    type: "select",
    name: "categoryId",
    label: "Blog Category",
    placeholder: "Select a category for this blog",
  },
  {
    type: "choose",
    name: "isActive",
    label: "Publish Status",
    placeholder: "Choose whether to publish this blog",
  },
  {
    rows: 5,
    type: "textarea",
    name: "short_description",
    label: "Short Description",
    placeholder: "Write a short summary (max 250 characters)",
    required: true,
  },
  {
    type: "file",
    required: true,
    name: "imageUrl",
    label: "Cover Image",
    placeholder: "Upload the blog cover image",
    accept: "image/*",
  },
  {
    rows: 1,
    required: true,
    widthFull: true,
    name: "description",
    label: "Full Blog Content",
    type: "richTextEditor",
    placeholder: "Write your blog content here...",
  },
];

// ====================== Category Fields ======================
export const categoryField: FormField[] = [
  {
    name: "name",
    label: "Category Name",
    type: "text",
    required: true,
    maxLength: 50,
    minLength: 2,
    placeholder: "Enter the category name (e.g., Technology, Lifestyle)",
  },
  {
    name: "type",
    label: "Category Type",
    type: "text",
    required: true,
    placeholder: "Specify the type (e.g., Blog, Product, Service)",
  },
  {
    type: "choose",
    name: "isActive",
    label: "Category Status",
    placeholder: "Select whether the category is active",
  },
  {
    rows: 2,
    widthFull: true,
    name: "description",
    label: "Category Description",
    type: "textarea",
    maxLength: 200,
    placeholder: "Provide a short description of the category",
  },
];

export const groundField: FormField[] = [
  {
    options: [],
    name: "userId",
    label: "Ground Owner",
    type: "select",
    required: true,
    placeholder: "Select the owner of this property",
  },
  {
    name: "name",
    label: "Ground Name",
    type: "text",
    required: true,
    placeholder: "Enter the official name of the ground",
  },
  {
    name: "status",
    label: "Ground Status",
    type: "select",
    required: true,
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
    placeholder: "Select availability status",
  },
  {
    name: "pricePerHour",
    label: "Rental Price (₹/hour)",
    type: "number",
    required: true,
    placeholder: "Enter price per hour",
  },
  {
    name: "latitude",
    label: "Latitude",
    type: "text",
    required: true,
    placeholder: "Enter latitude (e.g., 28.7041)",
  },
  {
    name: "longitude",
    label: "Longitude",
    type: "text",
    required: true,
    placeholder: "Enter longitude (e.g., 77.1025)",
  },
  {
    rows: 1,
    required: true,
    widthFull: true,
    name: "address",
    type: "textarea",
    label: "Ground Address",
    placeholder: "Enter full address of the ground",
  },
  {
    rows: 5,
    required: false,
    type: "textarea",
    name: "description",
    label: "Ground Description",
    placeholder: "Provide additional details about the ground (optional)",
  },
  {
    name: "facilities",
    label: "Available Facilities",
    type: "select",
    isMultiple: true,
    required: false,
    options: [
      // Basic Amenities
      { label: "Parking", value: "Parking" },
      { label: "Washroom/Restrooms", value: "Washroom/Restrooms" },
      { label: "Floodlights", value: "Floodlights" },
      { label: "Seating Area", value: "Seating Area" },
      { label: "Changing Rooms", value: "Changing Rooms" },
      { label: "Referee Room", value: "Referee Room" },
      { label: "First Aid Station", value: "First Aid Station" },
      { label: "Canteen/Refreshments", value: "Canteen/Refreshments" },
      { label: "Equipment Storage", value: "Equipment Storage" },

      // Advanced Technology & Infrastructure
      { label: "LED Scoreboard", value: "LED Scoreboard" },
      { label: "Digital Display Screens", value: "Digital Display Screens" },
      { label: "Stadium Wi-Fi Network", value: "Stadium Wi-Fi Network" },
      { label: "5G Connectivity", value: "5G Connectivity" },
      { label: "PA System with Zone Control", value: "PA System with Zone Control" },
      { label: "Video Analysis Room", value: "Video Analysis Room" },
      { label: "Live Streaming Setup", value: "Live Streaming Setup" },
      { label: "CCTV with Facial Recognition", value: "CCTV with Facial Recognition" },
      { label: "Access Control System", value: "Access Control System" },
      { label: "RFID Turnstiles", value: "RFID Turnstiles" },
      { label: "Biometric Entry System", value: "Biometric Entry System" },
      { label: "Smart Parking System", value: "Smart Parking System" },

      // Premium Facilities
      { label: "VIP Lounge", value: "VIP Lounge" },
      { label: "Corporate Boxes", value: "Corporate Boxes" },
      { label: "Executive Suites", value: "Executive Suites" },
      { label: "Premium Seating", value: "Premium Seating" },
      { label: "Hospitality Areas", value: "Hospitality Areas" },
      { label: "Private Dining Rooms", value: "Private Dining Rooms" },
      { label: "Conference Rooms", value: "Conference Rooms" },
      { label: "Business Center", value: "Business Center" },
      { label: "Rooftop Terrace", value: "Rooftop Terrace" },

      // Media & Broadcasting
      { label: "Media Box", value: "Media Box" },
      { label: "Press Conference Room", value: "Press Conference Room" },
      { label: "Broadcast Control Room", value: "Broadcast Control Room" },
      { label: "Commentary Boxes", value: "Commentary Boxes" },
      { label: "Camera Platforms", value: "Camera Platforms" },
      { label: "Satellite Uplink", value: "Satellite Uplink" },
      { label: "Radio Broadcasting Booth", value: "Radio Broadcasting Booth" },
      { label: "Interview Areas", value: "Interview Areas" },

      // Player Facilities
      { label: "Players' Lounge", value: "Players' Lounge" },
      { label: "Recovery/Ice Bath Room", value: "Recovery/Ice Bath Room" },
      { label: "Physiotherapy Center", value: "Physiotherapy Center" },
      { label: "Gym/Fitness Center", value: "Gym/Fitness Center" },
      { label: "Hydrotherapy Pool", value: "Hydrotherapy Pool" },
      { label: "Massage Rooms", value: "Massage Rooms" },
      { label: "Nutrition Center", value: "Nutrition Center" },
      { label: "Team Meeting Rooms", value: "Team Meeting Rooms" },
      { label: "Video Analysis Suites", value: "Video Analysis Suites" },
      { label: "Equipment Drying Room", value: "Equipment Drying Room" },

      // Medical & Safety
      { label: "Medical Room", value: "Medical Room" },
      { label: "Ambulance Bay", value: "Ambulance Bay" },
      { label: "Emergency Response Center", value: "Emergency Response Center" },
      { label: "Defibrillator Stations", value: "Defibrillator Stations" },
      { label: "Fire Safety System", value: "Fire Safety System" },
      { label: "Emergency Exits", value: "Emergency Exits" },
      { label: "Evacuation Routes", value: "Evacuation Routes" },
      { label: "Security Command Center", value: "Security Command Center" },

      // Field & Technical
      { label: "Hybrid Grass System", value: "Hybrid Grass System" },
      { label: "Undersoil Heating", value: "Undersoil Heating" },
      { label: "Advanced Irrigation", value: "Advanced Irrigation" },
      { label: "Drainage System", value: "Drainage System" },
      { label: "Goal-Line Technology", value: "Goal-Line Technology" },
      { label: "VAR Room", value: "VAR Room" },
      { label: "LED Perimeter Boards", value: "LED Perimeter Boards" },
      { label: "Retractable Roof", value: "Retractable Roof" },
      { label: "Climate Control System", value: "Climate Control System" },
      { label: "Pitch Covers", value: "Pitch Covers" },

      // Spectator Experience
      { label: "Fan Zone", value: "Fan Zone" },
      { label: "Kids Play Area", value: "Kids Play Area" },
      { label: "Interactive Museum", value: "Interactive Museum" },
      { label: "Merchandise Megastore", value: "Merchandise Megastore" },
      { label: "Food Courts", value: "Food Courts" },
      { label: "Craft Beer Garden", value: "Craft Beer Garden" },
      { label: "Mobile Charging Stations", value: "Mobile Charging Stations" },
      { label: "Digital Concierge", value: "Digital Concierge" },
      { label: "Mobile App Integration", value: "Mobile App Integration" },
      { label: "Contactless Payments", value: "Contactless Payments" },

      // Sustainability & Environment
      { label: "Solar Power System", value: "Solar Power System" },
      { label: "Rainwater Harvesting", value: "Rainwater Harvesting" },
      { label: "Waste Management System", value: "Waste Management System" },
      { label: "LED Lighting System", value: "LED Lighting System" },
      { label: "Green Roof Technology", value: "Green Roof Technology" },
      { label: "Electric Vehicle Charging", value: "Electric Vehicle Charging" },
      { label: "Water Recycling Plant", value: "Water Recycling Plant" },
      { label: "Carbon Neutral Systems", value: "Carbon Neutral Systems" },

      // Additional Advanced Features
      { label: "Helicopter Landing Pad", value: "Helicopter Landing Pad" },
      { label: "Underground Tunnels", value: "Underground Tunnels" },
      { label: "Multi-Purpose Event Space", value: "Multi-Purpose Event Space" },
      { label: "Hotel/Accommodation", value: "Hotel/Accommodation" },
      { label: "Training Pitches", value: "Training Pitches" },
      { label: "Academy Facilities", value: "Academy Facilities" },
      { label: "Research Center", value: "Research Center" },
      { label: "Sports Science Lab", value: "Sports Science Lab" },
      { label: "Weather Station", value: "Weather Station" },
      { label: "Transport Hub", value: "Transport Hub" },
      { label: "Metro/Subway Connection", value: "Metro/Subway Connection" },
      { label: "Parking Automation", value: "Parking Automation" },
      { label: "Smart Toilets", value: "Smart Toilets" },
      { label: "Holographic Displays", value: "Holographic Displays" },
      { label: "AI-Powered Analytics", value: "AI-Powered Analytics" },
      { label: "Drone Surveillance", value: "Drone Surveillance" },
      { label: "Virtual Reality Experience", value: "Virtual Reality Experience" },
      { label: "Augmented Reality Features", value: "Augmented Reality Features" },
      { label: "Sound Dampening System", value: "Sound Dampening System" },
      { label: "Retractable Seating", value: "Retractable Seating" },
      { label: "Multi-Sport Configuration", value: "Multi-Sport Configuration" },
    ],
    placeholder: "Select facilities available at the ground",
  },
  {
    name: "images",
    label: "Upload Ground Images",
    type: "file",
    widthFull: true,
    required: false,
    multiple: true,
    placeholder: "Upload multiple images (JPG, PNG, max 5MB each)",
    accept: "image/*",
  },
];
