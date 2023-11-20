import { parseISO, formatDistanceToNow } from "date-fns"

const TimeAgo = ({ timestamp }) => {
    let timeAgo = ''

    //define distance from creation datetime to current datetime
    if (timestamp) {
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }

    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    )
}

export default TimeAgo