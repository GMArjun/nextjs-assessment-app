'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { formatAmountWithCommas } from '@/utils/amountComma';
import CardLoader from '@/components/cardLoader';
import { useRecoilState } from 'recoil';
import { bookState, pageState, hasMoreState } from '@/store/atoms/Books';
import { BookListData, BookData } from '@/utils/interface';

const BooksList = ({ booklist }: { booklist: BookListData }) => {
  const [books, setBooks] = useRecoilState<BookData[]>(bookState);
  const [page, setPage] = useRecoilState(pageState);
  const [hasMore, setHasMore] = useRecoilState(hasMoreState);

  const fetchData = async (pageNumber: number) => {
    try {
      const response = await axios.get(`http://15.165.74.54:3000/?page=${pageNumber}`);
      const result = response.data;
      setBooks((prevData) => [...prevData, ...result.data]);
      setHasMore(result.hasNext);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (booklist && page == 1) {
      setBooks(booklist.data);
      setHasMore(booklist.hasNext);
    } else {
      fetchData(page);
    }
  }, [page]);

  const fetchMoreData = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <section className="max-w-xl mx-auto w-full min-[500px]:px-5">
      {books.length ? (
        <InfiniteScroll
          dataLength={books.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<div className="py-6 text-center text-gray-400 text-1xl">Loading</div>}
          endMessage={<p className="py-6 text-center text-gray-400">No more items to load.</p>}>
          <div className="grid grid-cols-2 min-[500px]:grid-cols-3 gap-1">
            {books.map((item, index) => (
              <Link href={`/detail/${index}`} key={index}>
                <div className="card">
                  <div className="aspect-square overflow-hidden">
                    <img src={item.coverImage} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="py-2 px-3">
                    <p className="font-medium truncate">{item.title}</p>
                    <p className="flex justify-between pt-2 gap-3">
                      <span className="text-[#FF003E] font-bold">{item.discountRate}%</span>
                      <span className="font-bold">
                        {formatAmountWithCommas(item.price)} <span className="font-medium">원</span>
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <CardLoader />
      )}
    </section>
  );
};

export default BooksList;
