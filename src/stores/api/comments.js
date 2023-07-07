import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api/api'
import { DateTime } from 'luxon'

export const useCommentsStore = defineStore('comments', () => {
  const api = useApiStore()

  const sort = ref('Hot')
  const view = ref('All')

  async function getComments(post_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await api.getComments(post_id, sort.value, view.value)
        resolve(generateFlatSortedCommentArray(resp.comments))
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  function formatRelativeTime(dateString) {
    const currentDateTime = DateTime.local()
    const dateTime = DateTime.fromISO(dateString)
    const diff = currentDateTime
      .diff(dateTime)
      .shiftTo('years', 'months', 'days', 'hours', 'minutes', 'seconds')

    if (Math.abs(diff.years) >= 1) {
      return `${Math.abs(Math.floor(diff.years))}Y`
    } else if (Math.abs(diff.months) >= 1) {
      return `${Math.abs(Math.floor(diff.months))}mo`
    } else if (Math.abs(diff.days) >= 1) {
      return `${Math.abs(Math.floor(diff.days))}d`
    } else if (Math.abs(diff.hours) >= 1) {
      return `${Math.abs(Math.floor(diff.hours))}h`
    } else if (Math.abs(diff.minutes) >= 1) {
      return `${Math.abs(Math.floor(diff.minutes))}m`
    } else {
      return `${Math.abs(Math.floor(diff.seconds))}s`
    }
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
          published: formatRelativeTime(commentObj.comment.published),
          path: commentObj.comment.path
        },
        counts: {
          child_count: commentObj.counts.child_count || 0,
          downvotes: commentObj.counts.downvotes,
          upvotes: commentObj.counts.upvotes,
          score: commentObj.counts.score
        },
        creator: {
          actor_id: commentObj.creator.actor_id,
          actor_domain: (commentObj.creator.actor_id.match(/https:\/\/([^/]+)\/u\//) || [])[1],
          admin: commentObj.creator.admin,
          avatar: commentObj.creator.avatar || '',
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

  return {
    sort,
    view,
    getComments
  }
})
