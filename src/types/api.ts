export type GithubUser = {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  received_events_url: string
  type: 'User' | 'Organization'
  score: number
  following_url: string
  gists_url: string
  starred_url: string
  events_url: string
  site_admin: boolean
}

export type GithubRepository = {
  id: number
  node_id: string
  name: string
  full_name: 'string'
  owner: GithubUser
  private: boolean
  html_url: string
  description: string
  fork: boolean
  url: string
  git_url: string
  language: null | string
  forks_count?: number
  stargazers_count?: number
  watchers_count?: number
  size: number
  is_template: boolean
  topics: string[]
  visibility: string
  pushed_at: Date
  created_at: Date
  updated_at: Date
  permissions: {
    admin: boolean
    push: boolean
    pull: boolean
  }
}

// export type GithubApiUserRequest = {
//   q: string
//   sort?: 'followers' | 'repositories' | 'joined'
//   order?: 'desc' | 'asc'
//   per_page?: number
//   page?: number
// }

export type GithubApiUserResponse = {
  total_count: number
  incomplete_results: boolean
  items: GithubUser[]
}

export type GithubApiRepositoryResponse = GithubRepository[]
