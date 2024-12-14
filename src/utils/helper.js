export function displayByLanguage(currentLang,resFiled,res){
    console.log("hi name >>>",currentLang,"cc",resFiled,"cc",res)
   if (currentLang == "ar" && res[`ar_${resFiled}`] ){
    console.log("in hhhh >>>>",res[`ar_${resFiled}`] )
        return  res[`ar_${resFiled}`] 
    }
    else {
        console.log("in hhhh not nooo >>",res[`${resFiled}`] )
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