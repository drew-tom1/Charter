import { baseApi } from "@/app/redux/base-api";
import { Alumni } from "@/helper/alumniModel";

const alumniApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['Alumni']})
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllAlumni: builder.query<any, void>({
                query: () => ({
                    url: '/retrieve-all-alumni',
                    method: 'GET'
                }),
                providesTags: ['Alumni']
            }),
            addAlumni: builder.mutation<Alumni, Partial<Alumni>>({
                query: (newAlumni) => ({
                    url: '/add-alumni',
                    method: 'POST',
                    body: newAlumni
                }),
                invalidatesTags: ['Alumni']
            }),
            updateAlumni: builder.mutation<Alumni, { id: string, updatedAlumni: Partial<Alumni> }>({
                query: ({id, updatedAlumni}) => ({
                    url: `/update-alumni/${id}`,
                    method: 'PATCH',
                    body: updatedAlumni
                }),
                invalidatesTags: ['Alumni']
            }),
            deleteAlumni: builder.mutation<void, string>({
                query: (id) => ({
                    url: `/delete-alumni/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: ['Alumni']
            })
        })
    })

export const {
    useGetAllAlumniQuery
} = alumniApi