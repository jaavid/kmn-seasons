import React from "react";
import Image from "next/image";
import { Post } from "@/types";

type PostCardProps = {
  post: Post;
  type?: "view" | "comment";
};

const PostCard: React.FC<PostCardProps> = ({ post, type = "view" }) => {
  const formattedValue = Number(
    type === "view" ? post.total_views : post.comment_count
  ).toLocaleString("fa-IR");

  return (
    <div className="relative rounded-md overflow-hidden shadow-md group bg-black flex flex-col justify-between">
      <a
        href={`https://kermaneno.ir/k/${post.post_id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {/* تصویر + تیتر */}
        <div className="relative">
          {post.thumbnail_url && post.thumbnail_url.trim() !== "" ? (
            <Image
              src={post.thumbnail_url}
              alt={post.post_title}
              width={400}
              height={160}
              className="w-full h-40 object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white text-sm">
              بدون تصویر
            </div>
          )}
          <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black via-black/70 to-transparent text-white p-3 text-sm font-semibold leading-tight text-right">
            {post.post_title}
          </div>
        </div>

        {/* تگ‌ها */}
        {Array.isArray(post.post_tags) && post.post_tags.length > 0 && (
          
            <div className="pr-2 pb-2 flex flex-wrap gap-1 text-xs">
              {post.post_tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  title={tag}
                  className="max-w-[110px] rounded-md truncate bg-red-700 text-white px-2 py-0.5 border border-red-900 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          
        )}

        <div
          className={`absolute top-2 ${
            type === "view" ? "left-2" : "right-2"
          } bg-black/60 text-white text-xs px-2 py-1 rounded-full`}
        >
          {type === "view" ? "👁️" : "💬"} {formattedValue} {type === "view" ? "بازدید" : "نظر"}
        </div>
      </a>
    </div>
  );
};

export default PostCard;
