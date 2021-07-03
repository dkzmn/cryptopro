<template>
  <b-container>
    <span>Установленные сертификаты:</span>
    <b-select id="certificate" name="certificate" required v-model="thumb" :select-size="4">
      <option v-for="cert in certificateList" v-bind:key="cert.thumbprint" v-bind:value="cert.thumbprint">
        {{cert.name}}, действителен до: {{cert.validTo | formatDate}}
      </option>
    </b-select>
    <a href="https://www.cryptopro.ru/sites/default/files/products/cades/demopage/cades_bes_sample.html" target="_blank">
      Проверка работы плагина, получение сертификатов
    </a>
    <br><br>
    <b-file v-model="file_name" placeholder="Выберите файл..."></b-file><br><br>
    <b-button :disabled="thumb==''||file_name==null" variant="success" @click="sign()">Подписать</b-button><br><br>
    <b-textarea class="textarea" id="signature" rows="20" v-model="signature" readOnly/><br>
    <b-button :disabled="signature==''||file_name==null" variant="success" @click="download(file_name,signature)">Скачать файл ЭП</b-button><br>
    <a href="https://crypto.kontur.ru/verify#" target="_blank">
      Проверка ЭП
    </a>

  </b-container>
</template>

<script>
  import { getUserCertificates,createDetachedSignature,createHash } from 'crypto-pro';

  function readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = res => {
        resolve(res.target.result);
      };
      reader.onerror = err => reject(err);
      reader.readAsArrayBuffer(file);
      console.log(file.filename);
    });
  }

  export default {
    asyncComputed: {
      async certificateList() {
        try {
          return await getUserCertificates()
        } catch (getUserCertificatesError) {
          console.log(getUserCertificatesError);
        }
      },
      async sign_string(){
        if((this.filecontent!=null)&&(this.thumb!='')){
          let s='';
          try {
            const messageHash = await createHash(this.filecontent);
            console.log(messageHash)
            try {
              s = await createDetachedSignature(this.thumb, messageHash);
            } catch (signatureError) {
              console.log(signatureError);
            }
          } catch (hashError) {
            console.log(hashError);
          }
          return s;
        }
      },
      async filecontent() {
        if (this.file_name != null) {
          const contents = await readFile(this.file_name);
          return contents;
        } else {
          return null
        }
      }
    },
    data() {
      return {
        thumb: '',
        signature: '',
        file_name: null
      };
    },
    methods: {
      sign() {
        this.signature = this.sign_string;
        console.log(typeof this.signature);
      },
      download() {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.signature));
        element.setAttribute('download', this.file_name.name + '.sgn');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    },
  name: 'Certificates'
  }
</script>

