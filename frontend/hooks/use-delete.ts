import axios from "axios"
import { useCallback } from "react"

const BASE_API_URL = process.env.API_URL || "http://localhost:4000/api"

export default function useDelete(id: string) {
    const handleDelete = useCallback(async () => {
        try {
            const result = await axios.delete(`${BASE_API_URL}/delete-member/${id}`)  
            console.log("Deletion successful: ", result.data)
        } catch (err) {
            console.error("Error deleting member: ", err)
            throw err
        }
    }, [id])

    return handleDelete
}