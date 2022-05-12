import { FC } from 'react'
import { useQueryNotices } from '../hooks/useQueryNotices'
import { Spinner } from './Spinner'
import { NoticeItem } from './NoticeItem'

export const NoticeList: FC = () => {
  const { data: Notices, status } = useQueryNotices()
  if (status === 'loading') return <Spinner />
  if (status === 'error') return <p>{'Error'}</p>

  return (
    <ul className="my-2">
      {Notices?.map((Notice) => (
        <NoticeItem
          key={Notice.id}
          id={Notice.id}
          content={Notice.content}
          user_id={Notice.user_id}
        />
      ))}
    </ul>
  )
}
