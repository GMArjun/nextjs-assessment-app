import React from 'react';
import BooksList from '@/components/booksList';
import axios from 'axios';

async function getBooksData() {
  const res = await axios.get('https://frontassignment.hyperhire.in/?page=1');
  return res.status == 200 ? res.data : {};
}

const Page = async () => {
  const data = await getBooksData();
  return (
    <div>
      <header className="sticky top-0 z-10 py-2 text-center bg-white">
        <nav className="text-lg font-bold grid grid-cols-3 max-w-xl mx-auto w-full px-3 min-[500px]:px-5 items-center">
          <span className="col-start-2">Books</span>
          <img
            src="/icons/profile_2.png"
            className="cursor-pointer h-8 w-8 min-[500px]:h-12 min-[500px]:w-12 ml-auto"
            alt="profile"
          />
        </nav>
      </header>
      <main>
        <BooksList listData={data} />
      </main>
    </div>
  );
};

export default Page;
