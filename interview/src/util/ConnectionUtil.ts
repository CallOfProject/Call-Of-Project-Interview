export const HOST = 'localhost'
export const PORT = 3131
export const PREFIX = `http://${HOST}:${PORT}`
export const LOGIN_REQUEST = `${PREFIX}/api/auth/authenticate/login`
export const CREATE_CODING_INTERVIEW_REQUEST = `${PREFIX}/api/interview/coding/create`
export const SUBMIT_TEST_QUESTION_REQUEST = `${PREFIX}/api/interview/test/submit/answer/question`
export const getInterviewById = (interviewId: string) => `${PREFIX}/api/interview/coding/find/by/interview-id?interview_id=${interviewId}`
export const getIsSolvedBeforeRequest = (interviewId: string, userId: string) => `${PREFIX}/api/interview/coding/is-solved-before?user_id=${userId}&interview_id=${interviewId}`
export const getIsSolvedTestBeforeRequest = (interviewId: string, userId: string) => `${PREFIX}/api/interview/test/is-solved-before?user_id=${userId}&interview_id=${interviewId}`
export const getTestInterviewInfo = (interviewId: string) => `${PREFIX}/api/interview/test/info/interview?interview_id=${interviewId}`
export const getQuestionByIdx = (interviewId: string, q: number) => `${PREFIX}/api/interview/test/find/question/by/interview-id?interview_id=${interviewId}&q=${q}`
export const getTestInterviewSubmitRequest = (interviewId: string, userId: string) => `${PREFIX}/api/interview/test/submit?interview_id=${interviewId}&user_id=${userId}`
