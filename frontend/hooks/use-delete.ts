import axios from "axios"
import { useCallback } from "react"

export default function useDelete(id: string) {
    const handleDelete = useCallback(async () => {
        try {
            const result = await axios.delete(`http://localhost:5173/api/delete-member/${id}`)  
            console.log("Deletion successful: ", result.data)
        } catch (err) {
            console.error("Error deleting member: ", err)
            throw err
        }
    }, [id])

    return handleDelete
}