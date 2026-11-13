const submissionStorageKey = "edcRecruitmentSubmission";
const draftStorageKey = "edcRecruitmentDraft_v1";

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

  try {
    const submission = JSON.parse(storedSubmission);
    return isRecruitmentSubmission(submission) ? submission : null;
  } catch {
    return null;
  }
}

export function saveRecruitmentSubmission(submission) {
  try {
    sessionStorage.setItem(
      submissionStorageKey,
      JSON.stringify(submission),
    );
  } catch (error) {
    console.warn("Could not save session submission", error);
  }
}

export function readRecruitmentDraft() {
  try {
    const raw = localStorage.getItem(draftStorageKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveRecruitmentDraft(data) {
  try {
    localStorage.setItem(draftStorageKey, JSON.stringify(data));
  } catch {
    // ignore storage quota issues
  }
}

export function clearRecruitmentDraft() {
  try {
    localStorage.removeItem(draftStorageKey);
  } catch {
    // ignore
  }
}
