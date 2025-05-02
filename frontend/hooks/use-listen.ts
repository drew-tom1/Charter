import supabase from "@/utils/supabase";
import { useEffect } from "react";
import { RealtimeChannel, RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { User } from "@/helper/userModel";

type TriggerCallback = (payload: RealtimePostgresChangesPayload<User>) => void;

export const useListen = (onTrigger: TriggerCallback) => { // rename variables for clarity later
    let dashboardChanges: RealtimeChannel | null = null;

    useEffect(() => {
        const subscribetoChannel = async () => {
            dashboardChanges = await supabase
            .channel('dashboard-changes')
            .on('postgres_changes', {event: '*', schema: 'public' }, (payload: RealtimePostgresChangesPayload<User>) => {
                console.log(payload)
                onTrigger(payload)
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
