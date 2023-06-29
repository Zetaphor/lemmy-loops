import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api/api'

export const usePostsStore = defineStore('posts', () => {
  const api = useApiStore()

  const posts = ref([])
  // "Active" | "Hot" | "New" | "Old" | "TopDay" | "TopWeek" | "TopMonth" | "TopYear" | "TopAll" | "MostComments" | "NewComments" | "TopHour" | "TopSixHour" | "TopTwelveHour"
  const sort = ref('Hot')

  function getFrontpage() {
    return new Promise(async (resolve, reject) => {
      try {
        const postData = await api.getPosts({
          type_: 'All',
          sort: sort.value
        })

        const postArray = postData.posts

        console.log(postArray)

        posts.value = []

        for (let i = 0; i < postArray.length; i++) {
          if (
            postArray[i].creator_banned_from_community ||
            postArray[i].creator_blocked ||
            postArray[i].community.deleted ||
            postArray[i].post.removed
          ) {
            console.log('Removed post')
            console.log('creator_banned_from_community', postArray[i].creator_banned_from_community)
            console.log('creator_blocked', postArray[i].creator_blocked)
            console.log('community.deleted', postArray[i].community.deleted)
            console.log('post.removed', postArray[i].post.removed)
            continue
          } else {
            posts.value.push({
              community: {
                local: postArray[i].community.local,
                id: postArray[i].community.id,
                name: postArray[i].community.name,
                title: postArray[i].community.title,
                actor_id: postArray[i].community.actor_id
              },
              counts: {
                comments: postArray[i].counts.comments,
                upvotes: postArray[i].counts.upvotes,
                downvotes: postArray[i].counts.downvotes,
                newest_comment_time: postArray[i].counts.newest_comment_time,
                published: postArray[i].counts.published,
                score: postArray[i].counts.score,
                unread_comments: postArray[i].post.unread_comments
              },
              creator: {
                actor_id: postArray[i].creator.actor_id,
                admin: postArray[i].creator.admin,
                avatar: postArray[i].creator.avatar,
                bot_account: postArray[i].creator.bot_account,
                id: postArray[i].creator.id,
                local: postArray[i].creator.local,
                name: postArray[i].creator.name
              },
              content: {
                ap_id: postArray[i].post.ap_id,
                body: postArray[i].post.body,
                locked: postArray[i].post.locked,
                name: postArray[i].post.name,
                nsfw: postArray[i].post.nsfw,
                published: postArray[i].post.published,
                updated: postArray[i].post.updated,
                url: postArray[i].post.url
              }
            })
          }
        }
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    posts,
    sort,
    getFrontpage
  }
})
