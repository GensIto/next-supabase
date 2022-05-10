import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import { Task, Notice } from '../types/types'

export const getStaticProps: GetStaticProps = async () => {
  console.log('getStaticProps/ssg invoked')
  const { data: tasks } = await supabase
    .from('todos') //テーブルから
    .select('*') // どれを
    .order('created_at', { ascending: true }) // どの順番で
  const { data: notices } = await supabase
    .from('notices') //テーブルから
    .select('*') // どれを
    .order('created_at', { ascending: true }) // どの順番で

  return { props: { tasks, notices } }
}

type StaticProps = {
  tasks: Task[]
  notices: Notice[]
}

const Ssg: NextPage<StaticProps> = ({ tasks, notices }) => {
  const router = useRouter()
  return (
    <Layout title="SSG">
      <p className="mb-3 text-blue-500">SSG</p>
      <ul className="mb-3">
        {tasks.map((task) => (
          <li key={task.id}>
            <p className="text-lg font-extralight">{task.title}</p>
          </li>
        ))}
      </ul>
      <ul className="mb-3">
        {notices.map((notices) => (
          <li key={notices.id}>
            <p className="text-lg font-extralight">{notices.content}</p>
          </li>
        ))}
      </ul>
      <Link href="/ssr" prefetch={false}>
        <a className="my-3 text-xs">Link to ssr</a>
      </Link>
      {/* <Link href="/isr" prefetch={false}>
        <a className="my-3 text-xs">Link to isr</a>
      </Link> */}
      <button className="mb-3 text-xs" onClick={() => router.push('/ssr')}>
        Route to ssr
      </button>
      {/* <button className="mb-3 text-xs" onClick={() => router.push('/isr')}>
        Route to isr
      </button> */}
    </Layout>
  )
}

export default Ssg
