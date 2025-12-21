import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/utils/api";

// Query keys
export const SUBMISSION_KEYS = {
  all: ["submissions"],
  detail: (id) => ["submissions", id],
  stats: ["submissions", "stats"],
};

/**
 * Fetch all submissions
 */
const fetchSubmissions = async ({
  page = 1,
  limit = 100,
  stage,
  email,
} = {}) => {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("limit", limit);
  if (stage) params.append("stage", stage);
  if (email) params.append("email", email);

  console.log(
    "Fetching submissions with URL:",
    `/submissions?${params.toString()}`
  );
  const response = await client.get(`/submissions?${params.toString()}`);
  console.log("Submissions API Response:", response.data);
  return response.data;
};

/**
 * Fetch single submission by ID
 */
const fetchSubmissionById = async (id) => {
  console.log("Fetching submission by ID:", id);
  const response = await client.get(`/submissions/${id}`);
  console.log("Submission API Response:", response.data);
  return response.data;
};

/**
 * Fetch submission stats
 */
const fetchSubmissionStats = async () => {
  const response = await client.get("/submissions/stats/overview");
  return response.data;
};

/**
 * Delete submission
 */
const deleteSubmission = async (id) => {
  const response = await client.delete(`/submissions/${id}`);
  return response.data;
};

/**
 * Hook to fetch all submissions
 */
export const useSubmissions = (options = {}) => {
  return useQuery({
    queryKey: [...SUBMISSION_KEYS.all, options],
    queryFn: () => fetchSubmissions(options),
    staleTime: 0, // Disable caching for debugging
    gcTime: 0, // Don't cache
    refetchOnMount: "always", // Always refetch
  });
};

/**
 * Hook to fetch a single submission
 */
export const useSubmission = (id) => {
  return useQuery({
    queryKey: SUBMISSION_KEYS.detail(id),
    queryFn: () => fetchSubmissionById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook to fetch submission stats
 */
export const useSubmissionStats = () => {
  return useQuery({
    queryKey: SUBMISSION_KEYS.stats,
    queryFn: fetchSubmissionStats,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook to delete a submission
 */
export const useDeleteSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBMISSION_KEYS.all });
      queryClient.invalidateQueries({ queryKey: SUBMISSION_KEYS.stats });
    },
  });
};
