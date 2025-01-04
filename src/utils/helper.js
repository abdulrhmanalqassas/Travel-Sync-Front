export function displayByLanguage(currentLang, resFiled, res) {
  if (currentLang == "ar" && res[`ar_${resFiled}`]) {
    return res[`ar_${resFiled}`];
  } else {
    return res[resFiled];
  }
}

export function formatDayAndTime(isoString) {
  const date = new Date(isoString);
  const day = new Date(isoString).toDateString();
  // Options for date formatting

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  // Format the day and time

  const time = date.toLocaleTimeString("en-US", timeOptions);

  return `${day} ${time}`;
}

// // To get the date in English
// const formattedDateEnglish = convertDateToFormat(isoDate, 'en');
// console.log(`English: ${formattedDateEnglish}`); // Output: 20/05/2024, 18:05:36

// // To get the date in Arabic
// const formattedDateArabic = convertDateToFormat(isoDate, 'ar');
// console.log(`Arabic: ${formattedDateArabic}`);  // Output: ٢٠/٠٥/٢٠٢٤ ١٨:٠٥:٣٦

export function convertDateToFormat(isoDate, language) {
  const date = new Date(isoDate);
  const lang = language == "ar" ? "ar-EG" : "en-GB";
  // Format options
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
    hour12: false,
  };

  // Create a formatter based on the specified language
  const formatter = new Intl.DateTimeFormat(lang, options);
  return formatter.format(date);
}
