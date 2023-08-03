import { Comments } from '@/utils/interface';

const CommentsBlock = ({ comments, children }: { comments: Comments; children?: React.ReactNode }) => {
  return (
    <div>
      <div className="flex gap-3">
        <img src={`/icons/${comments.userImg}.png`} className="h-9 w-9 object-cover rounded-full" alt="profile-icon" />
        <div className="flex gap-3 w-full items-center">
          <div className="w-full">
            <p className="flex flex-wrap items-center gap-x-1">
              <span className="font-bold">{comments.name}</span>
              {comments.userVerified && (
                <img src="/icons/tick.png" v-if="commentData.userVerified" className="h-4 w-4" alt="profile-icon" />
              )}
              <span className="text-xs shrink-0 font-medium text-[#919EB6]">{comments.time}</span>
            </p>
          </div>
          <button className="outline-none shrink-0 -me-2">
            <img src="/icons/menu.png" className="h-8 w-8" alt="menu-icon" />
          </button>
        </div>
      </div>
      <div className="pl-12 flex flex-col gap-3">
        <div>
          <p className="text-xs text-[#313B49]">{comments.content}</p>
          <div className="flex gap-3 py-2 text-xs">
            <button className="flex items-center gap-1 outline-none outline-none">
              <img src="/icons/like.png" className="h-6 w-6" alt="like-icon" />
              <span className="text-[#919EB6]">{comments.likes}</span>
            </button>
            <button className="flex items-center gap-1 outline-none">
              <img src="/icons/comment.png" className="h-6 w-6" alt="comment-icon" />
              <span className="text-[#919EB6]">{(comments.replies && comments.replies.length) || 0}</span>
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default CommentsBlock;
