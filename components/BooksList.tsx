'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { formatAmountWithCommas } from '@/utils/amountComma';
import CardLoader from '@/components/cardLoader';
import { useRecoilState } from 'recoil';
import { bookState, pageState, hasMoreState } from '@/store/atoms/Books';
import { BookData, BookListData } from '@/utils/interface';
import { useQuery } from '@tanstack/react-query';

const BooksList = ({ listData }: { listData: BookListData }) => {
  const [books, setBooks] = useRecoilState<BookData[]>(bookState);
  const [page, setPage] = useRecoilState(pageState);
  const [hasMore, setHasMore] = useRecoilState(hasMoreState);

  useEffect(() => {
    if (listData) {
      const { data, hasNext } = listData;
      setBooks(data);
      setHasMore(hasNext);
    }
  }, [listData, setBooks, setHasMore]);

  const { data } = useQuery({
    queryKey: ['booksList', page],
    queryFn: async () => {
      const response = await axios.get(`https://frontassignment.hyperhire.in/?page=${page}`);
      return response.data;
    },
    enabled: page > 1,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => lastPage.hasNext && lastPage.nextPage,
  });

  useEffect(() => {
    if (data) {
      const list = data.data;
      setBooks((prevData) => [...prevData, ...list]);
      setHasMore(data.hasNext);
    }
  }, [data, setBooks, setHasMore]);

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
