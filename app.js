// React components go here

const ForumApp = () => {
    // State to manage posts
    const [posts, setPosts] = React.useState([]);

    // Function to add a new post
    const addPost = (newPost) => {
        setPosts([...posts, newPost]);
    };

    return (
        <div>
            <h1>Discussion Forum</h1>
            <PostList posts={posts} onAddPost={addPost} />
        </div>
    );
};

const PostList = ({ posts, onAddPost, parentId }) => {
    return (
        <ul>
            {posts
                .filter(post => post.parentId === parentId)
                .sort((a, b) => a.timestamp - b.timestamp)
                .map(post => (
                    <li key={post.id}>
                        <Post post={post} onAddPost={onAddPost} />
                        <PostList posts={posts} onAddPost={onAddPost} parentId={post.id} />
                    </li>
                ))}
        </ul>
    );
};

const Post = ({ post, onAddPost }) => {
    // State to manage reply form visibility
    const [showReplyForm, setShowReplyForm] = React.useState(false);

    // State to manage new reply content
    const [replyContent, setReplyContent] = React.useState('');

    // Function to handle adding a reply
    const handleAddReply = () => {
        const newReply = {
            id: generateUniqueId(), // You should implement a function to generate unique IDs
            content: replyContent,
            parentId: post.id,
            timestamp: Date.now(),
        };

        onAddPost(newReply);
        setReplyContent('');
        setShowReplyForm(false);
    };

    return (
        <div>
            <div>{post.content}</div>
            {showReplyForm && (
                <div>
                    <textarea
                        rows="3"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                    ></textarea>
                    <button onClick={handleAddReply}>Reply</button>
                </div>
            )}
            <button onClick={() => setShowReplyForm(!showReplyForm)}>
                {showReplyForm ? 'Cancel' : 'Reply'}
            </button>
        </div>
    );
};

// Render the main app
ReactDOM.render(<ForumApp />, document.getElementById('root'));