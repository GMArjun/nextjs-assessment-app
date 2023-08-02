import React from 'react';
import axios from 'axios';
import BooksList from '@/components/BooksList';

const Page = async () => {
  const bookListResponse = await axios.get(`http://15.165.74.54:3000/?page=1`);
  const result = bookListResponse.data;

  return (
    <div>
      <header className="sticky top-0 z-10 py-2 text-center bg-white">
        <nav className="text-lg font-bold grid grid-cols-3 max-w-xl mx-auto w-full px-3 min-[500px]:px-5 items-center">
          <span className="col-start-2">Books</span>
          <img
            src="/icons/profile.png"
            className="cursor-pointer h-8 w-8 min-[500px]:h-12 min-[500px]:w-12 ml-auto"
            alt="profile"
          />
        </nav>
      </header>
      <main>
        <BooksList booklist={result} />
      </main>
    </div>
  );
};

export default Page;
