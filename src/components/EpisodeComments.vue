<template>
  <div class="comments">
    <form
      class="comments__form"
      @submit.prevent="submit"
    >
      <textarea
        v-model="content"
        placeholder="Your comment here"
      />
      <div class="comments__bar">
        <input
          v-model="author"
          type="text"
          placeholder="Username"
        >
        <button type="submit">
          <IconPlus />
        </button>
      </div>
    </form>
    <transition-group
      name="fade-up"
    >
      <BaseItem
        v-for="comment in comments"
        :key="comment.id"
        :title="comment.author"
        :subtitle="comment.created | time-ago"
      >
        {{ comment.content }}
      </BaseItem>
    </transition-group>
  </div>
</template>

<script>
import BaseItem from '@/components/BaseItem';
import IconPlus from '@/assets/icon-add.svg';

export default {
  components: {
    BaseItem,
    IconPlus,
  },

  props: {
    comments: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      content: '',
      author: '',
    };
  },

  methods: {
    submit() {
      this.$emit('postComment', {
        content: this.content,
        author: this.author,
      });

      this.content = '';
      this.author = '';
    }
  }
};
</script>

<style scoped lang="scss">
  .comments {
    &__form {
      margin-bottom: 10px;
      background: #fff;
      border-radius: 15px;

      textarea {
        width: 100%;
        height: 120px;
        padding: 20px 15px;
        border: 0;
        background: none;
        outline: none;
        color: $c-text-secondary;
      }
    }

    &__bar {
      position: relative;
      display: flex;
      padding: 0 5px 0 15px;
      align-items: center;
      height: 46px;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 15px;
        right: 15px;
        border-top: 1px solid $c-border;
      }

      &::before,
      button {
        height: 24px;
        line-height: 21px;
        text-align: center;
        color: $c-text-primary;
      }

      &::before {
        content: '@';
        width: 30px;
        border-right: 1px solid $c-border;
        font-size: 17px;
      }

      button {
        padding: 0 10px;
        border-left: 1px solid $c-border;
        cursor: pointer;

        &:hover {
          color: $c-primary;
        }

        svg {
          width: 24px;
          height: 24px;
        }
      }

      input {
        flex: 1;
        height: 40px;
        padding: 10px;
        border: 0;
        outline: none;

        &::placeholder {
          color: $c-text-secondary;
        }
      }
    }
  }
</style>
