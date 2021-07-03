<template>
  <div class="hello">
    <select id="certificate" name="certificate" required v-model="thumbprint">
      <option value="null" disabled>Не выбран</option>
      <option
              v-for="cert in certificateList"
              v-bind:key="cert.thumbprint">
        {{cert.name}}
      </option>
    </select><br>
    <span>Выбрано: {{ thumbprint }}</span>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  import { getUserCertificates } from 'crypto-pro';
  // var certificateListt = [
  //   {thumbprint:"1", name:"rer"},
  //   {thumbprint:"2", name:"er"}
  // ];
  let tt = '123';
  // (async () => {
  //   try {
  //     console.log(certificateListt)
  //     console.log(certificateListt.length)
  //     console.log(typeof(certificateListt))
  //     certificateListt = await getUserCertificates();
  //     console.log(certificateListt)
  //     console.log(typeof(certificateListt))
  //     console.log(certificateListt.length)
  //   } catch(error) {
  //     // ...
  //   }
  // })();
  // console.log(certificateListt)
  // console.log(typeof(certificateListt))
  // console.log(certificateListt.length)
export default {
  asyncComputed: {
    async certificateList() {
      return await getUserCertificates()
    }
  },
  name: 'HelloWorld',
  data () {
    return {
      // certificateList: certificateListt,
      thumbprint: tt
    }
  },
  props: {
    msg: String
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
