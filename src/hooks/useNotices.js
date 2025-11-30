import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotices,
  fetchNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
  toggleNoticeStatus,
  getPublishedNotice,
} from "@/services/noticeService";

// Query keys
export const NOTICE_KEYS = {
  all: ["articles"],
  detail: (id) => ["articles", id],
  published: ["articles", "published"],
};

/**
 * Hook to fetch all notices
 */
export const useNotices = () => {
  return useQuery({
    queryKey: NOTICE_KEYS.all,
    queryFn: fetchNotices,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook to fetch a single notice
 */
export const useNotice = (id) => {
  return useQuery({
    queryKey: NOTICE_KEYS.detail(id),
    queryFn: () => fetchNoticeById(id),
    enabled: !!id && id !== "new",
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook to fetch published notice
 */
export const usePublishedNotice = () => {
  return useQuery({
    queryKey: NOTICE_KEYS.published,
    queryFn: getPublishedNotice,
    staleTime: 0, // Don't consider data stale - always refetch
    gcTime: 0, // React Query v5 uses gcTime instead of cacheTime
    refetchOnMount: "always", // Always refetch when component mounts
    refetchOnWindowFocus: true, // Refetch when user returns to tab
  });
};

/**
 * Hook to create a notice
 */
export const useCreateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNotice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTICE_KEYS.all });
      queryClient.invalidateQueries({ queryKey: NOTICE_KEYS.published });
    },
  });
};

/**
 * Hook to update a notice
 */
export const useUpdateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateNotice(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: NOTICE_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: NOTICE_KEYS.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: NOTICE_KEYS.published });
    },
  });
};

/**
 * Hook to delete a notice
 */
export const useDeleteNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTICE_KEYS.all });
      queryClient.invalidateQueries({ queryKey: NOTICE_KEYS.published });
    },
  });
};

/**
 * Hook to toggle notice status
 */
export const useToggleNoticeStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, currentStatus }) =>
      toggleNoticeStatus(id, currentStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTICE_KEYS.all });
      queryClient.invalidateQueries({ queryKey: NOTICE_KEYS.published });
    },
  });
};
