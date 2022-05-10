import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import { Task, Notice } from '../types/types'

const Csr: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [notices, setNotices] = useState<Notice[]>([])

  useEffect(() => {
    const getTasks = async () => {
      const { data: tasks } = await supabase
        .from('todos') //テーブルから
        .select('*') // どれを
        .order('created_at', { ascending: true }) // どの順番で
      setTasks(tasks as Task[])
    }
    const getNotices = async () => {
      const { data: notices } = await supabase
        .from('notices') //テーブルから
        .select('*') // どれを
        .order('created_at', { ascending: true }) // どの順番で
      setNotices(notices as Notice[])
    }
    getTasks()
    getNotices()
  }, [])

  return (
    <Layout title="CSR">
      <p className="mb-3 text-blue-500">SSG + CSR</p>
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
    </Layout>
  )
}

export default Csr
