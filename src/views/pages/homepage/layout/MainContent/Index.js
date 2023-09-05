import React from 'react'
import CreatePost from './CreatePost'
import PostsLists from './PostLists';
const MainContent = () => {
    return (
        <main className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6 2xl:col-span-6  bg-black p-0 overflow-y-auto text-white border border-white w-full sm:w-10/12 lg:w-10/12 md:11/12 xl:w-11/12 2xl:w-8/12 mx-auto">
          <CreatePost />
          <PostsLists />
        </main>
      );
}

export default MainContent