<template>
  <div>
    <input id="input-file" type="file" @change="onFileChange" />
    <button id="upload-file" @click="uploadFile">上傳檔案</button>
    <div v-if="uploadProgress !== null">上傳進度：{{ uploadProgress }}%</div>
  </div>
</template>

<script>
const apiUrl = 'http://backend.braindump.test/api'

export default {
  name: 'UploadTT2RaidReport',
  data() {
    return {
      selectedFile: null,
      uploadProgress: null
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && this.isValidFile(file)) {
        this.selectedFile = file;
      } else {
        alert("請選擇一個有效的檔案！");
      }
    },
    isValidFile(file) {
      const allowedTypes = ["text/csv", "text/plain"];
      const maxSize = 10 * 1024;

      if (!allowedTypes.includes(file.type)) {
        alert("不支援的檔案類型！");
        return false;
      }

      if (file.size > maxSize) {
        alert("檔案大小超過限制！");
        return false;
      }

      return true;
    },
    async uploadFile() {
      if (!this.selectedFile) {
        alert("請選擇一個檔案！");
        return;
      }

      const formData = new FormData();
      formData.append("file", this.selectedFile);

      try {
        const response = await fetch(`${apiUrl}/tt2/upload`, {
          method: "POST",
          body: formData,
          onUploadProgress: (event) => {
            if (event.lengthComputable) {
              this.uploadProgress = Math.round((event.loaded / event.total) * 100);
            }
          }
        });

        if (response.ok) {
          alert("檔案上傳成功！");
          this.uploadProgress = null;
        } else {
          const errorText = await response.text();
          alert(`檔案上傳失敗：${errorText}`);
        }
      } catch (error) {
        console.error("上傳過程中發生錯誤：", error);
        alert("檔案上傳失敗！");
      }
    }
  }
};
</script>
