export const HOST = 'localhost'
export const PORT = 3131
export const PREFIX = `http://${HOST}:${PORT}`
export const LOGIN_REQUEST = `${PREFIX}/api/auth/authenticate/login`
export const CREATE_CODING_INTERVIEW_REQUEST = `${PREFIX}/api/interview/coding/create`
export const getInterviewById = (interviewId: string) => `${PREFIX}/api/interview/coding/find/by/interview-id?interview_id=${interviewId}`
export const getIsSolvedBeforeRequest = (interviewId: string, userId: string) => `${PREFIX}/api/interview/coding/is-solved-before?user_id=${userId}&interview_id=${interviewId}`
