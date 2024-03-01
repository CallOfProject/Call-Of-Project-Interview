export interface Root {
  item_count: number
  message: string
  object: Object
}

export interface Object {
  ownerProjects: OwnerProject[]
}

export interface OwnerProject {
  projectId: string
  projectName: string
  projectStatus: string
  participants: Participants
}

export interface Participants {
  participants: Participant[]
}

export interface Participant {
  user: User
}

export interface User {
  user_id: string
  first_name: string
  middle_name: string
  last_name: string
  username: string
}
