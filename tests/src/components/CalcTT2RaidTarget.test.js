import { expect, describe, test, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import TT2RaidTarget from '../../../src/components/CalcTT2RaidTarget.vue'

// mock API result
const returnData = {
  0: {name: 'Head'},
  1: {name: 'Arm-1'},
  3: {name: 'Torso'},
  7: {name: 'Leg-1'},
  4: {name: 'Arm-2'}
}
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => {
    return Promise.resolve(returnData)
  }
})

describe('Render', () => {
  test('renders form with inputs', () => {
    const component = mount(TT2RaidTarget)

    expect(component.text()).toContain('Input Titan Status:')
    expect(component.text()).toContain('Calculate!')
  })
})

describe('Unit', () => {
  test('reset svg colors', () => {
    const component = mount(TT2RaidTarget)
    const svgElements = component.findAll('.target-container svg [fill]')

    // set to other color
    svgElements.forEach((element) => {
      element.element.setAttribute('fill', 'red')
    })

    component.vm.resetSvgColor()

    svgElements.forEach((element) => {
      expect(element.attributes('fill')).toBe('lightgray')
    })
  })
  test('drow target on svg', () => {
    const component = mount(TT2RaidTarget)
    let testData = {
      0: {name: 'Head'},
      1: {name: 'Arm-1'},
      3: {name: 'Torso'},
      7: {name: 'Leg-1'}
    }

    component.setData({result: testData})

    component.vm.drawTargetOnSvg()

    for (let part of Object.values(testData)) {
      let element = component.find({ref: part.name})
      expect(element.attributes('fill')).toBe('green')
    }
  })
  test('handle submit', async () => {
    const component = mount(TT2RaidTarget)

    await component.vm.handleSubmit()

    expect(component.vm.result).toStrictEqual(returnData)
  })
})

describe('Feature', () => {
  test('input and check svg changed', async () => {
    const component = mount(TT2RaidTarget)

    // input test data
    let inputs = component.findAll('input')
    const testData = [1.11, 2.22, 3.33, 4.44, 5.55, 6.66, 7.77, 8.88, 9.99]

    await Promise.all(inputs.map(async (input, index) => {
      await input.setValue(testData[index])
    }))

    // submit
    const form = component.find('form')

    await form.trigger('submit')
    await flushPromises()

    // assert svg color changed
    for (let part of Object.values(returnData)) {
      let element = component.find({ref: part.name})
      expect(element.attributes('fill')).toBe('green')
    }
  })
})