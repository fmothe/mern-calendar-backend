const moment = require('moment')


const isDate = (value) => {

    if(!value){
        return false
    }

    const fecha = moment(value)

    if(fecha.isValid()){
        return true
    }else{
        return false
    }

}

const isValidDate = (value) => {
    const todayDate = moment()
    const eventDate = moment(value)

    if(!value){
        return false
    }

    if(eventDate.isBefore(todayDate)){
        return false
    }else if(!eventDate.isValid()){
        return false
    }else{
        return true
    }

}



module.exports= {
    isDate,
    isValidDate
}