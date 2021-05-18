<template>
  <div class="list-layout">
    <div class="list-title-panel">
      <div class="list-title">
        {{ listDesc.title }}
        <nuxt-link v-if="listDesc.url" class="icon-panel" :to="listDesc.url">
          <fa-icon :icon="['fas', 'plus-circle']" />
        </nuxt-link>
      </div>
      <!-- <div class="list-search">
        <input v-for="(s_a, s_a_i) in listDesc.search_addon" :key="`search_addon_${s_a_i}`" v-model="list_search[s_a.data_location]" type="text" :placeholder="s_a.label" />
        <input v-model="list_search.search_text" type="text" placeholder="Keyword" />
        <span class="icon-panel" @click="update_search()">
          <fa-icon :icon="['fas', 'search']" />
        </span>
      </div> -->
    </div>
    <div class="list-page-detail">{{ page_desc }}</div>
    <table class="list-content-panel">
      <thead>
        <tr>
          <td v-for="(c, c_i) in columns" :key="`list_header_item_${c_i}`">{{ c.label }}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(r, r_i) in data" :key="`list_row_${r_i}`" class="list-row">
          <td v-for="(c, c_i) in columns" :key="`list_row_item_${r_i}_${c_i}`">
            <span v-if="c.data_location">{{ r[c.data_location] }}</span>
            <nuxt-link v-else-if="listDesc.url" :to="`${listDesc.url}${r.id}`">{{ c.url_desc }}</nuxt-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-panel">
      <button :disabled="offset < 1" class="prev-button" type="button" @click="update_search(1)">
        <fa-icon :icon="['fas', 'chevron-left']" />
      </button>
      <button v-if="offset > 2" type="button" @click="update_search(offset - 2)">{{ offset - 1 }}</button>
      <button v-if="offset > 1" type="button" @click="update_search(offset - 1)">{{ offset }}</button>
      <button class="current-page-button" type="button">{{ offset + 1 }}</button>
      <button v-if="offset + 1 < count / limit" type="button" @click="update_search(offset + 1)">{{ offset + 2 }}</button>
      <button v-if="offset + 2 < count / limit" type="button" @click="update_search(offset + 2)">{{ offset + 3 }}</button>
      <button :disabled="offset + 1 > count / limit" class="next-button" type="button" @click="update_search(Math.floor(count / limit) - 1)">
        <fa-icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      url: {
        type: String,
        default: "",
      },
      columns: {
        type: Array,
        default() {
          return [];
        },
      },
      data: {
        type: Array,
        default() {
          return [];
        },
      },
      offset: {
        type: Number,
        default: 0,
      },
      limit: {
        type: Number,
        default: 20,
      },
      count: {
        type: Number,
        default: 0,
      },
      listDesc: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    emits: ["update_search"],
    data() {
      return {};
    },
    async fetch() {
    },
    computed: {
      page_desc: function () {
        return `第 ${this.count ? this.limit * this.offset + 1 : this.count} to ${this.limit * (this.offset + 1) < this.count ? this.limit * (this.offset + 1) : this.count} ${this.listDesc.desc} / 總共 ${this.count} ${this.listDesc.desc}`;
      },
    },
    created() {console.log(this.data)},
    methods: {
      update_search(page_no) {
        this.$emit("update_search", Object.assign(this.list_search, { page_no: page_no }));
      },
    },
  };
</script>

<style scoped lang="scss">
  .list-title-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .list-title {
    font-size: 22px;
    display: flex;
    .icon-panel {
      background-color: $purple;
      display: flex;
      width: 30px;
      height: 30px;
      align-items: center;
      justify-content: center;
      margin-left: 5px;
      border-radius: 25px;
      color: $white;
    }
  }
  .list-search {
    display: flex;
    input {
      background-color: transparent;
      border: 1px $gray-border solid;
      border-radius: 5px;
      padding: 0 10px;
    }
    .icon-panel {
      background-color: $purple;
      display: flex;
      width: 40px;
      height: 40px;
      align-items: center;
      justify-content: center;
      margin-left: 5px;
      border-radius: 5px;
      color: $white;
    }
  }

  .list-page-detail {
    font-size: 15px;
    margin: 20px 0 5px;
  }

  .list-content-panel {
    width: 100%;
    border-spacing: 0 10px;
    td {
      padding: 10px 15px;
      &:first-of-type {
        padding-left: 40px;
      }
      a {
        color: $purple;
      }
    }
    tr {
      background-color: $white;
      box-shadow: $box-shadow;
      border-radius: 5px;
    }
    .list-row:nth-child(2n) {
      background-color: #fafafa;
    }
  }

  .pagination-panel {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    button {
      border: none;
      border-radius: 20px;
      height: 30px;
      width: 30px;
      cursor: pointer;
      background-color: $white;
      color: $gray-reminder;
      margin-left: 10px;
      &.prev-button {
        margin-right: 15px;
      }
      &.next-button {
        margin-left: 25px;
      }
      &:hover,
      &.current-page-button {
        background-color: $purple;
        color: $white;
      }
      &:disabled {
        background-color: $gray-border;
        color: $gray-reminder;
        cursor: none;
      }
    }
  }
</style>
