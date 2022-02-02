import { useState, useEffect } from 'react'
import { useQuery, useMutation, useInfiniteQuery } from 'react-query'
import { registAuthListener } from '../../lib/auth'
import request from '../../utils/api-utils'

// auth and user network request and query hooks
export const fetchMapAddress = options => {
  return request({
    url: '/current-user',
    method: 'get',
    ...(options || {})
  })
}

export const fetchColors = ({ pageParam = 1 }) => {
  return request({
    url: `/colors/?_limit=2&_page=${pageParam}`,
    method: 'get'
  })
}

export const searchQueryAddress = (onSuccess, onError) => {
  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    isError,
    hasNextPage
  } = useInfiniteQuery(['query-address'], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      // NOTE: here 4 is total pages which needs to be dynamic
      if (pages < 4) {
        return pages.length + 1
      } else {
        return undefined
      }
    }
  })

  return {
    data: data?.pages.map((group, idx) => group.data),
    loading: isLoading,
    isFetching: isFetching && !isFetchingNextPage,
    error,
    hasNextPage,
    fetchNextPage
  }
}
