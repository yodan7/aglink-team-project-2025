"use client";

import React, { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface BookmarkButtonProps {
  farmId: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function BookmarkButton({
  farmId,
  size = "sm",
  className = "",
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    checkBookmarkStatus();
  }, [farmId]);

  const checkBookmarkStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("bookmarks")
        .select("id")
        .eq("user_id", user.id)
        .eq("farm_id", farmId)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error checking bookmark:", error);
        return;
      }

      setIsBookmarked(!!data);
    } catch (error) {
      console.error("Error checking bookmark status:", error);
    }
  };

  const toggleBookmark = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("ログインが必要です");
        return;
      }

      if (isBookmarked) {
        // ブックマーク削除
        const { error } = await supabase
          .from("bookmarks")
          .delete()
          .eq("user_id", user.id)
          .eq("farm_id", farmId);

        if (error) throw error;
        setIsBookmarked(false);
      } else {
        // ブックマーク追加
        const { error } = await supabase
          .from("bookmarks")
          .insert({
            user_id: user.id,
            farm_id: farmId,
          });

        if (error) throw error;
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      alert("ブックマークの操作に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <button
      onClick={toggleBookmark}
      disabled={loading}
      className={`absolute top-2 left-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white transition-colors ${
        isBookmarked ? "text-red-500" : "text-gray-600"
      } ${className}`}
      aria-label={isBookmarked ? "ブックマークを解除" : "ブックマークに追加"}
    >
      <Bookmark
        className={`${sizeClasses[size]} ${isBookmarked ? "fill-current" : ""}`}
      />
    </button>
  );
}