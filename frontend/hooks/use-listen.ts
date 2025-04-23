import supabase from "@/utils/supabase";
import { useEffect } from "react";
import { RealtimeChannel } from "@supabase/supabase-js";

type TriggerCallback = () => void;

export const useListen = (onTrigger: TriggerCallback) => { //rename variables for clarity later
    let dashboardChanges: RealtimeChannel | null = null;

    useEffect(() => {
        const subscribetoChannel = async () => {
            dashboardChanges = await supabase
            .channel('dashboard-changes')
            .on('postgres_changes', {event: '*', schema: 'public' }, (payload) => {
                console.log(payload)
                onTrigger()
            })
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
    }, [onTrigger])
}
