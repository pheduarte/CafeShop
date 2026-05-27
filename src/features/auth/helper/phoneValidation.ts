import phoneNumberLib from "google-libphonenumber";

const phoneUtil = phoneNumberLib.PhoneNumberUtil.getInstance();

export const isPhoneValid = (phone: string, regionCode = "AU") => {
  if (!phone.trim()) {
    return false;
  }

  try {
    const parsedPhone = phoneUtil.parseAndKeepRawInput(phone, regionCode);
    return phoneUtil.isValidNumber(parsedPhone);
  } catch {
    return false;
  }
};