<template>
  <div class="mainpage-layout">
    <div class="content-panel">
      <lazy-sub-title :sub-title="subTitle" />
      <form class="form-layout" @submit.prevent="save_company">
        <div class="section">
          <h2 class="section-header">1 建議採用的公司名稱 Proposed Company Name</h2>
          <div class="section-content">
            <div>建議採用的公司英文名稱Proposed English Company Name</div>
            <textarea v-model="form_data.company_english_name"></textarea>
            <div>建議採用的公司中文名稱Proposed Chinese Company Name</div>
            <textarea v-model="form_data.company_chinese_name"></textarea>
          </div>
        </div>
        <div class="section">
          <h2 class="section-header">2 公司類別 Type of Company</h2>
          <div class="section-content form-option">
            <span>
              <input id="type_of_company_2" v-model="form_data.type_of_company" value="2" type="radio" />
              <label for="type_of_company_2">私人 Private</label>
            </span>
            <span>
              <input id="type_of_company_1" v-model="form_data.type_of_company" value="1" type="radio" />
              <label for="type_of_company_1">公眾 Public</label>
            </span>
          </div>
        </div>
        <div class="section">
          <h2 class="section-header">3 公司在香港的註冊辦事處的建議地址</h2>
          <div class="section-content">
            <h3 class="section-subtitle">Proposed Address of the Company's Registered Office in Hong Kong</h3>
            <input v-model="form_data.company_address[0]" />
            <input v-model="form_data.company_address[1]" />
            <input v-model="form_data.company_address[2]" />
            <input v-model="form_data.company_address[3]" />
          </div>
        </div>
        <div class="section">
          <h2 class="section-header">4 電郵地址Email Address</h2>
          <div class="section-content">
            <input v-model="form_data.company_email" />
          </div>
        </div>
        <div class="section">
          <h2 class="section-header">提交人資料Presentor’s Reference</h2>
          <div>
            <label>姓名Name:</label>
            <input v-model="form_data.presentor_name" />
          </div>
          <div>
            <label>地址Address:</label>
            <div>
              <input v-model="form_data.presentor_address[0]" />
              <input v-model="form_data.presentor_address[1]" />
              <input v-model="form_data.presentor_address[2]" />
              <input v-model="form_data.presentor_address[3]" />
            </div>
          </div>
          <div>
            <label>電話Tel:</label>
            <input v-model="form_data.presentor_tel" />
          </div>
          <div>
            <label>傳真Fax:</label>
            <input v-model="form_data.presentor_fax" />
          </div>
          <div>
            <label>電郵Email:</label>
            <input v-model="form_data.presentor_email" />
          </div>
          <div>
            <label>檔號Reference:</label>
            <input v-model="form_data.presentor_reference" />
          </div>
        </div>
        <div class="section">
          <h2 class="section-header">5 公司組成時的股本及最初的股份持有情況</h2>
          <h3>Share Capital and Initial Shareholdings on the Company’s Formation</h3>
          <div class="row header">
            <div>股份的類別(如普通股／優先股等) Class of Shares (e.g. Ordinary／Preference etc.)</div>
            <div>建議發行的股份總數 Total Number of Shares Proposed to be Issued</div>
            <div>貨幣 Currency</div>
            <div>
              創辦成員認購的股本總額 Total Amount of Share Capital to be Subscribed by Founder Members
              <div>(a)</div>
            </div>
            <div>
              建議發行的股份的將要繳付或視為已繳付的總款額 Total Amount to be Paid Up or to be Regarded as Paid Up on the Shares Proposed to be Issued
              <div>(b)</div>
            </div>
            <div>
              建議發行的股份的尚未繳付或視為尚未繳付的總款額 Total Amount to Remain Unpaid or to be Regarded as Unpaid on the Shares Proposed to be Issued
              <div>(a) - (b)</div>
            </div>
          </div>
          <div class="row">
            <div><input v-model="form_data.company_formation[0][0]" /></div>
            <div><input v-model="form_data.company_formation[0][1]" type="number" /></div>
            <div><input v-model="form_data.company_formation[0][2]" /></div>
            <div><input v-model="form_data.company_formation[0][3]" type="number" /></div>
            <div><input v-model="form_data.company_formation[0][4]" type="number" /></div>
            <div>{{ form_data.company_formation[0][5] }}</div>
          </div>
          <div class="row">
            <div><input v-model="form_data.company_formation[1][0]" /></div>
            <div><input v-model="form_data.company_formation[1][1]" type="number" /></div>
            <div><input v-model="form_data.company_formation[1][2]" /></div>
            <div><input v-model="form_data.company_formation[1][3]" type="number" /></div>
            <div><input v-model="form_data.company_formation[1][4]" type="number" /></div>
            <div>{{ form_data.company_formation[1][5] }}</div>
          </div>
          <div class="row">
            <div><input v-model="form_data.company_formation[2][0]" /></div>
            <div><input v-model="form_data.company_formation[2][1]" type="number" /></div>
            <div><input v-model="form_data.company_formation[2][2]" /></div>
            <div><input v-model="form_data.company_formation[2][3]" type="number" /></div>
            <div><input v-model="form_data.company_formation[2][4]" type="number" /></div>
            <div>{{ form_data.company_formation[2][5] }}</div>
          </div>
          <div class="row">
            <div>總值Total</div>
            <div>{{ form_data.company_formation[3][1] }}</div>
            <div class="grey-cell"></div>
            <div>{{ form_data.company_formation[3][3] }}</div>
            <div>{{ form_data.company_formation[3][4] }}</div>
            <div>{{ form_data.company_formation[3][5] }}</div>
          </div>
        </div>
        <div class="section">
          <h2 class="section-header">5A 股份所附帶的權利的詳情Particulars of Rights Attached to Shares</h2>
          <div class="section-content">
            <h4 class="section-desc">(只適用於發行超過一類股份的公司 Only applicable to company issuing more than 1 class of shares)</h4>
            <div class="row header">
              <div>股份的類別(如普通股／優先股等) Class of Shares (e.g. Ordinary／ Preference etc.)</div>
              <div>附帶的權利的詳情(包括表決權；在分派股息時參與該項分派的權利；在分派股本時參與該項分派的權利；該類別股份是否屬可贖回股份等) Particulars of Rights Attached (Including voting rights; rights to participate in a distribution as respects dividends; rights to participate in a distribution as respects capital; whether the shares are redeemable etc.)</div>
            </div>
            <div class="row">
              <div><textarea v-model="form_data.class_of_shares"></textarea></div>
              <div><textarea v-model="form_data.particulars_of_rights_attached"></textarea></div>
            </div>
          </div>
        </div>
        <div class="section">
          <h2 class="section-header">6 創辦成員Founder Members</h2>
          <h4>(如超過兩名創辦成員，請用續頁A填報 Use Continuation Sheet A if more than 2 founder members)</h4>
          <div>
            <div>1</div>
            <div>
              <div>
                <label>
                  <div>中文姓名／名稱</div>
                  <div>Name in Chinese</div>
                </label>
                <input v-model="form_data.fonder_member_chinese_name_1" />
              </div>
              <div>
                <label>
                  <div>英文姓名／名稱</div>
                  <div>Name in English</div>
                </label>
                <input v-model="form_data.fonder_member_english_name_1" />
              </div>
              <div>
                <div>
                  <label>
                    <div>地址</div>
                    <div>Address</div>
                  </label>
                  <label>
                    <div>國家／地區</div>
                    <div>Country／Region</div>
                  </label>
                </div>
                <div>
                  <input v-model="form_data.fonder_member_address_1[0]" />
                  <input v-model="form_data.fonder_member_address_1[1]" />
                  <input v-model="form_data.fonder_member_address_1[2]" />
                  <input v-model="form_data.fonder_member_address_1[3]" />
                </div>
              </div>
              <div>
                <div class="row header">
                  <div>股份的類別(如普通股／優先股等) Class of Shares (e.g. Ordinary／Preference etc.)</div>
                  <div>建議發行的股份總數 Total Number of Shares Proposed to be Issued</div>
                  <div>貨幣 Currency</div>
                  <div>
                    創辦成員認購的股本總額 Total Amount of Share Capital to be Subscribed by Founder Members
                    <div>(a)</div>
                  </div>
                  <div>
                    建議發行的股份的將要繳付或視為已繳付的總款額 Total Amount to be Paid Up or to be Regarded as Paid Up on the Shares Proposed to be Issued
                    <div>(b)</div>
                  </div>
                  <div>
                    建議發行的股份的尚未繳付或視為尚未繳付的總款額 Total Amount to Remain Unpaid or to be Regarded as Unpaid on the Shares Proposed to be Issued
                    <div>(a) - (b)</div>
                  </div>
                </div>
                <div class="row">
                  <div><input v-model="form_data.company_formation[0][0]" /></div>
                  <div><input v-model="form_data.company_formation[0][1]" type="number" /></div>
                  <div><input v-model="form_data.company_formation[0][2]" /></div>
                  <div><input v-model="form_data.company_formation[0][3]" type="number" /></div>
                  <div><input v-model="form_data.company_formation[0][4]" type="number" /></div>
                  <div>{{ form_data.company_formation[0][5] }}</div>
                </div>

                <div class="row">
                  <div><input v-model="form_data.company_formation[1][0]" /></div>
                  <div><input v-model="form_data.company_formation[1][1]" type="number" /></div>
                  <div><input v-model="form_data.company_formation[1][2]" /></div>
                  <div><input v-model="form_data.company_formation[1][3]" type="number" /></div>
                  <div><input v-model="form_data.company_formation[1][4]" type="number" /></div>
                  <div>{{ form_data.company_formation[1][5] }}</div>
                </div>
                <div class="row">
                  <div><input v-model="form_data.company_formation[2][0]" /></div>
                  <div><input v-model="form_data.company_formation[2][1]" type="number" /></div>
                  <div><input v-model="form_data.company_formation[2][2]" /></div>
                  <div><input v-model="form_data.company_formation[2][3]" type="number" /></div>
                  <div><input v-model="form_data.company_formation[2][4]" type="number" /></div>
                  <div>{{ form_data.company_formation[2][5] }}</div>
                </div>
                <div class="row">
                  <div>總值Total</div>
                  <div>{{ form_data.company_formation[3][1] }}</div>
                  <div class="grey-cell"></div>
                  <div>{{ form_data.company_formation[3][3] }}</div>
                  <div>{{ form_data.company_formation[3][4] }}</div>
                  <div>{{ form_data.company_formation[3][5] }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="action-panel">
          <button class="primary-button" type="submit">提交</button>
          <button class="secondary-button" type="button" @click="$fetch">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import client from "~/store/client";
  import company from "~/store/company";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        title: "公司詳情",
        form_data: {
          company_address: [],
          presentor_address: [],
          company_formation: [[], [], [], [], []],
          fonder_member_address_1: [],
          fonder_member_address_2: [],
        },
      };
    },
    async fetch() {
      await this.$store.dispatch("client/getClient", {
        id: this.$route.params["id"],
      });
      this.form_key += 1;
    },
    computed: {
      ...mapGetters({
        client: "client/client",
      }),
      subTitle: function () {
        return `客戶: ${this.client.username} -> 新增公司`;
      },
    },
    created() {
      this.$store.dispatch("setPage", { page_name: this.title });
      if (!this.$store.hasModule("client")) {
        this.$store.registerModule("client", client);
      }
      if (!this.$store.hasModule("company")) {
        this.$store.registerModule("company", company);
      }
    },
    methods: {
      save_company(payload) {
        this.$store.dispatch("company/saveCompany", { id: this.$route.params["id"], ...payload });
      },
    },
  };
</script>

<style scoped lang="scss">
  .section-header {
    font-size: 24px;
  }
  .section-content {
    padding-left: 20px;
  }

  .section-desc {
    color: $gray-text;
    font-size: 14px;
  }

  input:not([type=radio]) {
    border: 1px $gray-header solid;
    font-size: 20px;
    width: 100%;
  }
  textarea {
    width: 100%;
    height: 100px;
    resize: none;
  }

  .form-option {
    display: flex;
    justify-content: space-around;
  }
</style>
