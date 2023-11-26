//generated custom hooks from extended api slice (RTK query)
import { useAddReactionMutation } from "../features/posts/postsSlice"

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionButtons = ({ post }) => {
    //initialize RTK query custom hooks mutation
    const [addReaction] = useAddReactionMutation()

    const handleIncreaseReaction = (name) => {
        //increase 1 to clicked reaction button
        const newValue = post.reactions[name] + 1
        //call addReaction function/mutation then pass postId and reactions params
        //overwrite the old reaction value with the newValue
        addReaction({ postId: post.id, reactions: { ...post.reactions, [name]: newValue } })
    }

    //map reactionEmoji and get its key and value
    //key: name
    //value: emoji
    const reactionButons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button 
                key={name}
                type="button"
                className="btn btn-outline-secondary mx-1 rounded-5 fs-6"
                onClick={
                    //pass name to function
                    () => handleIncreaseReaction(name)
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