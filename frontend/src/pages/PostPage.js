import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { formatISO9075 } from 'date-fns'

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => response.json())
            .then(data => setPostInfo(data))
            .catch(error => console.error("Error fetching post:", error));
    }, [])

    if (!postInfo) return null;

    return (
        <div className="post--page">
            <h1>
                {postInfo.title}
            </h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="image">
                <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
            </div>
            <div className='content' dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>
    )
}
