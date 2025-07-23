import { baseApi } from "@/app/redux/base-api";
import { Budget } from "@/helper/budgetModel";

const budgetApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['Budget'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getBudget: builder.query<any,void>({
                query: () => ({
                    url: '/get-budget',
                    method: 'GET'
                }),
                providesTags: ['Budget']
            }),
            updateBudget: builder.mutation<any, Budget>({
                query: (budget) => ({
                    url: '/update-budget',
                    method: 'PUT',
                    body: budget
                })
            })
        })
    })

export const { useGetBudgetQuery, useUpdateBudgetMutation } = budgetApi;