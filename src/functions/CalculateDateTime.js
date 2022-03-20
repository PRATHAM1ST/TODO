var timediff = require('timediff');

export default function CalculateDateTime(databaseTimeStamp){
    let todaysTimeStamp = new Date()
    let diff = timediff(databaseTimeStamp, todaysTimeStamp);


    if(!diff.years){
        if(!diff.months){
            if(!diff.weeks){
                if(!diff.days){
                    if(!diff.hours){
                        if(!diff.minutes){
                            return(`${diff.seconds} Sec`);
                        }
                        return(`${diff.minutes} Min`);
                    }
                    return(`${diff.hours} Hrs`);
                }
                return(`${diff.days} Days`);
            }
            return(`${diff.weeks} Weeks`);
        }
        return(`${diff.months} Months`);
    }
    return(`${diff.years} Years`);

}