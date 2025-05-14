import axios from "axios";
import { useState, useEffect, useCallback } from "react";

type APIResponse = {
  count: number
  totalFunds: number
  netFunds: number
  outstandingBalance: number
}

export default function useCount() {
    const [memberCount, setMemberCount] = useState<number | null>(null);
    const [totalFunds, setTotalFunds] = useState<number | null>(null);
    const [netFunds, setNetFunds] = useState<number | null>(null);
    const [outstandingBalance, setOutstandingBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  
      const fetchSectionCardData = useCallback(async () => {
        try {
          const response = await axios.get<APIResponse>('http://localhost:5173/api/retrieve-section-card-info');
          if (response.status !== 304) {
            setMemberCount(response.data.count);
            setNetFunds(response.data.netFunds);
            setTotalFunds(response.data.totalFunds);
            setOutstandingBalance(response.data.outstandingBalance)
          }
          console.log(response.data.count)
        } catch (err) {
          if (err instanceof Error) {
            setError(err);
          } else {
            console.error("An unexpected error occurred:", err);
            setError(new Error("An unexpected error occurred."));
          }
        } finally {
          setLoading(false);
        }
      }, [memberCount]);
  
    useEffect(() => {
      fetchSectionCardData();
    }, [fetchSectionCardData]);

    return { netFunds, totalFunds, outstandingBalance, memberCount, loading, error }
}