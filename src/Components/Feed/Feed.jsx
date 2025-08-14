import React, { useEffect, useState, useCallback, useRef } from "react";
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

  // Prevent multiple fetch calls
  const isFetchingRef = useRef(false);

  const fetchFeed = useCallback(async () => {
    if (isFetchingRef.current) return; // ✅ Prevent duplicate calls
    isFetchingRef.current = true;

    setLoading(true);
    try {
      const res = await api.get("/network/feed");
      if (res.data.success) {
        dispatch(addFeed(res.data.feed));
        setCurrentIndex(0);
      }
    } catch (err) {
      toast.error("Failed to fetch feed.");
      console.error("Error fetching feed:", err);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [dispatch]);

  useEffect(() => {
    // Only fetch on mount if feed is empty
    if (!feed || feed.length === 0) {
      fetchFeed();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ✅ Empty deps means no refetch loop

  const handleSwipe = async (connectionStatus, recipientId) => {
    try {
      await api.post(`/request/swipe/${connectionStatus}/${recipientId}`);
      toast.success(`${connectionStatus} sent!`);

      dispatch(removeUserFromFeed(recipientId));

      const nextIndex = currentIndex + 1;
      if (nextIndex >= feed.length - 1) {
        fetchFeed(); // ✅ Fetch new feed only when you reach the end
      } else {
        setCurrentIndex(nextIndex);
      }
    } catch (err) {
      toast.error("Failed to send request.");
      console.error("Swipe failed:", err);
    }
  };

  const currentProfile = feed?.[currentIndex];

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
