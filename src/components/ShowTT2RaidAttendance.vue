<template>
  <div class="raid-attendance">
    <table>
      <thead>
        <tr >
          <th>Raid Name</th>
          <th v-for="member in members" :key="member.memberCode">{{ member.memberName }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="raid in raidHeaders" :key="raid">
          <td>{{ raid }}</td>
          <td v-for="member in members" :key="member.memberCode">
            {{ getAttendance(member.raids, raid) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  const apiUrl = 'http://backend.braindump.test/api'

  export default {
    name: 'ShowTT2RaidAttendance',
    data() {
      return {
        members: [],
        raidHeaders: []
      };
    },
    async created() {
      const response = await fetch(`${apiUrl}/tt2/raid_attendance`);
      const data = await response.json();
      this.members = data;
      this.raidHeaders = this.getRaidHeaders(data);
    },
    methods: {
      getRaidHeaders(members) {
        const raidsSet = new Set();
        members.forEach(member => {
          member.raids.forEach(raid => {
            raidsSet.add(raid.raidBatch);
          });
        });
        return Array.from(raidsSet);
      },
      getAttendance(raids, raidBatch) {
        const raid = raids.find(r => r.raidBatch === raidBatch);
        return raid ? raid.attendance : '-';
      }
    }
  };
</script>

<style scoped>
 table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #333;
    color: white;
  }
</style>
