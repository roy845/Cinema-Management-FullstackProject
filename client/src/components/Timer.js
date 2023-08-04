import React, { useState, useEffect } from "react";
import { useAuth } from "../contex/auth";
import { getTimeout, updateTimeout } from "../Api/serverAPI";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Timer = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [secondsUntillTimeout, setSecondsUntillTimeout] = useState(0);

  useEffect(() => {
    const fetchTimeout = async () => {
      try {
        const { data } = await getTimeout(auth?.user?._id);

        setSecondsUntillTimeout(data.timeout);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchTimeout();
  }, []);

  useEffect(() => {
    let interval;
    if (secondsUntillTimeout >= 0) {
      interval = setInterval(() => {
        setSecondsUntillTimeout((prev) => prev - 1);
      }, 1000);
    } else {
      setAuth(null);
      localStorage.removeItem("auth");
      navigate("/");
    }

    return () => clearInterval(interval);
  }, [secondsUntillTimeout]);

  useEffect(() => {
    const updateSeconds = async () => {
      try {
        await updateTimeout(auth?.user?._id, secondsUntillTimeout);
      } catch (error) {
        toast.error(error);
      }
    };

    updateSeconds();
  }, [secondsUntillTimeout]);

  return (
    <div>
      <p>
        Time remaining Until Logout:
        {Math.floor(secondsUntillTimeout / 60) !== 0
          ? `${Math.floor(secondsUntillTimeout / 60)} minutes `
          : ""}
        {secondsUntillTimeout % 60} seconds
      </p>
    </div>
  );
};

export default Timer;
