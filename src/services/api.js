const BASE_URL = 'https://dummyjson.com'

export async function fetchPosts({ limit = 15, skip = 0, search = '' } = {}) {
  let url = `${BASE_URL}/posts?limit=${limit}&skip=${skip}`
  if (search) {
    url = `${BASE_URL}/posts/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
  }
  const response = await fetch(url)
  if (!response.ok) throw new Error('Erro ao carregar posts')
  return response.json()
}

export async function fetchCommentsByPostId(postId) {
  const response = await fetch(`${BASE_URL}/comments/post/${postId}`)
  if (!response.ok) throw new Error('Erro ao carregar comentários')
  return response.json()
}

export async function createPost(postData) {
  const response = await fetch(`${BASE_URL}/posts/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData)
  })
  if (!response.ok) throw new Error('Erro ao criar post')
  return response.json()
}