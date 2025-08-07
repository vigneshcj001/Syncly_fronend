import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../utils/api";
import { addFeed, removeUserFromFeed } from "../../redux/FeedSlice";
import FeedCard from "./FeedCard";
import FeedCardSkeleton from "./FeedSkeleton";
import { toast } from "react-hot-toast";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchFeed = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/network/feed");
      if (res.data.success) {
        dispatch(addFeed(res.data.feed));
        setCurrentIndex(0);
      } else {
        console.warn("Feed fetch warning:", res.data.message);
      }
    } catch (err) {
      console.error("Error fetching feed:", err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!feed || feed.length === 0) {
      fetchFeed();
    } else {
      setLoading(false);
    }
  }, [fetchFeed, feed]);

  const handleSwipe = async (connectionStatus, recipientId) => {
    try {
      await api.post(`/request/swipe/${connectionStatus}/${recipientId}`);
      toast.success(`${connectionStatus} sent!`);
      dispatch(removeUserFromFeed(recipientId));
      const nextIndex = currentIndex + 1;
      if (nextIndex >= feed.length - 1) {
        fetchFeed();
      } else {
        setCurrentIndex(nextIndex);
      }
    } catch (err) {
      console.error("Swipe failed:", err);
      toast.error("Failed to send request.");
    }
  };

  const currentProfile = feed[currentIndex];

  return (
    <div className="p-4 flex justify-center items-center min-h-[500px]">
      {loading ? (
        <FeedCardSkeleton />
      ) : currentProfile ? (
        <FeedCard profile={currentProfile} onSwipe={handleSwipe} />
      ) : (
        <p className="text-gray-600 dark:text-gray-300 text-center">
          No new profiles to show right now.
        </p>
      )}
    </div>
  );
};

export default Feed;
