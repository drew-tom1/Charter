import { baseApi } from "@/app/redux/base-api";
import { User, userData } from "@/helper/userModel";

const dashboardApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['Users', 'Info'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getSectionCardInfo: builder.query<any, void>({
                query: () => ({
                    url: '/retrieve-section-card-info',
                    method: 'GET'
                }),
                providesTags: ['Info']
            }),
            getTableInfo: builder.query<userData, void>({
                query: () => ({
                    url: '/retrieve-user-list',
                    method: 'GET'
                }),
                providesTags: ['Users']
            }),
            addTableEntry: builder.mutation<User, Partial<User>>({
                query: (newMember) => ({
                    url: '/add-member',
                    method: 'POST',
                    body: newMember
                }),
                invalidatesTags: ['Users', 'Info']
            }),
            updateTableEntry: builder.mutation<User, { id: string, updatedMember: Partial<User> }>({
                query: ({id, updatedMember}) => ({
                    url: `/update-member/${id}`,
                    method: 'PATCH',
                    body: updatedMember
                }),
                invalidatesTags: ['Users', 'Info']
            }),
            deleteTableEntry: builder.mutation<void, string>({
                query: (id) => ({
                    url: `/delete-member/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: ['Users', 'Info']
            })
        })
    })

export const { 
    useGetSectionCardInfoQuery, 
    useGetTableInfoQuery, 
    useAddTableEntryMutation, 
    useUpdateTableEntryMutation,
    useDeleteTableEntryMutation 
} = dashboardApi;