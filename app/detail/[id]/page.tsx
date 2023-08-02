"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { bookState } from "@/store/atoms/Books";
import { commentState } from "@/store/atoms/Comments";
import { usePathname } from "next/navigation";
import { formatAmountWithCommas } from "@/utils/amountComma";
import { useRecoilState } from "recoil";

const Page = () => {
    const router = useRouter();
    const pathname = usePathname();
    const parts = pathname.split("/");
    const index = Number(parts[parts.length - 1]);
    const [books] = useRecoilState(bookState);
    const [commentData] = useRecoilState(commentState);
    const book = books[index];
    useEffect(() => {
        if (!book) {
            router.push("/");
        }
    }, [book, router]);
    return (
        <div>
            {book && (
                <>
                    <header className="sticky top-0 z-10 py-2.5 min-[500px]:h-16 flex items-center text-center bg-white">
                        <nav className="text-lg font-bold grid grid-cols-[48px_1fr_48px] max-w-xl mx-auto w-full px-3 items-center">
                            <Link href="/">
                                <img
                                    src="/icons/arrow.png"
                                    className="cursor-pointer h-6 w-6 -ml-1 col-span-1"
                                    alt="arrow"
                                />
                            </Link>
                            <span className="truncate">{book.title}</span>
                        </nav>
                    </header>
                    <main>
                        <section className="max-w-xl mx-auto w-full">
                            <div className="slider relative w-full aspect-square mb-3">
                                <div className="slide h-full bg-slate-100">
                                    <img
                                        src={book.coverImage}
                                        className="h-full w-full object-contain"
                                        alt="Slider Image"
                                    />
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
                                    <span className="text-[#FF003E] font-bold">
                                        {book.discountRate}%
                                    </span>
                                    <span className="font-bold">
                                        {formatAmountWithCommas(book.price)}{" "}
                                        <span className="font-medium">원</span>
                                    </span>
                                </p>

                                <div className="py-4 border-t-2 border-slate-100">
                                    {commentData.map((item, index) => (
                                        <Comments key={index} comments={item}>
                                            {item.replies.length &&
                                                item.replies.map((subitem, subindex) => (
                                                    <Comments comments={subitem} key={subindex}></Comments>
                                                ))
                                            }
                                        </Comments>
                                    ))}
                                </div>
                            </div>

                            <div className="p-3 mt-auto sticky bottom-0 bg-white border-t border-b border-slate-100">
                                <form className="flex items-center w-full gap-2">
                                    <div className="overflow-hidden relative shrink-0">
                                        <img
                                            src="/icons/imagesmode.png"
                                            className="h-6 w-6"
                                            alt="profile-icon"
                                        />
                                        <input
                                            type="file"
                                            name="myfile"
                                            className="h-full w-full absolute left-0 top-0 opacity-0"
                                            accept="image/*"
                                        />
                                    </div>
                                    <input
                                        v-model="content"
                                        type="text"
                                        className="grow outline-none  w-full shadow-none px-2 py-1"
                                        placeholder="댓글을 남겨주세요."
                                    />
                                    <button className="pl-3 py-1 rounded-full shrink-0 text-gray-400">
                                        등록
                                    </button>
                                </form>
                            </div>
                        </section>
                    </main>
                </>
            )}
        </div>
    );
};

const Comments = ({ comments, children }) => {
    return (
        <div>
            <div className="flex gap-3">
                <img
                    src={`/icons/${comments.userImg}.png`}
                    className="h-9 w-9 object-cover rounded-full"
                    alt="profile-icon"
                />
                <div className="flex gap-3 w-full items-center">
                    <div className="w-full">
                        <p className="flex flex-wrap items-center gap-x-1">
                            <span className="font-bold">{comments.name}</span>
                            {comments.userVerified &&
                                <img
                                    src="/icons/tick.png"
                                    v-if="commentData.userVerified"
                                    className="h-4 w-4"
                                    alt="profile-icon"
                                />}
                            <span className="text-xs shrink-0 text-xxs text-color-light">
                                {comments.time}
                            </span>
                        </p>
                    </div>
                    <button className="outline-none shrink-0 -me-1 ">
                        <img src="/icons/menu.png" className="h-8 w-8" alt="menu-icon" />
                    </button>
                </div>
            </div>
            <div className="pl-12 flex flex-col gap-3">
                <div>
                    <p className="text-xs">
                        {comments.content}
                    </p>
                    <div className="flex gap-3 py-2 text-xs">
                        <button className="flex items-center gap-1 outline-none outline-none">
                            <img src="/icons/like.png" className="h-6 w-6" alt="like-icon" />
                            <span className="text-gray-400">{comments.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 outline-none">
                            <img
                                src="/icons/comment.png"
                                className="h-6 w-6"
                                alt="comment-icon"
                            />
                            <span className="text-gray-400">{comments.replies && comments.replies.length || 0}</span>
                        </button>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Page;
