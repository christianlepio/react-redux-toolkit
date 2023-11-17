//useDispatch is to call/use global actions from postsSlice
import { useDispatch } from "react-redux"
import { reactionAdded } from "../features/posts/postsSlice"

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionButtons = ({ post }) => {
    //initialize dispatch
    const dispatch = useDispatch()

    //map reactionEmoji and get its key and value
    //key: name
    //value: emoji
    const reactionButons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button 
                key={name}
                type="button"
                className="btn btn-outline-secondary mx-1 rounded-5 fs-3"
                onClick={
                    //call reactionAdded action inside dispatch
                    //pass postId and reaction parameter
                    () => dispatch(reactionAdded({ postId: post.id, reaction: name }))
                }
            >
                {emoji} {post.reactions[name]}
            </button>
        )
    })

    return (
        <div>{reactionButons}</div>
    )
}

export default ReactionButtons