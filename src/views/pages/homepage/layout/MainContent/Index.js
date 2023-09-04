import React from 'react'
import CreatePost from './CreatePost'
import PostsLists from './PostLists';
const MainContent = () => {
    return (
        <main className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6 2xl:col-span-6  bg-black p-0 overflow-y-auto text-white border border-white">
          <CreatePost />
          <PostsLists />
        </main>
      );
}

export default MainContent