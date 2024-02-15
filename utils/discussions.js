const moment = require('moment')

function formatDiscussions(username, text){
    return{
        username,
        text,
        time: moment().format('h:mm a')
    }

}

module.exports = formatDiscussions;