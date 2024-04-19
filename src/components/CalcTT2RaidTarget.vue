<template>
    <div>
    <h1>輸入9個數字</h1>
    <form @submit.prevent="handleSubmit">
      <div class="input-container">
        <div class="input-item" v-for="(input, index) in inputs" :key="index">
          <label :for="`input${index + 1}`">{{ index + 1 }}：</label>
          <input :id="`input${index + 1}`" type="text" v-model=inputs[index] required>
        </div>
        <div class="submit-button">
          <button type="submit">提交</button>
        </div>
      </div>
    </form>
    <div v-if="response">
      <h2>後端返回的JSON響應:</h2>
      <pre>{{ response }}</pre>
    </div>
  </div>
</template>

<script>
const apiUrl = 'http://backend.braindump.test/api'

export default {
  data() {
    return {
      inputs: Array(9).fill('').map(() => (Math.random() * 100).toFixed(2)),
      response: null
    };
  },
  methods: {
    async handleSubmit() {
      console.table(JSON.stringify({"inputs": this.inputs}))
      try {
        const response = await fetch(`${apiUrl}/tt2/raid_target`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"inputs": this.inputs})
        });
        this.response = await response.json();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
};
</script>

<style scoped>
.input-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.input-container .input-item {
  flex-basis: calc(50% - 10px); /* 控制 input 佔父容器的寬度，並給一定的間隔 */
  margin-bottom: 10px; /* 設置間隔 */
}

.input-container .input-item:nth-last-child(1) {
  order: 1;
}

.input-container .submit-button {
  flex-basis: 100%;
  margin-top: 10px
}
</style>
