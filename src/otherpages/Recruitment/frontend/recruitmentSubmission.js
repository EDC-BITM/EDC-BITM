const submissionStorageKey = "edcRecruitmentSubmission";

export function isRecruitmentSubmission(value) {
  return (
    typeof value?.name === "string" &&
    Array.isArray(value?.subTeams) &&
    value.subTeams.every((team) => typeof team === "string")
  );
}

export function readRecruitmentSubmission() {
  const storedSubmission = sessionStorage.getItem(submissionStorageKey);
  if (!storedSubmission) return null;

  const submission = JSON.parse(storedSubmission);
  return isRecruitmentSubmission(submission) ? submission : null;
}

export function saveRecruitmentSubmission(submission) {
  sessionStorage.setItem(
    submissionStorageKey,
    JSON.stringify(submission),
  );
}
