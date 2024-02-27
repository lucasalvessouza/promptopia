"use client"

import Profile from '@components/Profile'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const MyProfile = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await fetch(`/api/users/${session.user?.id}/posts`)
      const data = await response.json()
      setPosts(data)
    }
    if(session?.user?.id) {
      fetchUserPosts()
    }
  }, [session])

  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
    if(!hasConfirmed) {
      return
    }
    try {
      await fetch(`/api/prompt/${post._id}`, {
        method: 'DELETE'
      })
      
      setPosts(previous => previous.filter(p => p._id !== post._id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      data={posts}
    />
  )
}

export default MyProfile