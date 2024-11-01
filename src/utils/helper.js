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