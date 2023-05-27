import React, { useEffect, useState } from "react";
import { useActions } from "../../hooks";

const PollingIntegrator = () => {
  const [count, setCount] = useState(0);
  const { getNotification } = useActions();
  useEffect(() => {
    const interval = setInterval(() => {
      getNotification();
      setCount(count + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, [count]);
  return <></>;
};

export default PollingIntegrator;
