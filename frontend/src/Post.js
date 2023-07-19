import { formatISO9075 } from 'date-fns'

export default function Post({ title, summary, cover, content, createdAt }) {
  return (
    <div className='post'>
      <div className='post--image'>
        <img src={'http://localhost:4000/' + cover} alt='' />
      </div>
      <div className='post--content'>
        <h2>
          {title}
        </h2>
        <p className='author--info'>
          <a className='author--name' >Malvin Ndegwa</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className='post--summary'>
          {summary}
        </p>
      </div>
    </div>
  )
}