import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api/api'

export const useCommentsStore = defineStore('comments', () => {
  const api = useApiStore()

  const sort = ref('Hot')
  const view = ref('All')
  const page = ref(1)

  const renderedNodes = ref(1)
  const limit = ref(15)

  async function getComments(post_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await api.getComments(post_id, sort.value, view.value, page.value, limit.value)
        resolve(generateCommentTree(resp.comments))
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  function generateCommentTree(comments) {
    let map = new Map()
    comments.forEach((item) => {
      const parsedItem = {
        children: [],
        comment: {
          id: item.comment.id,
          content: item.comment.content,
          creator_id: item.comment.creator_id,
          distinguished: item.comment.distinguished,
          local: item.comment.local,
          ap_id: item.comment.ap_id,
          published: item.comment.published,
          path: item.comment.path
        },
        counts: {
          child_count: item.counts.child_count,
          downvotes: item.counts.downvotes,
          upvotes: item.counts.upvotes,
          score: item.counts.score
        },
        creator: {
          actor_id: item.creator.actor_id,
          actor_domain: (item.creator.actor_id.match(/https:\/\/([^/]+)\/u\//) || [])[1],
          admin: item.creator.admin,
          avatar: item.creator.avatar,
          bot_account: item.creator.bot_account,
          id: item.creator.id,
          local: item.creator.local,
          name: item.creator.name
        }
      }

      map.set(parsedItem.comment.id, { ...parsedItem, children: [] })
    })

    let root = { id: '0', children: [] }

    map.forEach((item) => {
      let pathArr = item.comment.path.split('.')
      let parentPathId = pathArr[pathArr.length - 2]

      if (parentPathId === '0') {
        root.children.push(item)
      } else if (map.has(parseInt(parentPathId))) {
        map.get(parseInt(parentPathId)).children.push(item)
      }
    })

    return root.children
  }

  return {
    limit,
    renderedNodes,
    page,
    sort,
    view,
    getComments
  }
})
