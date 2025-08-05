import React, { useEffect } from "react";
import { api } from "../../utils/api";

const YourVibes = () => {
  const fetchYourVibes = async () => {
    try {
      const response = await api.get("/network/requests/pendings");
      console.log(response);
    } catch (error) {
      console.error("Error fetching vibes:", error);
    }
  };

  useEffect(() => {
    fetchYourVibes();
  }, []);

  return <div>Your vibes</div>;
};

export default YourVibes;
