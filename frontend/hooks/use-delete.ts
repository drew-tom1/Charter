import axios from "axios"

export default function useDelete(id: string) {
    try {
        const result = await axios.delete('http://localhost:5173/api/delete-member',)
    } catch (err) {

    }
}