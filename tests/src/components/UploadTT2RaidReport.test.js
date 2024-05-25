import { expect, describe, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TT2Upload from '../../../src/components/UploadTT2RaidReport.vue'

// mock functions
const mockReturnData = {
  message: 'File uploaded successfully!'
}
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => {
    return Promise.resolve(mockReturnData)
  }
})

window.alert = vi.fn().mockImplementationOnce(() => {})

describe('Feature', () => {
  test.only('upload file', async () => {
    // prepare
    const component = mount(TT2Upload);
    const fileMock = new File(['test file content'], "test.txt", { type: "text/plain"});
    const inputFile = component.find('input[type="file"]');
    const uploadBtn = component.find('#upload-file');

    Object.defineProperty(inputFile.element, 'files', {
      value: [fileMock],
      writable: false,
    });

    expect(inputFile.exists()).toBe(true);
    expect(uploadBtn.exists()).toBe(true);

    // action
    await inputFile.trigger('change');
    await component.vm.$nextTick();
    await uploadBtn.trigger('click');
    await component.vm.$nextTick();

    // await form.trigger('submit')

    // expectition
    expect(inputFile.element.files).toEqual([fileMock]);
    expect(window.alert).toBeCalledWith('檔案上傳成功！');
  })
})