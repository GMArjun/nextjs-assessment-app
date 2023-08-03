'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CommentsBlock from '@/app/detail/components/comments';
import CommentInput from '@/app/detail/components/commentInput';
import { bookState } from '@/store/atoms/Books';
import { commentState } from '@/store/atoms/Comments';
import { usePathname } from 'next/navigation';
import { formatAmountWithCommas } from '@/utils/amountComma';
import { useRecoilState } from 'recoil';
import { BookData } from '@/utils/interface';

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split('/');
  const index = Number(parts[parts.length - 1]);
  const [books] = useRecoilState<BookData[]>(bookState);
  const [commentData] = useRecoilState(commentState);
  const book = books[index];
  useEffect(() => {
    if (!book) {
      router.push('/');
      return;
    }
  }, [book, router]);
  return (
    <div>
      {book && (
        <>
          <header className="sticky top-0 z-10 py-2.5 min-[500px]:h-16 flex items-center text-center bg-white">
            <nav className="text-lg font-bold grid grid-cols-[48px_1fr_48px] max-w-xl mx-auto w-full px-3 items-center">
              <Link href="/">
                <img src="/icons/arrow.png" className="cursor-pointer h-6 w-6 -ml-1 col-span-1" alt="arrow" />
              </Link>
              <span className="truncate">{book.title}</span>
            </nav>
          </header>
          <main>
            <section className="max-w-xl mx-auto w-full">
              <div className="slider relative w-full aspect-square mb-3">
                <div className="slide h-full bg-slate-100">
                  <img src={book.coverImage} className="h-full w-full object-contain" alt="Slider Image" />
                </div>
                <div className="bottom-8 flex left-1/2 gap-1 absolute -translate-x-2/4">
                  <div className="h-5 w-5 cursor-pointer flex justify-center items-center">
                    <span className="dot h-2 w-2 rounded-full bg-white block"></span>
                  </div>
                </div>
              </div>
              <div className="px-3">
                <p className="font-bold text-base">{book.title}</p>
                <p className="text-sm pt-2">{book.description}</p>
                <p className="flex justify-between py-4 gap-3">
                  <span className="text-[#FF003E] font-bold">{book.discountRate}%</span>
                  <span className="font-bold">
                    {formatAmountWithCommas(book.price)} <span className="font-medium">원</span>
                  </span>
                </p>
              </div>

              <div className="py-4 border-t-2 border-slate-100">
                <div className="px-3">
                  {commentData.map((item, index) => (
                    <CommentsBlock key={index} comments={item}>
                      {item.replies?.length &&
                        item.replies.map((subitem, subindex) => (
                          <CommentsBlock comments={subitem} key={subindex}></CommentsBlock>
                        ))}
                    </CommentsBlock>
                  ))}
                </div>
              </div>

              <CommentInput />
            </section>
          </main>
        </>
      )}
    </div>
  );
};

export default Page;
