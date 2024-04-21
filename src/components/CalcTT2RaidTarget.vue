<template>
  <div id="tt2-container">
    <section id="input-section">
      <h2>Input Titan Status:</h2>
      <form @submit.prevent="handleSubmit">
        <div class="input-container">
          <div class="input-item" v-for="(input, index) in inputs" :key="index">
            <label :for="`input${index + 1}`">{{ parts[index] }}：</label>
            <input :id="`input${index + 1}`" type="text" v-model=inputs[index] required>
          </div>
          <div class="submit-button">
            <button type="submit">Calculate!</button>
          </div>
        </div>
      </form>
    </section>

    <section id="result-section">
      <div>
        <h3>Targets shown below</h3>
        <div class="target-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 150" width="200" height="300">
            <!-- Head -->
            <circle id="Head" cx="50" cy="30" r="15" fill="lightgray" />
            <!-- Left-shoulder -->
            <rect id="Arm-1" x="8" y="46" width="20" height="20" fill="lightgray" />
            <!-- Left-arm -->
            <rect id="Arm-2" x="8" y="68" width="20" height="20" fill="lightgray" />
            <!-- Right-shoulder -->
            <rect id="Arm-3" x="72" y="46" width="20" height="20" fill="lightgray" />
            <!-- Right-arm -->
            <rect id="Arm-4" x="72" y="68" width="20" height="20" fill="lightgray" />
            <!-- Torso -->
            <rect id="Torso" x="30" y="50" width="40" height="50" fill="lightgray" />
            <!-- Left-leg -->
            <rect id="Leg-1" x="30" y="102" width="15" height="30" fill="lightgray" />
            <!-- Right-leg -->
            <rect id="Leg-2" x="55" y="102" width="15" height="30" fill="lightgray" />
          </svg>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const apiUrl = 'http://backend.braindump.test/api'

export default {
  data() {
    return {
      // inputs: Array(9).fill('').map(() => (Math.random() * 100).toFixed(2)),
      inputs: Array(9).fill(0.0),
      parts: ['HEAD HP', 'HEAD AP', 'TORSO HP', 'TORSO AP', 'ARMS HP', 'ARMS AP', 'LEGS HP', 'LEGS AP', 'TARGET HP'],
      result: null
    };
  },
  methods: {
    resetSvgColor() {
      const svgElements = document.querySelectorAll('.target-container svg [fill]');
      svgElements.forEach(element => {
        element.setAttribute('fill', 'lightgray'); // 或其他你希望的初始顏色
      });
    },
    drawTargetOnSvg() {
      let totalHp = 0.0
      let totalAp = 0.0
      // draw by result
      for (let part of Object.values(this.result)) {
        document.getElementById(`${part.name}`).setAttribute('fill', 'green');
        totalHp += parseFloat(part.hp)
        totalAp += parseFloat(part.ap)
      }

      // console.log(`Total HP: ${totalHp}`)
      // console.log(`Total AP: ${totalAp}`)
      // console.log(`Exceed HP: ${totalHp - this.inputs[8]}`)
    },
    async handleSubmit() {
      try {
        // reset svg if has previous data
        if (this.result) {
          this.resetSvgColor()
        }

        // sending request
        const response = await fetch(`${apiUrl}/tt2/raid_target`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"inputs": this.inputs})
        });
        this.result = await response.json();

        // Must use nextTick to prevent svg havn't rendered
        this.$nextTick(() => {
          this.drawTargetOnSvg();
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
};
</script>

<style scoped>
/* 1 row 2 input, last input oh left */
.input-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}

.input-container .input-item {
  grid-column: span 1;
}

.input-container .input-item:nth-child(9) {
  grid-column: 2;
}

/* set width for inner element to align */
.input-container .input-item label {
  display: inline-block;
  width: 120px;
}

.input-container .input-item input {
  width: calc(70% - 100px);
}

.input-container .submit-button {
  grid-column: span 2;
}

#tt2-container {
  display: flex;
}

#tt2-container #input-section {
  flex: 1;
  padding-right: 20px;
  width: calc(50% - 20px);
}

#tt2-container #result-section {
  flex: 1;
  width: 50%
}
</style>
