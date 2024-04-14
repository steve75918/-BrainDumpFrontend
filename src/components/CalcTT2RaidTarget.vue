<template>
    <div>
      <h1>輸入9個數字</h1>
      <form @submit.prevent="handleSubmit">
        <label v-for="(input, index) in inputs" :key="index">
          {{ index + 1 }}:
          <input type="text" v-model=inputs[index] required>
        </label>
        <button type="submit">提交</button>
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
  /* 可以添加一些樣式來美化你的表單 */
  </style>
