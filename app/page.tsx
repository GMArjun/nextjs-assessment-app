'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { formatAmountWithCommas } from '@/utils/amountComma';
import CardLoader from "@/components/cardLoader";


const Page = () => {
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchData = async (pageNumber) => {
        try {
            const response = await axios.get(`http://15.165.74.54:3000/?page=${pageNumber}`);
            const result = response.data;
            setData((prevData) => [...prevData, ...result.data]);
            setHasMore(result.hasNext);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const fetchMoreData = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div>
            <header className='sticky top-0 z-10 py-2.5 text-center bg-white'>
                <nav className='text-lg font-bold grid grid-cols-3 max-w-4xl mx-auto w-full px-3 min-[500px]:px-6 items-center'>
                    <span className='col-start-2'>Books</span>
                    <img src="/icons/profile.png" className="cursor-pointer h-8 w-8 min-[500px]:h-12 min-[500px]:w-12 ml-auto" alt="profile" />
                </nav>
            </header>
            <main>
                <section className='max-w-4xl mx-auto w-full min-[500px]:px-6'>
                    <InfiniteScroll
                        dataLength={data.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<CardLoader />}
                        endMessage={<p className='py-6 text-center text-gray-400'>No more items to load.</p>}
                    >
                        <div className="grid grid-cols-2 min-[500px]:grid-cols-3 gap-1">

                            {data.map((item, index) => (
                                <Link href={`/detail/${index}`} key={index}>
                                    <div className='card'>
                                        <div className="aspect-square overflow-hidden">
                                            <img src={item.coverImage} className="w-full h-full object-cover" alt="" />
                                        </div>
                                        <div className="py-2 px-3">
                                            <p className='font-medium truncate'>{item.title}</p>
                                            <p className='flex justify-between pt-2 gap-3'>
                                                <span className='text-[#FF003E] font-bold'>{item.discountRate}%</span>
                                                <span className='font-bold'>{formatAmountWithCommas(item.price)} <span className='font-medium'>원</span></span>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </InfiniteScroll>
                </section>
            </main>
        </div>
    );
};

export default Page;
