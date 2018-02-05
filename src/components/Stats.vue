<template>
  <div id="stats">{{fps}} fps
  </div>
</template>

<script>
export default {
  name: 'Stats',
  data() {
    return {
      fps: 0
    };
  },
  methods: {
    end() {
      this.frames++;
      let time = (performance || Date).now();
      if (time >= this.prevTime + 1000) {
        let fps = this.frames * 1000 / (time - this.prevTime);
        this.prevTime = time;
        this.frames = 0;
        this.fps = fps.toFixed(0);
      }
      return time;
    },
    update() {
      this.beginTime = this.end();
    },
    loop() {
      this.update();
      this._frameId = window.requestAnimationFrame(() => {
        this.loop();
      });
    }
  },
  mounted() {
    this.beginTime = this.prevTime = (performance || Date).now();
    this.frames = 0;
    this.loop();
  },
  beforeDestoryed() {
    window.cancelAnimationFrame(this._frameId);
  }
};
</script>

<style scoped>
#stats {
  position: fixed;
  z-index: 100;
  padding: 10px;
  right: 0px;
  bottom: 0px;
  color: #fff;
}
</style>
