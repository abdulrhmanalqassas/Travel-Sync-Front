export function displayByLanguage(currentLang,resFiled,res){

   if (currentLang == "ar" && res[`ar_${resFiled}`] ){

        return  res[`ar_${resFiled}`] 
    }
    else {
 
        return res[resFiled]
    }


}

export function formatDayAndTime(isoString) {
    const date = new Date(isoString);
  const day =  new Date(isoString).toDateString()
    // Options for date formatting
   
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      
    };

  // Format the day and time

  const time = date.toLocaleTimeString("en-US", timeOptions);

  return `${day} ${time}`;
}