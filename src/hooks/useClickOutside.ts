import { useEffect } from "react";

const useClickOutside = (ref: any, callback: any, isOpen = true) => {
  const handleClickOutlise = (e: any) => {
    if (ref.current && isOpen && !ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutlise);
    return () => {
      document.removeEventListener("mousedown", handleClickOutlise);
    };
  });
};
export default useClickOutside;
