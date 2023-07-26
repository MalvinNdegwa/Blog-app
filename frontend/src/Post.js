import { formatISO9075 } from 'date-fns'
import { Link } from 'react-router-dom'

export default function Post({ _id, title, summary, cover, content, createdAt }) {
  return (
    <div className='post'>
      <div className='post--image'>
        <Link to={`/post/${_id}`}>
          <img src={'http://localhost:4000/' + cover} alt='' />
        </Link>

      </div>
      <div className='post--content'>
        <Link to={`/post/${_id}`}>
          <h2>
            {title}
          </h2>
        </Link>

        <p className='author--info'>
          <a className='author--name'>Malvin Ndegwa</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className='post--summary'>
          {summary}
        </p>
      </div>
    </div>
  )
}
