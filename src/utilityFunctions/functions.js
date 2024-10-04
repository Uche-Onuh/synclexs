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

export function formatISODate(
  isoString,
  options = { year: "numeric", month: "long", day: "numeric" }
) {
  const date = new Date(isoString);

  // Format the date based on the given options or use default (e.g., 'September 23, 2024')
  return date.toLocaleDateString("en-US", options);
}


export const calculateCommission = (price, transactionType) => {
  let commission = 0;

  if (transactionType === "Mortgage") {
    if (price < 50000000) {
      commission = price * 0.04; // 4% for properties < ₦50m
    } else if (price >= 50000000 && price <= 100000000) {
      commission = 2000000 + (price - 50000000) * 0.03; // ₦2m + 3% for excess
    } else if (price > 100000000) {
      commission = 4500000 + (price - 100000000) * 0.02; // ₦4.5m + 2% for excess
    }
  } else {
    // Conveyance transactions
    if (price < 50000000) {
      commission = price * 0.1; // 10% for properties < ₦50m
    } else if (price >= 50000000 && price <= 100000000) {
      commission = 5000000 + (price - 50000000) * 0.05; // ₦5m + 5% for excess
    } else if (price > 100000000) {
      commission = 7500000 + (price - 100000000) * 0.02; // ₦7.5m + 2% for excess
    }
  }

  return commission;
};

