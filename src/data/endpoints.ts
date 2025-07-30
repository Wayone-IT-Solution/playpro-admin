const operations = {
  read: true,
  create: true,
  update: true,
  delete: true,
  hidePreview: true,
};

export const endpoints: any = {
  User: { url: "api/user", operations: operations },
  Banner: { url: "api/banner", operations: operations },
  Employee: { url: "api/admin", operations: operations },
  "Ad Video": { url: "api/video", operations: operations },
  OTP: { url: "api/user/otp/all", operations: operations },
  City: { url: "api/location/city", operations: operations },
  Agent: { url: "api/support/agents", operations: operations },
  State: { url: "api/location/state", operations: operations },
  "Customer Support": { url: "api/query", operations: operations },
  Country: { url: "api/location/country", operations: operations },
  "Uploaded Bills": { url: "api/billupload", operations: operations },
  "Redeem Request": { url: "api/transaction", operations: operations },
  Payments: { url: "api/ride?status=completed", operations: operations },
};
