import {CreateTestInterviewDTO} from "../app/dto/TestInterviewDTOs";

export const HOST = 'localhost'
export const PORT = 3131
export const PREFIX = `http://${HOST}:${PORT}`
export const LOGIN_REQUEST = `${PREFIX}/api/auth/authenticate/login`
export const CREATE_CODING_INTERVIEW_REQUEST = `${PREFIX}/api/interview/coding/create`
export const SUBMIT_TEST_QUESTION_REQUEST = `${PREFIX}/api/interview/test/submit/answer/question`
export const CREATE_TEST_INTERVIEW_REQUEST = `${PREFIX}/api/interview/test/create`
export const SUBMIT_CODE_INTERVIEW_REQUEST = `${PREFIX}/api/interview/coding/submit`
export const getInterviewById = (interviewId: string) => `${PREFIX}/api/interview/coding/find/by/interview-id?interview_id=${interviewId}`
export const getIsSolvedBeforeRequest = (interviewId: string, userId: string) => `${PREFIX}/api/interview/coding/is-solved-before?user_id=${userId}&interview_id=${interviewId}`
export const getIsSolvedTestBeforeRequest = (interviewId: string, userId: string) => `${PREFIX}/api/interview/test/is-solved-before?user_id=${userId}&interview_id=${interviewId}`
export const getTestInterviewInfo = (interviewId: string) => `${PREFIX}/api/interview/test/info/interview?interview_id=${interviewId}`
export const getQuestionByIdx = (interviewId: string, q: number) => `${PREFIX}/api/interview/test/find/question/by/interview-id?interview_id=${interviewId}&q=${q}`
export const getTestInterviewSubmitRequest = (interviewId: string, userId: string) => `${PREFIX}/api/interview/test/submit?interview_id=${interviewId}&user_id=${userId}`
export const findAllOwnerInterviewsByUserId = (userId: string) => `${PREFIX}/api/interview/management/find/all/by/user-id?user_id=${userId}`
export const findCodingInterviewOwner = (interviewId: string) => `${PREFIX}/api/interview/management/find/coding-interview/owner?interview_id=${interviewId}`
export const findTestInterviewOwner = (interviewId: string) => `${PREFIX}/api/interview/management/find/test-interview/owner?interview_id=${interviewId}`
export const acceptOrRejectCodingInterviewRequest = (id: string, accepted: boolean) => `${PREFIX}/api/interview/coding/accept?user_coding_iw_id=${id}&accepted=${accepted}`
export const acceptOrRejectTestInterviewRequest = (id: string, accepted: boolean) => `${PREFIX}/api/interview/test/accept?user_test_iw_id=${id}&accepted=${accepted}`
export const getRemoveCodingInterviewRequest = (interviewId: string, ownerId: string) => `${PREFIX}/api/interview/coding/delete?interview_id=${interviewId}&owner_id=${ownerId}`
export const getRemoveTestInterviewRequest = (interviewId: string) => `${PREFIX}/api/interview/test/delete?interview_id=${interviewId}`

export const getUserCodingInfoRequest = (userId : string) => `${PREFIX}/api/interview/coding/find/info?user_id=${userId}`
