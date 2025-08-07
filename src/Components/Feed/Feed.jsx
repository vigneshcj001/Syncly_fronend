import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../utils/api";
import { addFeed } from "../../redux/FeedSlice";
import FeedCard from "./FeedCard";
import FeedCardSkeleton from "./FeedSkeleton";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        if (feed && feed.length > 0) {
          setLoading(false); 
          return;
        }

        const res = await api.get("/network/feed");
        if (res.data.success) {
          dispatch(addFeed(res.data.feed));
        } else {
          console.warn("Feed fetch warning:", res.data.message);
        }
      } catch (err) {
        console.error("Error fetching feed:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchFeed();
  }, [dispatch, feed]);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading ? (
        Array.from({ length: 6 }).map((_, i) => <FeedCardSkeleton key={i} />)
      ) : feed && feed.length > 0 ? (
        feed.map((profile) => <FeedCard key={profile._id} profile={profile} />)
      ) : (
        <p className="text-gray-600 dark:text-gray-300 col-span-full text-center">
          No new profiles to show right now.
        </p>
      )}
    </div>
  );
};

export default Feed;