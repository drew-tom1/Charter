import supabase from "@/utils/supabase";
import { useEffect } from "react";
import { RealtimeChannel } from "@supabase/supabase-js";

type DataChangeCallback = (payload: any) => void;

export const useListen = (onDataChange: DataChangeCallback) => { //rename variables for clarity later
    let dashboardChanges: RealtimeChannel | null = null;

    useEffect(() => {
        const subscribetoChannel = async () => {
            dashboardChanges = await supabase
            .channel('dashboard-changes')
            .on('postgres_changes', {event: '*', schema: 'public' }, (payload) => {return payload})
            .subscribe()  

            await dashboardChanges
            console.log('Subscribed to dashboard changes')
        };

        subscribetoChannel()
            
        return () => {
            if (dashboardChanges) {
              supabase.removeChannel(dashboardChanges);
              console.log('Unsubscribed from dashboard changes.');
            }      
        }
    }, [onDataChange])
}
