"use client"

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
        {data.map(post => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [originalPosts, setOriginalPosts] = useState([])

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)    
  }

  const handleTagClick = (tag) => {
    setSearchText(tag)
  }

  useEffect(() => {
    const filtered = originalPosts.filter(post => 
      post.prompt.includes(searchText) || 
      post.tag.includes(searchText) || 
      post.creator.username.includes(searchText)
    )
    setPosts(filtered)
  }, [searchText])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPosts(data)
      setOriginalPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed