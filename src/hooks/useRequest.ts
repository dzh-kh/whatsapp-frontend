import { useState, useCallback, createElement } from "react";

export default function useRequest(callback: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetch = useCallback(
    function () {
      setIsLoading(true);
      setError(null);
      return callback()
        .catch((e: any) => {
          console.log(e);
          const error = e.response ? e.response.message : e.message;
          const elem = document.createElement("div");
          elem.classList.add("error");
          elem.innerHTML = `${error}`;
          document.body.prepend(elem);
          setTimeout(() => elem.remove(), 5000);
          setError(error);
        })
        .finally(() => setIsLoading(false));
    },
    [callback]
  );

  return { isLoading, error, fetch };
}
