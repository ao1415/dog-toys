import { type Ref, ref } from "vue";
import { defineStore } from "pinia";
import { OneSDK } from "@onecomme.com/onesdk/OneSDK";
import type { Comment as OneSDKComment } from "@onecomme.com/onesdk/types/Comment";

interface CommentType {
  id: number;
  comment: OneSDKComment;
}

export const useOneSDKStore = defineStore("OneSDK", () => {
  const oneSDK = ref(null) as Ref<OneSDK | null>;
  const comments = ref([]) as Ref<CommentType[]>;

  const init = async () => {
    const sdk = oneSDK.value;
    if (sdk == null) {
      return;
    }
    await sdk.setup({ commentLimit: 30 });

    let cache = new Map();
    let commentIndex = 0;
    sdk.subscribe({
      action: "comments",
      callback: (sdkComments) => {
        const newCache = new Map();
        const list = sdkComments as OneSDKComment[];
        const newComments = [] as CommentType[];
        for (const comment of list) {
          const id = cache.get(comment.data.id);
          let cid = commentIndex;
          if (isNaN(id)) {
            cid = commentIndex;
            newCache.set(comment.data.id, commentIndex);
            ++commentIndex;
          } else {
            cid = id;
            newCache.set(comment.data.id, id);
          }
          newComments.push({ id: cid, comment: comment });
        }
        cache = newCache;
        comments.value = newComments;
      },
    });
    await sdk.connect();
  };

  return { oneSDK, comments, init };
});
