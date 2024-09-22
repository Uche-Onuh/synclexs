export const maskEmail = (email) => {
  const [localPart, domain] = email.split("@");
  if (localPart.length > 2) {
    // Keep the first and last letters of the local part and mask the middle part
    const maskedLocalPart =
      localPart[0] +
      localPart.slice(1, -1).replace(/./g, "*") +
      localPart.slice(-1);
    return `${maskedLocalPart}@${domain}`;
  }
  // If the local part has 2 or fewer characters, display it as is
  return `${localPart}@${domain}`;
};


export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(value);
};

