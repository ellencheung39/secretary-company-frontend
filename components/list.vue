<template>
  <div class="list-layout">
    <div class="list-title-panel">
      <div class="list-title">
        {{ list_desc.title }}
        <nuxt-link v-if="list_desc.is_create_enabled" class="icon-panel" :to="list_desc.url">
          <fa-icon :icon="['fas', 'plus-circle']" />
        </nuxt-link>
      </div>
      <div class="list-search">
        <input v-for="(s_a, s_a_i) in list_desc.search_addon" :key="`search_addon_${s_a_i}`" v-model="list_search[s_a.data_location]" type="text" :placeholder="s_a.label" />
        <input v-model="list_search.search_text" type="text" placeholder="Keyword" />
        <span class="icon-panel" @click="update_search()">
          <fa-icon :icon="['fas', 'search']" />
        </span>
      </div>
    </div>
    <div class="list-page-detail">{{ page_desc() }}</div>
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
            <nuxt-link v-else :to="`${list_desc.url}${r.id}`">{{ c.url_desc }}</nuxt-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-panel">
      <button :disabled="search.page_no <= 1" class="prev-button" type="button" @click="update_search(1)">
        <fa-icon :icon="['fas', 'chevron-left']" />
      </button>
      <button v-if="search.page_no > 2" type="button" @click="update_search(search.page_no - 2)">{{ search.page_no - 2 }}</button>
      <button v-if="search.page_no > 1" type="button" @click="update_search(search.page_no - 1)">{{ search.page_no - 1 }}</button>
      <button class="current-page-button" type="button">{{ search.page_no }}</button>
      <button v-if="search.page_no + 1 <= search.total_count / search.item_per_page" type="button" @click="update_search(search.page_no + 1)">{{ search.page_no + 1 }}</button>
      <button v-if="search.page_no + 2 <= search.total_count / search.item_per_page" type="button" @click="update_search(search.page_no + 2)">{{ search.page_no + 2 }}</button>
      <button :disabled="search.page_no >= search.total_count / search.item_per_page" class="next-button" type="button" @click="update_search(Math.floor(search.total_count / search.item_per_page))">
        <fa-icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      url: String,
      columns: Array,
      data: Array,
      search: Object,
      list_desc: Object,
    },
    data() {
      return {
        list_search: {},
      };
    },
    async fetch() {
      this.list_search = Object.assign({}, this.search);
    },
    computed: {},
    created() {},
    methods: {
      page_desc() {
        return `第 ${
          this.search.item_per_page * (this.search.page_no - 1) + 1
        } to ${
          this.search.item_per_page * this.search.page_no <
          this.search.total_count
            ? this.search.item_per_page * this.search.page_no
            : this.search.total_count
        } ${this.list_desc.desc} / 總共 ${this.search.total_count} ${
          this.list_desc.desc
        }`;
      },
      update_search(page_no) {
        this.$emit(
          "update_search",
          Object.assign(this.list_search, { page_no: page_no })
        );
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
