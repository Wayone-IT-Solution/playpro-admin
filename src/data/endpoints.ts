const operations = {
  read: true,
  create: true,
  update: true,
  delete: true,
  hidePreview: true,
};

export const endpoints: any = {
  User: { url: "api/user/user", operations: operations },
  Blog: { url: "api/blog", operations: operations },
  Banner: { url: "api/banner", operations: operations },
  Employee: { url: "api/admin", operations: operations },
  Bookings: { url: "api/booking", operations: operations },
  "Completed Bookings": {
    url: "api/booking/completed",
    operations: operations,
  },
  "Pending Bookings": { url: "api/booking/pending", operations: operations },
  "Rescheduled Bookings": {
    url: "api/booking/rescheduled",
    operations: operations,
  },
  "Confirmed Bookings": {
    url: "api/booking/confirmed",
    operations: operations,
  },
  Transaction: {
    url: "api/booking/transactions",
    operations: operations,
  },
   "Paid Transaction": {
    url: "api/booking/transactions/paid",
    operations: operations,
  },
   "Pending Transaction": {
    url: "api/booking/transactions/pending",
    operations: operations,
  },
   "Failed Transaction": {
    url: "api/booking/transactions/failed",
    operations: operations,
  },
  "Ground Listing": { url: "api/ground", operations: operations },
  Reviews: { url: "api/review", operations: operations },
  Slots: { url: "api/slot", operations: operations },
  Testimonials: { url: "api/testimonial", operations: operations },
  "Property Owner": { url: "api/user/ground_owner", operations: operations },
  "Ad Video": { url: "api/video", operations: operations },
  OTP: { url: "api/user/otp/all", operations: operations },
  City: { url: "api/location/city", operations: operations },
  Agent: { url: "api/support/agents", operations: operations },
  State: { url: "api/location/state", operations: operations },
  "Blog Category": { url: "api/category", operations: operations },
  "Customer Support": { url: "api/query", operations: operations },
  Country: { url: "api/location/country", operations: operations },
  "Uploaded Bills": { url: "api/billupload", operations: operations },
  "Redeem Request": { url: "api/transaction", operations: operations },
  Payments: { url: "api/ride?status=completed", operations: operations },
};
