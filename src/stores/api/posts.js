import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api/api'
import { DateTime } from 'luxon'

export const usePostsStore = defineStore('posts', () => {
  const api = useApiStore()

  const posts = ref([])
  const page = ref(1)

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

  function sendVote(post_id, postIndex, vote) {
    return new Promise(async (resolve, reject) => {
      try {
        await api.postVote(post_id, vote)
        posts.value[postIndex].counts.my_vote = vote
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  function savePost(post_id, postIndex, saved) {
    return new Promise(async (resolve, reject) => {
      try {
        await api.postSave(post_id, saved)
        posts.value[postIndex].content.saved = saved
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  function requestSinglePost(post_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await api.getSinglePost(post_id)

        const postUrl = resp.post_view.post.url || ''
        let postDomain = ''
        if (postUrl.length)
          postDomain = postUrl.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/im)[1]

        const hasUrl = postUrl.length
        const hasImage = hasUrl && /\.(jpg|jpeg|png|apng|gif|bmp|webp|svg|ico)$/i.test(postUrl)
        const hasVideo = hasUrl && /\.(webm|mp4|ogg|avi|mov|wmv|flv)$/i.test(postUrl)
        const hasAudio = hasUrl && /\.(mp3|wav|aac|flac)$/i.test(postUrl)
        const extension = postUrl.split('.').pop()

        let my_vote = null
        if (api.authenticated) {
          if (typeof resp.post_view.my_vote !== 'undefined') {
            my_vote = resp.post_view.my_vote
          }
        }

        const postData = {
          community: {
            local: resp.post_view.community.local,
            id: resp.post_view.community.id,
            name: resp.post_view.community.name,
            title: resp.post_view.community.title,
            actor_id: resp.post_view.community.actor_id,
            actor_domain: (resp.post_view.community.actor_id.match(/https:\/\/([^/]+)\/c\//) ||
              [])[1],
            icon: resp.post_view.community.icon || ''
          },
          counts: {
            comments: resp.post_view.counts.comments,
            upvotes: resp.post_view.counts.upvotes,
            downvotes: resp.post_view.counts.downvotes,
            newest_comment_time: resp.post_view.counts.newest_comment_time,
            published: resp.post_view.counts.published,
            score: resp.post_view.counts.score,
            unread_comments: resp.post_view.unread_comments,
            my_vote: my_vote
          },
          creator: {
            actor_id: resp.post_view.creator.actor_id,
            actor_domain: (resp.post_view.creator.actor_id.match(/https:\/\/([^/]+)\/u\//) ||
              [])[1],
            admin: resp.post_view.creator.admin,
            avatar: resp.post_view.creator.avatar || '',
            bot_account: resp.post_view.creator.bot_account,
            id: resp.post_view.creator.id,
            local: resp.post_view.creator.local,
            name: resp.post_view.creator.name
          },
          content: {
            id: resp.post_view.post.id,
            ap_id: resp.post_view.post.ap_id,
            body: resp.post_view.post.body || '',
            locked: resp.post_view.post.locked,
            name: resp.post_view.post.name,
            nsfw: resp.post_view.post.nsfw,
            published: formatRelativeTime(resp.post_view.post.published),
            // updated: formatRelativeTime(resp.post_view.updated),
            url: postUrl,
            url_domain: postDomain,
            hasImage: hasImage,
            hasUrl: hasUrl,
            hasMedia: hasImage || hasVideo || hasAudio,
            hasVideo: hasVideo,
            hasAudio: hasAudio,
            extension: hasImage || hasVideo || hasAudio ? extension : null,
            read: resp.post_view.read,
            saved: resp.post_view.saved
          }
        }
        resolve(postData)
      } catch (error) {
        reject(error)
      }
    })
  }

  function requestPosts(sort, view) {
    return new Promise(async (resolve, reject) => {
      try {
        const postData = await api.getPosts(sort, view, page)
        const postArray = postData.posts

        if (page.value == 1) posts.value = []

        for (let i = 0; i < postArray.length; i++) {
          if (
            postArray[i].creator_banned_from_community ||
            postArray[i].creator_blocked ||
            postArray[i].community.deleted ||
            postArray[i].post.removed
          ) {
            // console.log('Removed post')
            // console.log('creator_banned_from_community', postArray[i].creator_banned_from_community)
            // console.log('creator_blocked', postArray[i].creator_blocked)
            // console.log('community.deleted', postArray[i].community.deleted)
            // console.log('post.removed', postArray[i].post.removed)
            continue
          } else {
            const postUrl = postArray[i].post.url || ''
            let postDomain = ''
            if (postUrl.length)
              postDomain = postUrl.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/im)[1]

            const hasUrl = postUrl.length
            const hasImage = hasUrl && /\.(jpg|jpeg|png|apng|gif|bmp|webp|svg|ico)$/i.test(postUrl)
            const hasVideo = hasUrl && /\.(webm|mp4|ogg|avi|mov|wmv|flv)$/i.test(postUrl)
            const hasAudio = hasUrl && /\.(mp3|wav|aac|flac)$/i.test(postUrl)
            const extension = postUrl.split('.').pop()

            let my_vote = null
            if (api.authenticated) {
              if (typeof postArray[i].my_vote !== 'undefined') {
                my_vote = postArray[i].my_vote
              }
            }

            posts.value.push({
              community: {
                local: postArray[i].community.local,
                id: postArray[i].community.id,
                name: postArray[i].community.name,
                title: postArray[i].community.title,
                actor_id: postArray[i].community.actor_id,
                actor_domain: (postArray[i].community.actor_id.match(/https:\/\/([^/]+)\/c\//) ||
                  [])[1],
                icon: postArray[i].community.icon || ''
              },
              counts: {
                comments: postArray[i].counts.comments,
                upvotes: postArray[i].counts.upvotes,
                downvotes: postArray[i].counts.downvotes,
                newest_comment_time: postArray[i].counts.newest_comment_time,
                published: postArray[i].counts.published,
                score: postArray[i].counts.score,
                unread_comments: postArray[i].unread_comments,
                my_vote: my_vote
              },
              creator: {
                actor_id: postArray[i].creator.actor_id,
                actor_domain: (postArray[i].creator.actor_id.match(/https:\/\/([^/]+)\/u\//) ||
                  [])[1],
                admin: postArray[i].creator.admin,
                avatar: postArray[i].creator.avatar || '',
                bot_account: postArray[i].creator.bot_account,
                id: postArray[i].creator.id,
                local: postArray[i].creator.local,
                name: postArray[i].creator.name
              },
              content: {
                id: postArray[i].post.id,
                ap_id: postArray[i].post.ap_id,
                body: postArray[i].post.body || '',
                locked: postArray[i].post.locked,
                name: postArray[i].post.name,
                nsfw: postArray[i].post.nsfw,
                published: formatRelativeTime(postArray[i].post.published),
                updated: formatRelativeTime(postArray[i].post.updated),
                url: postUrl,
                url_domain: postDomain,
                hasImage: hasImage,
                hasUrl: hasUrl,
                hasMedia: hasImage || hasVideo || hasAudio,
                hasVideo: hasVideo,
                hasAudio: hasAudio,
                extension: hasImage || hasVideo || hasAudio ? extension : null,
                read: postArray[i].read,
                saved: postArray[i].saved
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

  function getPostIndexById(post_id) {
    for (let i = 0; i < posts.value.length; i++) {
      if (posts.value[i].content.id == post_id) return i
    }
    return -1
  }

  return {
    posts,
    page,
    requestSinglePost,
    requestPosts,
    sendVote,
    savePost,
    getPostIndexById
  }
})
