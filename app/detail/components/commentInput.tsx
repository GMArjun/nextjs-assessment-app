const CommentInput = () => {
  return (
    <div className="p-3 py-2.5 mt-auto sticky bottom-0 bg-white border-t border-b border-slate-100">
      <form className="flex items-center w-full gap-2">
        <div className="overflow-hidden relative shrink-0">
          <img src="/icons/imagesmode.png" className="h-6 w-6" alt="profile-icon" />
          <input type="file" name="myfile" className="h-full w-full absolute left-0 top-0 opacity-0" accept="image/*" />
        </div>
        <input
          v-model="content"
          type="text"
          className="grow outline-none  w-full shadow-none px-2 py-1 placeholder:text-[#AFB9CA] text-xs"
          placeholder="댓글을 남겨주세요."
        />
        <button className="pl-3 py-1 rounded-full text-xs shrink-0 text-[#919EB6]">등록</button>
      </form>
    </div>
  );
};

export default CommentInput;
