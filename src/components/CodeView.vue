<template>
    <div id="codeviewcontainer" :style="{display: ((visible)? 'block' : 'none')}">
      <div id="closebar">
        <div id="bartitle">{{this.shaderName}}</div>
        <div id="closebutton" @click="close">Close</div>
      </div>
      <div id="codeview">
        <div class="pane">
          <div id="vertex-shader">
            <h3>Vertex Shader</h3>
            <pre>{{this.vertexShader}}</pre>
          </div>
        </div>
        <div class="pane">
          <div id="fragment-shader">
            <h3>Fragment Shader</h3>
            <pre>{{this.fragmentShader}}</pre>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'CodeView',
  props: {
    visible: { type: Boolean, default: false },
    shaderName: { type: String, default: '' },
    vertexShader: { type: String, default: '' },
    fragmentShader: { type: String, default: '' }
  },
  methods: {
    close(e) {
      this.$emit('close', e);
    }
  }
};
</script>

<style scoped>
#codeviewcontainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
}

#closebar {
  margin: 20px 20px 10px;
  height: 30px;
  position: relative;
}

#closebar #bartitle {
  color: #fff;
}

#closebar #closebutton {
  border: 1px solid #fff;
  display: inline-block;
  color: #fff;
  background-color: #444;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  line-height: 28px;
  padding: 0 10px;
}

#codeview {
  margin: 10px 20px 20px;
  color: #fff;
}

#codeview .pane {
  -ms-flex: 1 0 100%;
  flex: 1 0 100%;
  padding: 10px;
  border: 1px solid #fff;
  margin: 10px 0;
  background-color: #444;
}
</style>


