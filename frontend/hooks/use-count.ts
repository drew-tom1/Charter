import { useState, useEffect } from "react";

export default function useCount() {
    const [activeMemberCount, setActiveMemberCount] = useState<number | null>(null);
    const [loadingMemberCount, setLoadingMemberCount] = useState(true);
    const [errorMemberCount, setErrorMemberCount] = useState<Error | null>(null);
  
    useEffect(() => {
      const fetchChapterMemberCount = async () => {
        try {
          const response = await fetch('http://localhost:5173/api/retrieve-user-count');
          if (!response.ok && response.status !== 304) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          if (response.status !== 304) {
            const jsonData = await response.json();
            setActiveMemberCount(jsonData.count);
          }
        } catch (err) {
          if (err instanceof Error) {
            setErrorMemberCount(err);
          } else {
            console.error("An unexpected error occurred:", err);
            setErrorMemberCount(new Error("An unexpected error occurred."));
          }
        } finally {
          setLoadingMemberCount(false);
        }
      };
  
      fetchChapterMemberCount();
    }, []);

    return {activeMemberCount, loadingMemberCount, errorMemberCount }
}