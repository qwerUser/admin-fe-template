<template>
  <div class="text">
		{{text}}
	</div>
</template>

<script>
  export default {
    name: 'toast-test',
    props: {
      text: {
        type: String
			}
    }
  }
</script>

<style scoped>
	.text{
		position:fixed;
		width:100px;
		height:50px;
		border-radius: 10px;
		line-height: 50px;
		text-align: center;
		color:#fff;
		background: #666;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
		-webkit-transform: translate(-50%,-50%);
	}
</style>
