<script setup lang="ts">
import { computed } from "vue";
import { useOneSDKStore } from "@/stores/OneSDK";
const oneSdkStore = useOneSDKStore();

const comments = computed(() => {
  return oneSdkStore.comments;
});
</script>

<template>
  <div class="container-fluid vw-100 vh-100 px-0">
    <transition-group
      class="h-100 d-flex flex-column justify-content-end comment"
      name="comment"
      tag="div"
    >
      <template v-for="({ comment }, index) in comments" :key="comment.data.id">
        <div
          class="d-flex border-top"
          :data-service="comment.service"
          :data-user="comment.data.name"
          :data-gift="comment.data.hasGift"
          :data-owner="comment.data.isOwner"
          :data-moderator="comment.data.isModerator"
          :data-member="comment.data.isMember"
          :data-is-new="comment.data.isFirstTime"
          :data-service-name="comment.name"
          :data-service-id="comment.id"
          :data-paid="comment.data.paidText"
        >
          <div class="rounded-circle overflow-hidden avatar">
            <img
              v-if="comment.data.profileImage"
              class="h-100 w-100 object-fit-contain"
              alt=""
              :src="comment.data.profileImage"
            />
          </div>

          <div class="comment-block">
            <div class="comment-name">
              {{ comment.data.displayName }}
              <span v-for="(badge, index) in comment.data.badges" :key="index" class="p-0 badge">
                <img v-if="badge.url" :alt="badge.label" :src="badge.url" :title="badge.label" />
              </span>
              <span v-if="comment.data.isFirstTime" class="ms-1 badge text-bg-danger p-0"
                >初コメ</span
              >
            </div>

            <div class="comment-body">
              <div v-if="comment.data.paidText" class="paid-text">
                <!-- スーパーチャット -->
                <strong>{{ comment.data.paidText }}</strong>
              </div>
              <div v-if="comment.data.membership" class="paid-text">
                <!-- メンバーシップ -->
                {{ comment.data.membership.sub }} {{ comment.data.membership.primary }}
              </div>
              <div class="comment-text" v-html="comment.data.comment"></div>
            </div>
          </div>
        </div>
      </template>
    </transition-group>
  </div>
</template>

<style lang="css">
.comment {
  --lcv-move-duration: 50ms;
  --lcv-move-easing: ease-out;

  --lcv-name-size: 0.8rem;
  --lcv-body-size: 1rem;

  --lcv-avatar-size: calc(var(--lcv-name-size) + var(--lcv-body-size));
}

.comment-move,
.comment-enter-active,
.comment-leave-active {
  transition: all var(--lcv-move-duration) var(--lcv-move-easing);
}

.comment-enter-from {
  transform: translateY(100%) !important;
}

.comment-leave-to {
  transform: translateY(-100%) !important;
}

.avatar {
  min-width: var(--lcv-avatar-size);
  min-height: var(--lcv-avatar-size);
  width: var(--lcv-avatar-size);
  height: var(--lcv-avatar-size);
}

.comment-name {
  font-size: var(--lcv-name-size);
  line-height: var(--lcv-name-size);
}

.comment-name img {
  height: var(--lcv-name-size);
}

.comment-name .new {
  height: var(--lcv-name-size);
}

.comment-body {
  font-size: var(--lcv-body-size);
  line-height: var(--lcv-body-size);
}

.comment-body img {
  height: var(--lcv-body-size);
}
</style>
