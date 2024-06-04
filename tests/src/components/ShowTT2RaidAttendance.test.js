import { expect, describe, test, vi, beforeEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import ShowTT2RaidAttendance from '../../../src/components/ShowTT2RaidAttendance.vue'

// mock functions
const mockReturnData = [
  {
    memberName: "raymond.collier",
    memberCode: "7pjprne",
    raids: [
      { raidBatch: "H4s4IjZXO41XYMeO6wIJUmBCCmvYhX989dMLmAy6", attendance: 1},
      { raidBatch: "Q77Otj7UteJFmnOOSPLnTbw5PTn4ZTW6Z3iaZj2f", attendance: 1},
      { raidBatch: "pCTOoG4D16T0uS2kzCsWHPcywXTOz4KDcN64rYIU", attendance: 0},
    ]
  },
  {
    memberName: "little.tiana",
    memberCode: "57bu9xb",
    raids: [
      { raidBatch: "H4s4IjZXO41XYMeO6wIJUmBCCmvYhX989dMLmAy6", attendance: 0},
      { raidBatch: "Q77Otj7UteJFmnOOSPLnTbw5PTn4ZTW6Z3iaZj2f", attendance: 1},
      { raidBatch: "pCTOoG4D16T0uS2kzCsWHPcywXTOz4KDcN64rYIU", attendance: 0},
    ]
  },
  {
    memberName: "vernice.kozey",
    memberCode: "jyq0z5s",
    raids: [
      { raidBatch: "H4s4IjZXO41XYMeO6wIJUmBCCmvYhX989dMLmAy6", attendance: 0},
      { raidBatch: "Q77Otj7UteJFmnOOSPLnTbw5PTn4ZTW6Z3iaZj2f", attendance: 1},
      { raidBatch: "pCTOoG4D16T0uS2kzCsWHPcywXTOz4KDcN64rYIU", attendance: 1},
    ]
  }
];

global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => {
    return Promise.resolve(mockReturnData)
  }
})

describe('Feature', () => {
  let component = null;

  beforeEach(async () => {
    component = mount(ShowTT2RaidAttendance);
    await flushPromises();
  }),

  test('should render table header', async () => {
    // prepare
    const headers = component.findAll('thead th');

    // action

    // expectition
    expect(headers.length).toBe(4);
  }),

  test.only('should render attendance', async () => {
    // prepare
    const rows = component.findAll('tbody tr');

    // action
    console.log();

    // expectition
    expect(rows.length).toBe(3);

    for (let [index, row] of Object.entries(rows)) {
      let raidBatchShouldBe = component.vm.raidHeaders[index]

      let columns = row.findAll('td');
      expect(columns[0].text()).toBe(raidBatchShouldBe);

      for (let i = 0; i < 3; i++) {
        let raid = mockReturnData[i].raids.find((item) => {
          const raid = item.raidBatch === raidBatchShouldBe
          return raid;
        });

        expect(columns[i + 1].text()).toBe(raid.attendance.toString());
      }
    }
  })
})