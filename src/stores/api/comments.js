import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api/api'

export const useCommentsStore = defineStore('comments', () => {
  const api = useApiStore()

  const sort = ref('Hot')
  const view = ref('All')
  const page = ref(1)

  const limit = ref(15)

  async function getComments(post_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await api.getComments(post_id, sort.value, view.value, page.value, limit.value)
        resolve(generateFlatSortedCommentArray(resp.comments))
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  function generateFlatSortedCommentArray(data) {
    let newCommentArray = data.map((commentObj) => {
      let newCommentObj = {
        comment: {
          id: commentObj.comment.id,
          content: commentObj.comment.content,
          creator_id: commentObj.comment.creator_id,
          distinguished: commentObj.comment.distinguished,
          local: commentObj.comment.local,
          ap_id: commentObj.comment.ap_id,
          published: commentObj.comment.published,
          path: commentObj.comment.path
        },
        counts: {
          child_count: commentObj.counts.child_count,
          downvotes: commentObj.counts.downvotes,
          upvotes: commentObj.counts.upvotes,
          score: commentObj.counts.score
        },
        creator: {
          actor_id: commentObj.creator.actor_id,
          actor_domain: (commentObj.creator.actor_id.match(/https:\/\/([^/]+)\/u\//) || [])[1],
          admin: commentObj.creator.admin,
          avatar: commentObj.creator.avatar,
          bot_account: commentObj.creator.bot_account,
          id: commentObj.creator.id,
          local: commentObj.creator.local,
          name: commentObj.creator.name
        }
      }

      newCommentObj.comment.depth = newCommentObj.comment.path.split('.').length - 1

      return newCommentObj
    })

    newCommentArray.sort((a, b) => {
      let pathA = a.comment.path.split('.').map(Number)
      let pathB = b.comment.path.split('.').map(Number)

      for (let i = 0; i < Math.min(pathA.length, pathB.length); i++) {
        if (pathA[i] < pathB[i]) {
          return -1
        } else if (pathA[i] > pathB[i]) {
          return 1
        }
      }

      if (pathA.length < pathB.length) {
        return -1
      } else if (pathA.length > pathB.length) {
        return 1
      } else {
        return 0
      }
    })

    // for (let i = 0; i < newCommentArray.length; i++) {
    //   console.log(newCommentArray[i].comment.depth, newCommentArray[i].comment.content)
    // }

    return newCommentArray
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
    page,
    sort,
    view,
    getComments
  }
})
